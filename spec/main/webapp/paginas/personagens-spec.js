describe("personagensController",function(){
    var vm = this;
    var controller;
    var cabecalhoLog = [];
    //URLS
    vm.urlPersonagens = 'http://localhost:8080/TekkenApp/rest/personagens';
    vm.urlPersonagensLazy = 'http://localhost:8080/TekkenApp/rest/personagens/golpes';
    vm.urlGolpes = 'http://localhost:8080/TekkenApp/rest/golpes';
    //Resultados MOCK 
    vm.mockListaPersonagensSucesso = [{"id":1,"nome":"Steve","fotoUrl":"","golpes":null},{"id":2,"nome":"Fahkunram","fotoUrl":"","golpes":null}];
    vm.mockListaGolpes = [{
        'id': 1,
        'input': 'df+1',
        'blockframes': -1,
        'hitframes': 3,
        'chframes' : 6
        },
        {'id': 2,
        'input': 'df+2',
        'blockframes': -12,
        'hitframes': 25,
        'chframes' : 25
        }
    ];
    vm.mockListaPersonagemComGolpesSucesso = {"id":1,"nome":"Steve","fotoUrl":"","golpes": vm.mockListaGolpes};

    beforeAll(function(){
        //AVISO
        console.log('@@@'+"personagensController"+'@@@');
    });

    beforeEach(module('aplicacao'));
    
    beforeEach(inject(function(erroService,_$controller_, _$rootScope_,_$httpBackend_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        // $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        $rootScope.$apply();
        controller = _$controller_('personagensController',{
            $scope:$scope,
            erroService:erroService
        });
        vm.erroService = erroService;
        //MOCKS 
        $httpBackend.when('GET',vm.urlPersonagens).respond(200,vm.mockListaPersonagensSucesso);
        $httpBackend.when('POST',vm.urlPersonagensLazy).respond(200,vm.mockListaPersonagemComGolpesSucesso);    
    }));
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    cabecalhoLog.push("deve retornar uma lista Personagens com chaves condizentes");
    it(cabecalhoLog[0],function(){
        console.log('###Testando:'+cabecalhoLog[0]+'###');
        // var controller = $controller('personagensController',{$scope:$scope});
        var chavesJson;
        var chavesEsperadas = [ 'id', 'nome', 'fotoUrl', 'golpes', 'show' ];
        controller.listarPersonagens();
        $httpBackend.flush();
        var personagens = controller.getListaPersonagens();
        //EXPECT que cada coisa tenha um JSON certo
        for( var i = 0; i < personagens.length; i++){
            chavesJson = Object.keys(controller.personagens[i]);
            for(var j = 0; j < chavesJson.length; j++)
                expect(chavesJson).toContain(chavesEsperadas[j]);
        }
    });
    
    cabecalhoLog.push('Deve retornar lista de personagens um Objeto Vazio');
    it(cabecalhoLog[1],function(){
        console.log('###Testando:'+cabecalhoLog[1]+'###');
        expect(controller.getListaPersonagens()).toEqual({});
    });

    cabecalhoLog.push("Testando listar Personagens Erro!");
    it(cabecalhoLog[2],function(){
        console.log('###Testando:'+cabecalhoLog[2] +'###');
        //EXPECT que venha ERRADO
        $httpBackend.expectGET(urlPersonagens).respond(500);
        controller.listarPersonagens();
        $httpBackend.flush();
        var resultado = vm.erroService.ERRO_MSG;
        expect(resultado).toEqual('Não foi possível retornar a lista de personagens');
    });

    cabecalhoLog.push("Testando a Seleção de Personagem com Sucesso");
    it(cabecalhoLog[3],function(){
        console.log('###Testando:'+cabecalhoLog[3] +'###');
        var chavesEsperadasGolpes = [ 'id', 'input', 'blockframes', 'hitframes', 'chframes' ];
        controller.listarPersonagens();
        $httpBackend.flush();
        controller.selecionaPersonagem(controller.personagens[0]);
        $httpBackend.flush();
        expect(Object.keys(controller.personagem.golpes[0])).toEqual(chavesEsperadasGolpes);
    });
    
    
    cabecalhoLog.push("Testando a Seleção de Personagem com Falha");
    it(cabecalhoLog[4],function(){
        console.log('###Testando:'+cabecalhoLog[4] +'###');
        var chavesEsperadasGolpes = [ 'id', 'input', 'blockframes', 'hitframes', 'chframes' ];
        controller.listarPersonagens();
        $httpBackend.flush();
        $httpBackend.expectPOST(urlPersonagensLazy).respond(500);
        controller.selecionaPersonagem(controller.personagens[0]);
        $httpBackend.flush();
        expect(vm.erroService.ERRO_NRO).toEqual(500);
    });

    cabecalhoLog.push("Testando Limpa de Personagem Escolhido");
    it(cabecalhoLog[5],function(){
        console.log('###Testando:'+cabecalhoLog[5] +'###');
        controller.limpaPersonagem();
        expect(controller.personagem).toBeNull();
    });

});
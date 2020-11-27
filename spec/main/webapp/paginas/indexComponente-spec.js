function stackTrace() {
    var err = new Error();
    return err.stack;
}

describe("personagensController",function(){
    var vm = this;
    var controller;
    //URLS
    vm.urlPersonagens = 'http://localhost:8080/TekkenApp/rest/personagens';
    vm.urlPersonagensLazy = 'http://localhost:8080/TekkenApp/rest/personagens/golpes';
    vm.urlGolpes = 'http://localhost:8080/TekkenApp/rest/golpes';
    //Resultados MOCK 
    vm.mockListaPersonagensSucesso = [{"id":1,"nome":"Steve","fotoUrl":"","golpes":null},{"id":2,"nome":"Fahkunram","fotoUrl":"","golpes":null}];

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
            // erroService:erroService
        });
        vm.erroService = erroService;
        //MOCKS 
        $httpBackend.when('GET',vm.urlPersonagens).respond(200,vm.mockListaPersonagensSucesso);    
    }));
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it("Testando listar Personagens",function(){
        // var controller = $controller('personagensController',{$scope:$scope});
        var chavesJson;
        var chavesEsperadas = [ 'id', 'nome', 'fotoUrl', 'golpes', 'show' ];
        controller.listarPersonagens();
        $httpBackend.flush()
        //EXPECT que cada coisa tenha um JSON certo
        for( var i = 0; i < controller.personagens.length; i++){
            chavesJson = Object.keys(controller.personagens[i]);
            for(var j = 0; j < chavesJson.length; j++)
                expect(chavesJson).toContain(chavesEsperadas[j]);
        }
    });

    it('returns 1', inject(function(){ //parameter name = service 
        expect( erroService).toBeDefined();
    }))


    it("Testando listar Personagens Erro!",function(){
        //EXPECT que venha ERRADO
        $httpBackend.expectGET(urlPersonagens).respond(500);
        controller.listarPersonagens();
        $httpBackend.flush();
        var resultado = vm.erroService.getERRO_MSG();
        expect(resultado).toBe('Não foi possível retornar a lista de personagens');

    });
    // it("Testando Limpa de Personagem Escolhido",function(){
    //     var controller = $controller('personagensController',{$scope:$scope});
    //     expect($scope.personagem).toBeNull();
    // });
    
});
describe("personagensController",function(){
    
    var $controller, $rootScope;
    
    beforeEach(module('aplicacao'));
    
    beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));
    
    it("Testando listar Personagens",function(){
        var $scope = $rootScope.$new();
        var controller = $controller('personagensController',{$scope:$scope});;
        $scope.listarPersonagens();
        var chavesJson = Object.keys($scope.personagens);
        var chavesEsperadas = ['id','nome','foto','show'];
        for(var i = 0; i< chavesJson.length; i++)
            expect(chavesJson).toContain(chavesEsperadas[i]);
    });
    it("Testando Limpa de Personagem Escolhido",function(){
        var $scope = $rootScope.$new();
        var controller = $controller('personagensController',{$scope:$scope});
        $scope.limpaPersonagem();
        expect($scope.personagem).toBeNull();
    });
    
});
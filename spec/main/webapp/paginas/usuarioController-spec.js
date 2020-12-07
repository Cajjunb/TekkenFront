describe("Testando Usuario Controller",function(){
    
    var $controller, $rootScope;
    
    beforeEach(module('aplicacao'));
    
    beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));
    
    it("Testando metodo 1",function(){
        var $scope = $rootScope.$new();
        var controller = $controller('usuarioController',{$scope:$scope});
        controller.selecionaUsuario("STRING TESTE");
        expect(controller.usuarioSelecionado).toEqual("STRING TESTE");
    });
    
});
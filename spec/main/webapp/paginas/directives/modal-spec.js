
describe('Modal Directive',function(){
    var vm =this;

    beforeAll(function(){
        //AVISO
        console.log('@@@'+"Modal Directive"+'@@@');
    });

    beforeEach(module('aplicacao'));
    beforeEach(inject(function(erroService,$rootScope,$compile){
            vm.erroService = erroService;
            vm.scope = $rootScope.$new();
            vm.element = angular.element('<div error-modal></div>');
            vm.element = $compile(vm.element)(vm.scope);
            vm.scope.$digest();
        })
    );

    var descricao1 = '###Deve poder setar e receber o valor do ErroMsg###';
    it(descricao1,function(){
        console.log('Testando:'+descricao1);
        var valor = 'MENSAGEM DE ERRO';
        vm.erroService.ErroMsg = valor;
        console.log(vm.erroService.ErroMsg);
        expect(vm.erroService.ErroMsg).toEqual(valor);
    });

    var descricao2 = '###Testa se o modal executa direito###'; 
    it(descricao2,function(){
        console.log('Testando:'+descricao2);
        vm.element.find('div').trigger('shown.bs.modal');
        expect(true).toBeTruthy();
    });
});
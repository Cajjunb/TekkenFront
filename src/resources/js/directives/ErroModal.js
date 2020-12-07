
(function(app){
    
    // SERVICO DE MENSAGEM DE ERRO
    var erroService = function(){
        var vmthis = this;
        var ERRO_NRO;
        var ERRO_MSG;
        // var getERRO_NRO = function(){return vmthis.ERRO_NRO};
        // var setERRO_NRO = function(arg){vmthis.ERRO_NRO = arg};
        // var getERRO_MSG = function(){return vmthis.ERRO_MSG};
        // var setERRO_MSG = function(arg){vmthis.ERRO_MSG = arg; };
        var retorno = {
            'ERRO_MSG':ERRO_MSG,
            'ERRO_NRO':ERRO_NRO
        };
        return retorno;
    };
    app.factory('erroService',erroService);

    var linkEscopo = function(scope, element, attrs) {
        scope.erroService = erroService;
    };

    //DIRETIVA
    var modal = function(erroService){
        return {
            templateUrl: '/src/diretivas/modal.html',
            link: linkEscopo 
        };
    };
    app.directive('errorModal',['erroService',modal]);
    
    var habilitaModal = function () {
        $('#modalErro').trigger('focus');
        console.log('EXECUTOU O MODAL');
    };
    $('#modalErro').on('shown.bs.modal', habilitaModal);

}(angular.module('aplicacao')));
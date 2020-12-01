(function(app){
    var erroService = function(){
        var vmthis = this;
        var ERRO_NRO;
        var ERRO_MSG;
        // var getERRO_NRO = function(){return vmthis.ERRO_NRO};
        // var setERRO_NRO = function(arg){vmthis.ERRO_NRO = arg};
        // var getERRO_MSG = function(){return vmthis.ERRO_MSG};
        // var setERRO_MSG = function(arg){vmthis.ERRO_MSG = arg; };
        var retorno = {
            ERRO_MSG,
            ERRO_NRO
        };
        return retorno;
    };
    app.factory('erroService',erroService);

    $('#modalErro').on('shown.bs.modal', function () {
        $('#modalErro').trigger('focus')
      });
}(angular.module('aplicacao')));
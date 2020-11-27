(function(app){
    var erroService = function(){
        var vmthis = this;
        var ERRO_NRO;
        var ERRO_MSG;
        var getERRO_NRO = function(){return vmthis.ERRO_NRO};
        var setERRO_NRO = function(arg){vmthis.ERRO_NRO = arg};
        var getERRO_MSG = function(){console.log(vmthis.ERRO_MSG);return vmthis.ERRO_MSG};
        var setERRO_MSG = function(arg){ vmthis.ERRO_MSG = arg; };
        var getTESTE = function(){ return "TESTE"; };
        var retorno = {
            getERRO_MSG,
            setERRO_MSG,
            getERRO_NRO,
            setERRO_NRO,
            getTESTE
        };
        return retorno;
    };
    app.factory('erroService',erroService);
}(angular.module('aplicacao')));
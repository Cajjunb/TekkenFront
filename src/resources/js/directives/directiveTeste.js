
(function(app){
    var modal = function(erroService){
        return {
            templateUrl: '/src/diretivas/modal.html' 
        };
    }
    app.directive('errorModal',['erroService',modal]);
}(angular.module('aplicacao')));
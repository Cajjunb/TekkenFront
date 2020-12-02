
(function(app){
    var modal = function(erroService){
        return {
            templateUrl: '/src/diretivas/modal.html',
            link: function(scope, element, attrs) {
                  scope.erroService = erroService;
            }
        };
    }
    app.directive('errorModal',['erroService',modal]);
}(angular.module('aplicacao')));
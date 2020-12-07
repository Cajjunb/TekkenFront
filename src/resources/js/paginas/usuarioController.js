/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



(function(app){
   
    var usuarioController = function($scope, $http,$routeParams,notify){
        var vm = this;
        vm.usuarioSelecionado = null;
        vm.teste = "STRING TESTE";

        vm.selecionaUsuario = function(usuario){
            vm.usuarioSelecionado = usuario;
        };
        
        vm.printaUsuario = function(){
            console.log(notify);
        };
        

    };   
    app.controller("usuarioController",['$scope','$http','$routeParams','notify',usuarioController]);
    
//}(angular.module("usuario")));
}(angular.module("aplicacao")));
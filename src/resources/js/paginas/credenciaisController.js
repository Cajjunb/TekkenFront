/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



(function(app){
   
    var credenciaisController = function(notify,$scope){
        var vm = this;
        vm.mensagemCredenciais = "CREDENCIAIS!";
        vm.getServico = function(){
            notify.nome = "Leo";
//            $scope.mensagemCredenciais = servico;
        };
        
        
    };   
    app.controller("credenciaisController",['notify','$scope',credenciaisController]);
    
}(angular.module("aplicacao")));
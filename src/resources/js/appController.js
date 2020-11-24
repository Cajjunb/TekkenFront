/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function(appMaster){
    var aplicacaoController = function($scope){
        $scope.mensagem = "Opa!";
    };
    appMaster.controller('aplicacaoController', aplicacaoController);
    
    
}(angular.module("aplicacao")));
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(app){
   
    var urlUsuariosUrl = 'http://localhost:8080/TekkenApp/rest/login';
    var loginController = function($http,$scope){
        var vm = this;
        vm.registroDTO = {
              "nome": "",
              "password": ""
        };

        vm.logarUsuario = function(){
               $http.post(urlUsuariosUrl+"/signin", vm.registroDTO).then(function(response){
                   console.log(response.data);
                   
               });
        };
    };
    app.controller("loginController",['$http','$scope',loginController]);
        
    
    
}(angular.module("aplicacao")));
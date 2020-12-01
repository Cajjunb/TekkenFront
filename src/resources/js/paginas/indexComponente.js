/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (personagensModulo) {


    var controlePersonagem = function (erroService,$scope, $http) {
        urlPersonagens = 'http://localhost:8080/TekkenApp/rest/personagens';
        urlPersonagensLazy = 'http://localhost:8080/TekkenApp/rest/personagens/golpes';
        urlGolpes = 'http://localhost:8080/TekkenApp/rest/golpes';
        //DECLARACAO
        var vm = this;
        vm.personagens = {};
        $scope.personagemSelecionado = {};
        $scope.golpeSelecionado = {};
        $scope.golpes = {};
        $scope.personagem = {};

        vm.listarPersonagens = function () {
            console.log('RODEI');
            $http.get(urlPersonagens).then(vm.listarPersonagensSucesso,vm.listarPersonagensErro);
        };

        vm.getListaPersonagens = function(){
            return vm.personagens;
        };

        vm.listarPersonagensSucesso = function (response) {
            console.log('Sucesso!');
            vm.personagens = response.data;
            vm.personagens.forEach(function(valor,index,array){
                array[index].show = false;
            });
        };

        vm.listarPersonagensErro = function (error){
            console.log('Erro!');
            erroService.setERRO_MSG('Não foi possível retornar a lista de personagens');
            erroService.setERRO_NRO(500);
        };

        vm.selecionaPersonagem = function (personagemSelecionado) {
            $scope.personagem = personagemSelecionado;
            $scope.personagem.show = !$scope.personagem.show;
            if ($scope.personagem.show) {
                var registroDTO = {
                    'id': $scope.personagem.id,
                    'nome': $scope.personagem.nome,
                    'fotoUrl': $scope.personagem.foto != null ? $scope.personagem.foto : ''
                };
                $http.post(urlPersonagensLazy, registroDTO).then(function (response) {
                    var i = $scope.personagens.indexOf(personagemSelecionado);
                    $scope.personagens[i] = response.data;
                    $scope.personagens[i].show = true;
                    $scope.personagem = $scope.personagens[i];
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            }
        };

        vm.limpaPersonagem = function () {
            $scope.personagem = null;
        };

        $scope.salvaPersonagem = function () {
            console.log($scope.personagem);
            var registroNovo;
            if ("id" in $scope.personagem) {
                registroNovo = {
                    'id': $scope.personagem.id != null ? $scope.personagem.id : '',
                    'nome': $scope.personagem.nome,
                    'fotoUrl': $scope.personagem.foto != null ? $scope.personagem.foto : '',
                    'golpes': $scope.personagem.golpes
                };
                console.log(registroNovo);
                $http.put(urlPersonagens, registroNovo).then(function (response) {
                    $scope.personagens.push($scope.personagem);
                    $scope.limpaPersonagem();
                    $scope.listarPersonagens();
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                registroNovo = {
                    'id': $scope.personagem.id,
                    'nome': $scope.personagem.nome,
                    'fotoUrl': $scope.personagem.foto,
                    'golpes': $scope.personagem.golpes
                };
                $http.post(urlPersonagens, registroNovo).then(function (response) {
                    $scope.personagens.push($scope.personagem);
                    $scope.limpaPersonagem();
                    $scope.listarPersonagens();
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            }
        };

        $scope.excluirPersonagem = function () {
            if ('id' in $scope.personagem) {
                var registro = {
                    'id': $scope.personagem.id != null ? $scope.personagem.id : '',
                    'nome': $scope.personagem.nome,
                    'fotoUrl': $scope.personagem.foto != null ? $scope.personagem.foto : '',
                    'golpes': null
                };
                $http({
                    method: 'DELETE',
                    url: urlPersonagens,
                    data: registro,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                }).then(function (response) {
                    $scope.personagens.splice($scope.personagens.indexOf($scope.personagem));
                    console.log(response);
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                console.log('OPA!');
            }
        };


        vm.selecionaGolpe = function (golpeArg) {
            $scope.golpeSelecionado = golpeArg;
        };

        $scope.salvaGolpe = function () {
            var registroGolpe =
            {
                'id': $scope.golpeSelecionado.id,
                'input': $scope.golpeSelecionado.input,
                'nomeGolpe': "",
                'blockframes': $scope.golpeSelecionado.blockframes,
                'hitframes': $scope.golpeSelecionado.hitframes,
                'chframes': $scope.golpeSelecionado.chframes,
                'personagem': $scope.personagem

            };
            delete registroGolpe.personagem.show;
            $http.put(urlGolpes, registroGolpe).then(function (response) {
                console.log("DEU");
            }).catch(function (erro) {
                alert(erro.toString());
            });
        };

        $scope.excluirGolpe = function () {
            if ('id' in $scope.personagem) {
                var registroGolpe =
                {
                    'id': $scope.golpeSelecionado.id,
                    'input': $scope.golpeSelecionado.input,
                    'nomeGolpe': "",
                    'blockframes': $scope.golpeSelecionado.blockframes,
                    'hitframes': $scope.golpeSelecionado.hitframes,
                    'chframes': $scope.golpeSelecionado.chframes,
                    'personagem': $scope.personagem

                };
                delete registroGolpe.personagem.show;
                $http({
                    method: 'DELETE',
                    url: urlPersonagens,
                    data: registro,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                }).then(function (response) {
                    $scope.personagens.splice($scope.personagens.indexOf($scope.personagem));
                    console.log(response);
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                console.log('OPA!');
            }
        };

    }; 

    personagensModulo.controller('personagensController',['erroService','$scope','$http',controlePersonagem]);

}(angular.module('aplicacao')));
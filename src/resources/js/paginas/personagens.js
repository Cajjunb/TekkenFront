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
        vm.personagemSelecionado = {};
        vm.golpeSelecionado = {};
        vm.golpes = {};
        vm.personagem = {};

        vm.listarPersonagens = function () {
            $http.get(urlPersonagens)
            .then(vm.listarPersonagensSucesso,vm.listarPersonagensErro);
        };

        vm.getListaPersonagens = function(){
            return vm.personagens;
        };

        vm.listarPersonagensSucesso = function (response) {
            vm.personagens = response.data;
            vm.personagens.forEach(function(valor,index,array){
                array[index].show = false;
            });
        };

        vm.listarPersonagensErro = function (error){
            erroService.ERRO_MSG = 'Não foi possível retornar a lista de personagens';
            erroService.ERRO_NRO = 500;
            $('#modalErro').modal({focus:true});
        };

        vm.selecionaPersonagem = function (personagemSelecionado) {
            vm.personagem = personagemSelecionado;
            vm.personagem.show = !vm.personagem.show;
            if (vm.personagem.show) {
                var registroDTO = {
                    'id': vm.personagem.id,
                    'nome': vm.personagem.nome,
                    'fotoUrl': vm.personagem.foto != null ? vm.personagem.foto : ''
                };
                $http.post(urlPersonagensLazy, registroDTO)
                    .then(vm.carregaPersonagemSucesso
                        ,vm.carregaPersonagemFalha);
            }
        };

        vm.carregaPersonagemSucesso = function (response) {
            var i = vm.personagens.indexOf(vm.personagem);
            vm.personagens[i] = response.data;
            vm.personagens[i].show = true;
            vm.personagem = vm.personagens[i];
        };

        vm.carregaPersonagemFalha = function (erro) {
            erroService.ERRO_NRO = erro.status;
            erroService.ERRO_MSG = 'Erro!';
        };

        vm.limpaPersonagem = function () {
            vm.personagem = null;
        };

        vm.salvaPersonagem = function () {
            console.log(vm.personagem);
            var registroNovo;
            if ("id" in vm.personagem) {
                registroNovo = {
                    'id': vm.personagem.id != null ? vm.personagem.id : '',
                    'nome': vm.personagem.nome,
                    'fotoUrl': vm.personagem.foto != null ? vm.personagem.foto : '',
                    'golpes': vm.personagem.golpes
                };
                console.log(registroNovo);
                $http.put(urlPersonagens, registroNovo).then(function (response) {
                    vm.personagens.push(vm.personagem);
                    vm.limpaPersonagem();
                    vm.listarPersonagens();
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                registroNovo = {
                    'id': vm.personagem.id,
                    'nome': vm.personagem.nome,
                    'fotoUrl': vm.personagem.foto,
                    'golpes': vm.personagem.golpes
                };
                $http.post(urlPersonagens, registroNovo).then(function (response) {
                    vm.personagens.push(vm.personagem);
                    vm.limpaPersonagem();
                    vm.listarPersonagens();
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            }
        };

        vm.excluirPersonagem = function () {
            if ('id' in vm.personagem) {
                var registro = {
                    'id': vm.personagem.id != null ? vm.personagem.id : '',
                    'nome': vm.personagem.nome,
                    'fotoUrl': vm.personagem.foto != null ? vm.personagem.foto : '',
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
                    vm.personagens.splice(vm.personagens.indexOf(vm.personagem));
                    console.log(response);
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                console.log('OPA!');
            }
        };


        vm.selecionaGolpe = function (golpeArg) {
            vm.golpeSelecionado = golpeArg;
        };

        vm.salvaGolpe = function () {
            var registroGolpe =
            {
                'id': vm.golpeSelecionado.id,
                'input': vm.golpeSelecionado.input,
                'nomeGolpe': "",
                'blockframes': vm.golpeSelecionado.blockframes,
                'hitframes': vm.golpeSelecionado.hitframes,
                'chframes': vm.golpeSelecionado.chframes,
                'personagem': vm.personagem

            };
            delete registroGolpe.personagem.show;
            $http.put(urlGolpes, registroGolpe).then(function (response) {
                console.log("DEU");
            }).catch(function (erro) {
                alert(erro.toString());
            });
        };

        vm.excluirGolpe = function () {
            if ('id' in vm.personagem) {
                var registroGolpe =
                {
                    'id': vm.golpeSelecionado.id,
                    'input': vm.golpeSelecionado.input,
                    'nomeGolpe': "",
                    'blockframes': vm.golpeSelecionado.blockframes,
                    'hitframes': vm.golpeSelecionado.hitframes,
                    'chframes': vm.golpeSelecionado.chframes,
                    'personagem': vm.personagem

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
                    vm.personagens.splice(vm.personagens.indexOf(vm.personagem));
                    console.log(response);
                }).catch(function (erro) {
                    alert(erro.toString());
                });
            } else {
                console.log('OPA!');
            }
        };

        vm.$onInit = function () {
            // vm.listarPersonagens();
            vm.personagens = [{"id":1,"nome":"Steve","fotoUrl":"","golpes":null},{"id":2,"nome":"Fahkunram","fotoUrl":"","golpes":null}];
        };

    }; 

    personagensModulo.controller('personagensController',['erroService','$scope','$http',controlePersonagem]);

}(angular.module('aplicacao')));
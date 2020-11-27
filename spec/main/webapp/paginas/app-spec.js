/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
describe("Testando o serviço", function(){
    'use strict';
//    beforeEach(inject(function (_servico_) {
//        servico = _servico_;
//    }));

    beforeEach(module('aplicacao'));
    
    var notify;

    beforeEach(inject(function(){
    // The injector unwraps the underscores (_) from around the parameter names when matching
         notify = jasmine.createSpyObj('notify',['msgs']);
    }));

    it("testando getData",function(){
        var msgs = {
                'usuario': 'c1313819',
                'nome': 'Leandro Ramalho'
            };
        expect(notify.msgs).toBeTruthy();
    });
});

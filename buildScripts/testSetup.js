//Este arquivo não é transpilado, então deve ser utilizado commonJS e ES5

//Registra o babel para transpilar antes de executar os testes
require('babel-register');

//Desabilita as funções do webpack que o Mocha não reconhece
require.extensions['.css'] = function () { };

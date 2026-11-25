"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("./Cliente");
const Conta_1 = require("./Conta");
const SMS_1 = require("./SMS");
const Email_1 = require("./Email");
const NotificacaoApp_1 = require("./NotificacaoApp");
const SaqueException_1 = require("./excecoes/SaqueException");
// Criando os clientes
const cliente1 = new Cliente_1.Cliente("Ana", "111.111.111-11", "Rua A", 2500);
const cliente2 = new Cliente_1.Cliente("Pedro", "222.222.222-22", "Rua B", 3500);
// Cadastrando os canais de notificação
cliente1.adicionarCanal(new SMS_1.SMS());
cliente1.adicionarCanal(new Email_1.Email());
cliente2.adicionarCanal(new NotificacaoApp_1.NotificacaoApp());
cliente2.adicionarCanal(new SMS_1.SMS());
// Criando as contas
const conta1 = new Conta_1.Conta(101, 1, "25/11/2026", 100, 500, cliente1);
const conta2 = new Conta_1.Conta(102, 1, "25/11/2026", 1000, 200, cliente2);
// Função para testar os saques
function testarSaque(conta, valor) {
    try {
        conta.sacar(valor);
    }
    catch (erro) {
        if (erro instanceof SaqueException_1.SaqueException) {
            console.log("ERRO:", erro.message);
            conta.titular.notificar(erro.message);
        }
        else {
            console.log("Erro inesperado:", erro);
        }
    }
    console.log("-------------------------");
}
// TESTE 1: Valor inválido
console.log("TESTES DE VALOR INVÁLIDO");
testarSaque(conta1, -50);
testarSaque(conta1, 0);
// TESTE 2: Conta bloqueada
console.log("TESTES DE CONTA BLOQUEADA");
conta1.bloqueada = true;
testarSaque(conta1, 50);
testarSaque(conta1, 100);
conta1.bloqueada = false;
// TESTE 3: Saldo insuficiente
console.log("TESTES DE SALDO INSUFICIENTE");
testarSaque(conta1, 150);
testarSaque(conta1, 200);
// TESTE 4: Limite diário excedido
console.log("TESTES DE LIMITE DIÁRIO");
testarSaque(conta2, 250);
testarSaque(conta2, 300);
// TESTE 5: Saques realizados com sucesso
console.log("TESTES DE SAQUE COM SUCESSO");
testarSaque(conta2, 50);
testarSaque(conta2, 30);
// Consultando os saldos
console.log("SALDOS FINAIS");
console.log("Saldo de Ana:", conta1.consultarSaldo());
console.log("Saldo de Pedro:", conta2.consultarSaldo());
//# sourceMappingURL=index.js.map
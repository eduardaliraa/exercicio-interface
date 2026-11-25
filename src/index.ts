
import { Cliente } from "./Cliente";
import { Conta } from "./Conta";

import { SMS } from "./interface/SMS";
import { Email } from "./interface/Email";
import { NotificacaoApp } from "./interface/NotificacaoApp";

import { SaqueException } from "./excecoes/SaqueException";

// Criando os clientes
const cliente1 = new Cliente(
    "Ana",
    "111.111.111-11",
    "Rua A",
    2500
);

const cliente2 = new Cliente(
    "Pedro",
    "222.222.222-22",
    "Rua B",
    3500
);


cliente1.adicionarCanal(new SMS());
cliente1.adicionarCanal(new Email());

cliente2.adicionarCanal(new NotificacaoApp());
cliente2.adicionarCanal(new SMS());


const conta1 = new Conta(
    101,
    1,
    "25/11/2026",
    100,
    500,
    cliente1
);

const conta2 = new Conta(
    102,
    1,
    "25/11/2026",
    1000,
    200,
    cliente2
);

// Função para testar os saques
function testarSaque(conta: Conta, valor: number): void {

    try {
        conta.sacar(valor);

    } catch (erro) {

        if (erro instanceof SaqueException) {

            console.log("ERRO:", erro.message);

            conta.titular.notificar(erro.message);

        } else {
            console.log("Erro inesperado:", erro);
        }
    }

    console.log("-------------------------");
}

// TESTE : Valor inválido
console.log("TESTES DE VALOR INVÁLIDO");
testarSaque(conta1, -50);
testarSaque(conta1, 0);

// TESTE : Conta bloqueada
console.log("TESTES DE CONTA BLOQUEADA");
conta1.bloqueada = true;

testarSaque(conta1, 50);
testarSaque(conta1, 100);

conta1.bloqueada = false;

// TESTE : Saldo insuficiente
console.log("TESTES DE SALDO INSUFICIENTE");
testarSaque(conta1, 150);
testarSaque(conta1, 200);

// TESTE : Limite diário excedido
console.log("TESTES DE LIMITE DIÁRIO");
testarSaque(conta2, 250);
testarSaque(conta2, 300);

// TESTE : Saques realizados com sucesso
console.log("TESTES DE SAQUE COM SUCESSO");
testarSaque(conta2, 50);
testarSaque(conta2, 30);


console.log("SALDOS FINAIS");
console.log("Saldo de Ana:", conta1.consultarSaldo());
console.log("Saldo de Pedro:", conta2.consultarSaldo());

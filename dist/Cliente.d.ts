import type { Conta } from "./Conta";
import type { Notificacao } from "./Notificacao";
export declare class Cliente {
    nome: string;
    cpf: string;
    endereco: string;
    renda: number;
    contas: Conta[];
    canais: Notificacao[];
    constructor(nome: string, cpf: string, endereco: string, renda: number);
    adicionarConta(conta: Conta): void;
    adicionarCanal(canal: Notificacao): void;
    notificar(mensagem: string): void;
}
//# sourceMappingURL=Cliente.d.ts.map
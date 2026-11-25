import type { Cliente } from "./Cliente";
export declare class Conta {
    numero: number;
    agencia: number;
    dataAbertura: string;
    saldo: number;
    limiteDiario: number;
    saquesDoDia: number;
    bloqueada: boolean;
    titular: Cliente;
    constructor(numero: number, agencia: number, dataAbertura: string, saldo: number, limiteDiario: number, titular: Cliente);
    sacar(valor: number): void;
    depositar(valor: number): void;
    consultarSaldo(): number;
}
//# sourceMappingURL=Conta.d.ts.map
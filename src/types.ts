export enum OPERATION_TYPE {
    ADD = "ADD",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV"
};

export interface Operation {
    type: OPERATION_TYPE,
    value: number
}

export type OperationSequence = Operation[];

export interface GameRound {
    initialNumber: number;
    sequence: OperationSequence;
}
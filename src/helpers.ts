import { DIFFICULTY, MAX_NUMBER, OPERATION_SEQUENCES } from "./constants";
import { OPERATION_TYPE } from "./types";

export const randomAddNumber = (currentNumber: number) => {
    return Math.floor(Math.random()) * (MAX_NUMBER - currentNumber) + 1
}

export const randomSubstractNumber = (currentNumber: number) => {
    return Math.floor(Math.random() * currentNumber) + 1;
}

export const randomMultiplyNumber = (currentNumber: number) => {
    const multiplicands = [];
    for (let i = 2; i <= MAX_NUMBER; i++) {
        if (currentNumber * i <= MAX_NUMBER) {
            multiplicands.push(i);
        }
    }
    return multiplicands[Math.floor(Math.random() * multiplicands.length)];
}

export const randomDivideNumber = (currentNumber: number) => {
    if (currentNumber === 1) {
        return 1;
    }
    let n = currentNumber - 1;
    let divisors = [];
    while(n--) {
        if (currentNumber % n === 0) {
            divisors.push(n); 
        }
    }
    return divisors[Math.floor(Math.random() * divisors.length)];
}

export const startGameRound = (difficulty = DIFFICULTY.easy) => {
    let current = 13;
    const ops = OPERATION_SEQUENCES[difficulty][Math.floor(Math.random() * 6)];
    const sequence = ops.map(op => {
        // for adding and substraction just use any value 1-99 that gives a positive value
        // for multiplication and division only some values are posible
        if (op === OPERATION_TYPE.ADD) {
            const value = randomSubstractNumber(current);
            current -= value;
            return {
                type: op,
                value
            }
        } else if (op === OPERATION_TYPE.SUB) {
            const value = randomAddNumber(current);
            current += value;
            return {
                type: op,
                value
            }
        } else if (op === OPERATION_TYPE.MUL) {
            const value = randomDivideNumber(current);
            if (value === 1) {
                return null;
            }
            current /= value;
            return {
                type: op,
                value
            }
        } else if (op === OPERATION_TYPE.DIV) {
            const value = randomMultiplyNumber(current);
            current *= value;
            return {
                type: op,
                value
            }
        }
    });
    return {
        initialNumber: current,
        sequence: sequence.filter(s => s)
    }
}

import { DIFFICULTY, OPERATION_SEQUENCES } from "./constants";
import { OPERATION_TYPE } from "./types";

const MAX_NUMBER = 99;

export const randomAddNumber = (currentNumber: number) => {
    return Math.floor(Math.random()) * (MAX_NUMBER - currentNumber) + 1
}

export const randomSubstractNumber = (currentNumber: number) => {
    return Math.floor(Math.random() * currentNumber);
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
    const ops = OPERATION_SEQUENCES[difficulty][Math.floor(Math.random() * 8)];
    const sequence = ops.map(op => {
        // for adding and substraction just use any value 1-9 that gives a positive value
        // for multiplication and division only some values are posible
        if (op === OPERATION_TYPE.ADD) {
            const value = randomSubstractNumber(current); // TODO: review this
            current -= value;
            console.log("number", current)
            return {
                type: op,
                value
            }
        } else if (op === OPERATION_TYPE.SUB) {
            const value = randomAddNumber(current);
            current += value;
            console.log("number", current)
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
            console.log("number", current)
            return {
                type: op,
                value
            }
        } else if (op === OPERATION_TYPE.DIV) {
            const value = randomMultiplyNumber(current);
            current *= value;
            console.log("number", current)
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

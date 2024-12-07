export function generateOperatorCombinations(numberOfOperators: number, supportedOperators: string[]) {
    if (numberOfOperators === 1) {
        return supportedOperators;
    }

    const variations = generateOperatorCombinations(numberOfOperators - 1, supportedOperators);
    const operatorCombinations: string[][] = [];

    supportedOperators.forEach((operator) => {
        variations.forEach((variation) => {
            if (typeof variation === 'string') {
                operatorCombinations.push([variation, operator]);
            } else {
                operatorCombinations.push([...variation, operator]);
            }
            
        });
    });

    return operatorCombinations;
}

export function addOperatorsBetweenValues(values: string[], supportedOperators: string[]) {
    const valuesWithOperators: string[] = [];
    const operatorCombinations = generateOperatorCombinations(values.length - 1, supportedOperators);

    operatorCombinations.forEach((operators) => {
        let combination = '';
        values.forEach((value, index) => {
            if (index === values.length - 1) {
                combination = combination.concat(value);
                valuesWithOperators.push(combination);
            }
            const nextOperator = typeof operators === 'string' ? operators : operators[index];
            combination = combination.concat(`${value}${nextOperator}`)
        });
    })

    return valuesWithOperators;
}

export function calculateEquation(equation: string, supportedOperators: string[]) {
    const operators = equation.split(/\d+/g).filter((operator) => supportedOperators.includes(operator));
    const numbers = equation.split(/\D+/g).map((val) => Number(val));

    const results = numbers.slice(1).reduce((accumulator, number, index) => {
        if(operators[index] === '*') return accumulator * number;
        else if (operators[index] === '+') return accumulator + number;
        else if (operators[index] === '||') return accumulator = Number(accumulator.toString().concat(number.toString()));
        return accumulator;
    }, numbers[0]);
    return results; 
}
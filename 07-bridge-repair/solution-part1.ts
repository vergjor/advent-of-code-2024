import { readFileSync } from "fs";
import { addOperatorsBetweenValues, calculateEquation } from "./utils";

const calibrationOperators = ['+', '*'];
const calibrationEquations: string[] = readFileSync('07-bridge-repair/input.txt').toString().split('\n');

const totalCalibrationEquations = calibrationEquations.reduce((accumulator, calibrationEquation) => {
    const [result, calibrationValues] = calibrationEquation.split(':');
    const equationValues = calibrationValues.trim().split(' ');

    const equationCombinations = addOperatorsBetweenValues(equationValues, calibrationOperators);
    for (let index = 0; index < equationCombinations.length; index++) {
        const equationResult = calculateEquation(equationCombinations[index], calibrationOperators);
        if (equationResult === Number(result)) return accumulator + equationResult;
    }

    return accumulator;
}, 0);

console.log('Total possible calibration equations:', totalCalibrationEquations);

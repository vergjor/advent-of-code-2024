import { readFileSync } from "fs";

const validMultiplicationRegExp = new RegExp('mul\\(\\d{1,3},\\d{1,3}\\)', 'g');
const instructions = readFileSync('03-mull-it-over/input.txt').toString().match(validMultiplicationRegExp);

const sumOfMultiplications = instructions.reduce((accumulator, instruction) => {
    const values = instruction.match(new RegExp('\\d{1,3},\\d{1,3}', 'g'))[0].split(',').map((value) => Number(value));
    return accumulator + (values[0] * values[1]);
}, 0);

console.log('multiplications', sumOfMultiplications);

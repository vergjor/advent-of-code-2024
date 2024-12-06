import { readFileSync } from "fs";
import { foundXMas } from "./utils";

const coordinatesOfX = [];
const letters: string[][] = readFileSync('04-ceres-search/example.txt')
    .toString()
    .split('\n')
    .map((letterLine, lineIndex) => {
        const lineLetters = Array.from(letterLine);
        lineLetters.forEach((letter, letterIndex) => {
            if (letter === 'A') coordinatesOfX.push({ x: lineIndex, y: letterIndex });
        });
        return lineLetters;
    });

const totalXmasOccurrences = coordinatesOfX.reduce((accumulator, coordinates) => {
    if(foundXMas(letters, coordinates)) return accumulator + 1;
    return accumulator;
}, 0);

console.log('Total XMAS appearances:', totalXmasOccurrences);

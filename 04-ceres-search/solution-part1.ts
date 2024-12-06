import { readFileSync } from "fs";
import { countDiagonalXmas, countHorizontalXmas, countVerticalXmas } from "./utils";

const coordinatesOfX = [];
const letters: string[][] = readFileSync('04-ceres-search/example.txt')
    .toString()
    .split('\n')
    .map((letterLine, lineIndex) => {
        const lineLetters = Array.from(letterLine);
        lineLetters.forEach((letter, letterIndex) => {
            if (letter === 'X') coordinatesOfX.push({ x: lineIndex, y: letterIndex });
        });
        return lineLetters;
    });

const totalXmasOccurrences = coordinatesOfX.reduce((accumulator, coordinates) => {
    const diagonalXmasOccurrences = countDiagonalXmas(letters, coordinates);
    const horizontalXmasOccurrences = countHorizontalXmas(letters, coordinates);
    const verticalXmasOccurrences = countVerticalXmas(letters, coordinates);

    return accumulator + diagonalXmasOccurrences + horizontalXmasOccurrences + verticalXmasOccurrences;
}, 0);

console.log('Total XMAS appearances:', totalXmasOccurrences);

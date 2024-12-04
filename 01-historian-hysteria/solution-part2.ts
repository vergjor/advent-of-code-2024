import { readFileSync } from "fs";

const locationIds = readFileSync('01-historian-hysteria/input.txt').toString().split('\n');
const leftLocationIds: number[] = [];
const rightLocationIds: number[] = [];

locationIds.forEach((ids) => {
    const [leftLocationId, rightLocationId] = ids.split('   ');
    leftLocationIds.push(Number(leftLocationId));
    rightLocationIds.push(Number(rightLocationId));
});
    
const totalSimilarityScore = leftLocationIds.reduce((accumulator, leftLocationId, index) => {
    const occurrences = rightLocationIds.filter((id) => id === leftLocationId).length;
    console.log(`left location ID: ${leftLocationId}; occurrences: ${occurrences}`);
    return accumulator + leftLocationId * occurrences;
}, 0);

console.log('Total similarity score: ', totalSimilarityScore);
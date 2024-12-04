import { readFileSync } from "fs";

const locationIds = readFileSync('01-historian-hysteria/input.txt').toString().split('\n');
const leftLocationIds: number[] = [];
const rightLocationIds: number[] = [];

locationIds.forEach((ids) => {
    const [leftLocationId, rightLocationId] = ids.split('   ');
    leftLocationIds.push(Number(leftLocationId));
    rightLocationIds.push(Number(rightLocationId));
});

leftLocationIds.sort();
rightLocationIds.sort();
    
const totalDistance = leftLocationIds.reduce((accumulator, leftLocationId, index) => {
    const distanceBetweenLocations = Math.abs(leftLocationId - rightLocationIds[index]);
    console.log(`left location ID: ${leftLocationId}; right location ID: ${rightLocationIds[index]}; distance: ${distanceBetweenLocations}`);
    return accumulator + distanceBetweenLocations;
}, 0);

console.log('Total distance: ', totalDistance);
import { readFileSync } from "fs";
import { Coordinates } from "../types";
import { isValidIndex } from "../utils";


const antennas = new Map<string, Coordinates[]>();
const map: string[][] = readFileSync('08-resonant-collinearity/example.txt')
    .toString()
    .split('\n')
    .map((row, rowIndex) => {
        const positions = Array.from(row);
        positions.forEach((position, positionIndex) => {
            const isNumberOrLetter = position.match(new RegExp('([A-Za-z])|\\d'));
            if (isNumberOrLetter) {
                const allAntennaCoordinates = antennas.get(position) ?? [];
                allAntennaCoordinates.push({ x: rowIndex, y: positionIndex });
                antennas.set(position, allAntennaCoordinates);
            };
        });
        return positions;
    });

const totalUniqueAntinodeLocations = new Set<string>();
Array.from(antennas.values()).forEach(
    (locations) => locations.forEach(
        (coordinates) => totalUniqueAntinodeLocations.add(JSON.stringify(coordinates))))

antennas.forEach((antenna) => {
    if (antenna.length === 1) return;

    antenna.forEach((location) => {
        antenna.forEach((antennaLocation) => {
            if (location === antennaLocation) return;

            let iterations = [location, antennaLocation];
            do {
                const updatedIterations = [...iterations];
                iterations.forEach((temp) => {
                    iterations.forEach((iterationLocation) => {
                        if (temp === iterationLocation) return;

                        const xAxisDiff = Math.abs(temp.x - iterationLocation.x);
                        const yAxisDiff = Math.abs(temp.y - iterationLocation.y);

                        const antinodeCoordinates = {
                            x: temp.x < iterationLocation.x ? temp.x - xAxisDiff : temp.x + xAxisDiff,
                            y: temp.y < iterationLocation.y ? temp.y - yAxisDiff : temp.y + yAxisDiff,
                        }

                        if (isValidIndex(map.length, antinodeCoordinates)) {
                            totalUniqueAntinodeLocations.add(JSON.stringify(antinodeCoordinates));
                            const hasCoordinates = updatedIterations.some(({ x, y }) => x === antinodeCoordinates.x && y === antinodeCoordinates.y);
                            if (!hasCoordinates) {
                                updatedIterations.push(antinodeCoordinates);
                            }

                            if (map[antinodeCoordinates.x][antinodeCoordinates.y] === '.') {
                                map[antinodeCoordinates.x][antinodeCoordinates.y] = '#';
                            }
                            console.log('Updated map: ', map.map((val) => val.join(' ')));
                        }
                    });
                });

                if (JSON.stringify(updatedIterations) === JSON.stringify(iterations)) break;
                iterations = [...updatedIterations];
            } while (true);

        })
    })
})

console.log('Final map: ', map.map((val) => val.join(' ')));
console.log('Total unique antinode locations:', totalUniqueAntinodeLocations.size);
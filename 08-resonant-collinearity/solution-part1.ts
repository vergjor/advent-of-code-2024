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
antennas.forEach((antenna) => {
    if (antenna.length === 1) return;

    antenna.forEach((location) => {
        antenna.forEach((antennaLocation) => {
            if (location === antennaLocation) return;

            const xAxisDiff = Math.abs(location.x - antennaLocation.x);
            const yAxisDiff = Math.abs(location.y - antennaLocation.y);

            const antinodeCoordinates = {
                x: location.x < antennaLocation.x ? location.x - xAxisDiff : location.x + xAxisDiff,
                y: location.y < antennaLocation.y ? location.y - yAxisDiff : location.y + yAxisDiff,
            }
            
            if (isValidIndex(map.length, antinodeCoordinates)) {
                totalUniqueAntinodeLocations.add(JSON.stringify(antinodeCoordinates));
                if (map[antinodeCoordinates.x][antinodeCoordinates.y] === '.') {
                    map[antinodeCoordinates.x][antinodeCoordinates.y] = '#';
                }
            }
        })
    })
})

console.log('Total unique antinode locations:', totalUniqueAntinodeLocations.size);
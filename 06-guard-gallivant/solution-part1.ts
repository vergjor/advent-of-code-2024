import { readFileSync } from "fs";
import { changeGuardDirection, hasObstacle, nextMoveCoordinates } from "./utils";
import { Coordinates } from "../types";
import { isValidIndex } from "../utils";

let guardCoordinates: Coordinates;
const distinctGuardPositions = new Set<string>();

const guardPatrolMap: string[][] = readFileSync('06-guard-gallivant/input.txt')
    .toString()
    .split('\n')
    .map((path, pathIndex) => {
        const positions = Array.from(path);
        positions.forEach((position, positionIndex) => {
            if (position === '^') guardCoordinates = { x: pathIndex, y: positionIndex };
        });
        return positions;
    });

while (true) {
    distinctGuardPositions.add(JSON.stringify(guardCoordinates));
    const nextGuardPosition = nextMoveCoordinates(guardCoordinates, guardPatrolMap);
    if (!isValidIndex(guardPatrolMap.length, nextGuardPosition)) break;

    if (hasObstacle(nextGuardPosition, guardPatrolMap)) {
        guardPatrolMap[guardCoordinates.x][guardCoordinates.y] = changeGuardDirection(guardCoordinates, guardPatrolMap);
        continue;
    }

    guardPatrolMap[nextGuardPosition.x][nextGuardPosition.y] = guardPatrolMap[guardCoordinates.x][guardCoordinates.y];
    guardPatrolMap[guardCoordinates.x][guardCoordinates.y] = 'X';
    guardCoordinates = nextGuardPosition;
};

console.log('Total distinct guard positions:', distinctGuardPositions.size);

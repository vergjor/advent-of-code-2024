import { Coordinates } from "../types";

export function nextMoveCoordinates(guardLocation: Coordinates, map: string[][]) {
    const { x, y } = guardLocation;
    const guard = map[x][y];

    switch(guard) {
        case '^': return { x: x - 1, y };
        case '<': return { x, y: y - 1 };
        case '>': return { x, y: y + 1 };
        case 'v': return { x: x + 1, y };
        default: return guardLocation;
    }
}

export function changeGuardDirection(guardLocation: Coordinates, map: string[][]) {
    const { x, y } = guardLocation;
    const guard = map[x][y];

    switch(guard) {
        case '^': return '>';
        case '<': return '^';
        case '>': return 'v';
        case 'v': return '<';
        default: return '';
    }
}

export function hasObstacle(guardLocation: Coordinates, map: string[][]) {
    const { x, y } = guardLocation;
    const positionOnMap = map[x][y];

    if (positionOnMap === '#') return true;;
    return false;
}

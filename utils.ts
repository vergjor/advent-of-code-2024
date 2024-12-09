import { Coordinates } from "./types";

export function isValidIndex(lastIndex: number, coordinates: Coordinates) {
    const { x, y } = coordinates;
    return x >= 0 && x < lastIndex && y >= 0 && y < lastIndex;
}
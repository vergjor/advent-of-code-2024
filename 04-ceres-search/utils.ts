type Coordinates = { x: number; y: number; };

function isValidIndex(lastIndex: number, coordinates: Coordinates) {
    const { x, y } = coordinates;
    return x >= 0 && x < lastIndex && y >= 0 && y < lastIndex;
}

function countMatches(letters: string[][], coordinates: Coordinates, signCombinations: Coordinates[]) {
    const letterMap = {
        1: 'M',
        2: 'A',
        3: 'S',
    };

    return signCombinations.reduce((accumulator, signCombination) => {
        if (isMatch(letters, coordinates, signCombination, letterMap)) return accumulator + 1;
        return accumulator
    }, 0);
}

function setupDiagonalCombinations(coordinates: Coordinates) {
    const { x, y } = coordinates;
    const diagonalCoordinates = {
        primary: {
            top: { x: x - 1, y: y - 1 },
            bottom: { x: x + 1, y: y + 1 }
        },
        secondary: {
            top: { x: x - 1, y: y + 1 },
            bottom: { x: x + 1, y: y - 1 },
        },
    }
    
    return {
        primary: [
            {
                M: diagonalCoordinates.primary.top,
                S: diagonalCoordinates.primary.bottom,
            },
            {
                M: diagonalCoordinates.primary.bottom,
                S: diagonalCoordinates.primary.top,
            },],
        secondary: [
            {
                M: diagonalCoordinates.secondary.top,
                S: diagonalCoordinates.secondary.bottom,
            },
            {
                M: diagonalCoordinates.secondary.bottom,
                S: diagonalCoordinates.secondary.top,
            }
        ],
    };
}

function hasFoundDiagonal(letters: string[][], diagonalCoordinates: { M: Coordinates; S: Coordinates }) {
    const { x: xForM, y: yForM } = diagonalCoordinates.M;
    const { x: xForS, y: yForS } = diagonalCoordinates.S;

    return letters[xForM][yForM] === 'M' && letters[xForS][yForS] === 'S';
};

export function isMatch(letters: string[][], coordinates: Coordinates, coordinateSign: Coordinates, letterMap: Record<number, string>) {
    const { x, y } = coordinates;
    const { x: signOfX, y: signOfY } = coordinateSign;
    let matchFound = true;

    Object.keys(letterMap).forEach((key) => {
        if (!matchFound || !isValidIndex(letters.length, {
            x: x + (Number(key) * signOfX),
            y: y + (Number(key) * signOfY),
        })) {
            matchFound = false;
            return;
        };

        const letter = letters[x + (Number(key) * signOfX)][y + (Number(key) * signOfY)];
        if (letter !== letterMap[key]) {
            matchFound = false;
        }
    })

    return matchFound;
}

export function countDiagonalXmas(letters: string[][], coordinates: Coordinates) {
    const signCombinations = [
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 }
    ];

    return countMatches(letters, coordinates, signCombinations);
}

export function countVerticalXmas(letters: string[][], coordinates: Coordinates) {
    const signCombinations = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];

    return countMatches(letters, coordinates, signCombinations);
}

export function countHorizontalXmas(letters: string[][], coordinates: Coordinates) {
    const signCombinations = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
    ];

    return countMatches(letters, coordinates, signCombinations);
}

export function foundXMas(letters: string[][], coordinates: Coordinates) {
    const { primary, secondary } = setupDiagonalCombinations(coordinates);

    if (
        !isValidIndex(letters.length, primary[0].M)
        || !isValidIndex(letters.length, primary[0].S)
        || !isValidIndex(letters.length, secondary[0].M)
        || !isValidIndex(letters.length, secondary[0].S)
    ) return false;

    const isPrimaryDiagonalAMatch = hasFoundDiagonal(letters, primary[0]) || hasFoundDiagonal(letters, primary[1]);
    const isSecondaryDiagonalAMatch = hasFoundDiagonal(letters, secondary[0]) || hasFoundDiagonal(letters, secondary[1]);

    if (isPrimaryDiagonalAMatch && isSecondaryDiagonalAMatch) return true;
    return false;
}

export const isSafeReport = (levels: number[]) => {
    if (levels[0] < levels[1]) levels.reverse();

    for (let index = 0; index + 1 < levels.length; index++) {
        const levelDecreaseDiff = levels[index] - levels[index + 1];
        if (levelDecreaseDiff === 0 || levelDecreaseDiff > 3 || levels[index] < levels[index + 1]) {
            return false;
        };
    }
    return true;
}
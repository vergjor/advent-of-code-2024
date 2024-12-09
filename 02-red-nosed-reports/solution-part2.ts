import { readFileSync } from "fs";
import { isSafeReport } from "./utils";

const reports = readFileSync('02-red-nosed-reports/input.txt').toString().split('\n');

const safeReports = reports.reduce((accumulator, report) => {
    const levels = report.split(' ').map((level) => Number(level));
    if (isSafeReport(levels)) return accumulator + 1;
    else {
        for (let index = 0; index < levels.length; index++) {
            const currentIterationLevels = [...levels];
            currentIterationLevels.splice(index, 1);
            if (isSafeReport(currentIterationLevels)) return accumulator + 1;
        }
    }
    return accumulator;
}, 0);

console.log('Total safe reports: ', safeReports);
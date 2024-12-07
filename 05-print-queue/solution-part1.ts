import { readFileSync } from "fs";

const instructions: string[] = readFileSync('05-print-queue/example.txt')
    .toString()
    .split('\n');

const printRules = new Map<string, Set<string>>();
const endOfPrintRules = instructions.indexOf('');
instructions.slice(0, endOfPrintRules).forEach((rule) => {
    const [key, value] = rule.split('|');
    if (printRules.has(key)) {
        const pages = printRules.get(key);
        printRules.set(key, pages.add(value));
        return;
    }

    printRules.set(key, new Set<string>([value]));
});

const totalCorrectlyOrderedUpdates = instructions.slice(endOfPrintRules + 1).reduce((accumulator, pageUpdates) => {
    const updates = pageUpdates.split(',');
    const orderedPageUpdates = [...updates];
    updates.reverse();

    let correctlyOrderedPageUpdates = true;
    do {
        if (!correctlyOrderedPageUpdates) return accumulator;

        const printPage = updates.pop();
        const indexOfPrintPage = orderedPageUpdates.indexOf(printPage);

        orderedPageUpdates.forEach((pageNumber, index) => {
            if (!correctlyOrderedPageUpdates) return;

            const rules = printRules.get(pageNumber);
            const hasRuleForPage = rules && Array.from(rules).some((rule) => printPage === rule);
            
            if (hasRuleForPage && index > indexOfPrintPage) {
                correctlyOrderedPageUpdates = false;
            }
        });
    } while (updates.length > 0);


    const middlePageIndex = Math.floor(orderedPageUpdates.length / 2);
    return accumulator + Number(orderedPageUpdates[middlePageIndex]);
}, 0);

console.log('Total correctly ordered page updates:', totalCorrectlyOrderedUpdates);

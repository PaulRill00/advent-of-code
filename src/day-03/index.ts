import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const rowLength = input.length;
    const colLength = input[0].length
    let total = 0;

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            if (!/\d/.test(input[row][col])) continue;

            // This is the first digit of a number, now to find the rest
            let num = input[row][col];

            for (let l = col + 1; l < colLength; l++) {
                if (!/\d/.test(input[row][l])) break;

                num += input[row][l];
            }

            // Check adjacent symbols
            checkloop: for (let offsetX = Math.max(0, col - 1); offsetX < Math.min(colLength, col + num.length + 1); offsetX++) {
                for (let offsetY = Math.max(0, row - 1); offsetY < Math.min(rowLength, row + 2); offsetY++) {

                    // Test for anything that is not a number, nor a dot.
                    if (/[^\d.]+/.test(input[offsetY][offsetX])) {
                        total += Number(num);
                        break checkloop;
                    }
                }
            }

            col += num.length - 1;
        }
    }

    return `Total: ${total}`;
}

export default dayFn;
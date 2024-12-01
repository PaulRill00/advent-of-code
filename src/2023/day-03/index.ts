import { DayFunction } from '../../DayFunction';

const dayFn: DayFunction = (input) => {
    const rowLength = input.length;
    const colLength = input[0].length
    let total = 0;

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            if (input[row][col] !== '*') continue;

            const numbers: number[] = [];

            for (let offsetY = Math.max(0, row - 1); offsetY < Math.min(rowLength, row + 2); offsetY++) {
                for (let offsetX = Math.max(0, col - 1); offsetX < Math.min(colLength, col + 2); offsetX++) {
                    if (!/\d/.test(input[offsetY][offsetX]))
                        continue;

                    let num = input[offsetY][offsetX];
                    let rOffsetCount = 0;

                    // Traverse backwards
                    for (let l = offsetX - 1; l >= 0; l--) {
                        if (!/\d/.test(input[offsetY][l])) break;

                        num = `${input[offsetY][l]}${num}`;
                    }

                    // Traverse forward
                    for (let l = offsetX + 1; l < colLength; l++) {
                        if (!/\d/.test(input[offsetY][l])) break;

                        num = `${num}${input[offsetY][l]}`;
                        rOffsetCount++;
                    }

                    offsetX += rOffsetCount;

                    numbers.push(Number(num));
                }
            }

            if (numbers.length < 2)
                continue;

            total += (numbers[0] * numbers[1]);
        }
    }

    return `Total: ${total}`;
}

export default dayFn;
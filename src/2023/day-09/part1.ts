import { DayFunction } from '../../DayFunction';

function getSequenceDiff(sequence: number[]): number[] {
    const diff: number[] = [];

    for (let i = 0; i < sequence.length - 1; i++) {
        diff.push(sequence[i + 1] - sequence[i])
    }

    return diff;
}

function calcExtrapolatedValue(sequence: number[]): number {
    let history: number[][] = [sequence];
    let lastSeq = history[history.length - 1];

    while(lastSeq.some(x => x !== 0)) {
        lastSeq = getSequenceDiff(lastSeq);
        history.push(lastSeq)
    }

    history[history.length - 1].push(0);


    for (let i = history.length - 1; i > 0; i--) {
        const current = history[i];
        const lastValue = current[current.length - 1];

        const prevRow = history[i - 1];
        const prevLastValue = prevRow[prevRow.length - 1];

        prevRow.push(prevLastValue + lastValue);
    }

    return history[0][history[0].length - 1];
}

const dayFn: DayFunction = (input) => {
    const histories = input.map(row => row.split(' ').map(Number));
    
    let total = 0;
    histories.forEach(history => {
        total += calcExtrapolatedValue(history);
    })    

    return `Total: ${total}`;
}

export default dayFn;
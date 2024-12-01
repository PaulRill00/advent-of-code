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

    history[history.length - 1].unshift(0);

    for (let i = history.length - 1; i > 0; i--) {
        const current = history[i];
        const firstValue = current[0];

        const prevRow = history[i - 1];
        const prevFirstValue = prevRow[0];

        prevRow.unshift(prevFirstValue - firstValue);
    }

    return history[0][0];
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
import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    let total = 0;

    for (const row of input) {
        const inputs = row.split(': ')[1].split(' | ');
        const winning = inputs[0].split(' ').map(x => x.trim()).filter(x => x.length);
        const numbers = inputs[1].split(' ').map(x => x.trim()).filter(x => x.length);

        let matches = numbers.reduce((totalMatches, number) => {
            if (winning.includes(number))
                totalMatches++;
            return totalMatches
        }, 0);

        if (matches <= 0) continue; 

        // By doing 2 pow result-1 we get 2^0 = 1, 2^1=2, etc...
        const cardTotal = 2 ** (matches-1);

        total += cardTotal;
    }

    return `Total points: ${total}`;
}

export default dayFn;
import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    let total = 0;

    // For keeping track how many instances we've found of a specific card
    const cardInstances = new Map<number, number>();

    for (const row of input) {
        const [cardName, _inputs] = row.split(': ')
        const cardId = Number(cardName.replaceAll('Card ', ''));
        const inputs = _inputs.split(' | ');
        const winning = inputs[0].split(' ').map(x => x.trim()).filter(x => x.length);
        const numbers = inputs[1].split(' ').map(x => x.trim()).filter(x => x.length);

        let matches = numbers.reduce((totalMatches, number) => {
            if (winning.includes(number))
                totalMatches++;
            return totalMatches
        }, 0);


        const ownInstances = (cardInstances.get(cardId) ?? 0) + 1;
        cardInstances.set(cardId, ownInstances);
        total += ownInstances;

        if (matches <= 0) continue; 

        for (let i = cardId + 1; i < Math.min(cardId + matches + 1, input.length); i++) {
            let instances = cardInstances.get(i) ?? 0;
            instances += ownInstances;
            cardInstances.set(i, instances);
        }
    }

    return `Total points: ${total}`;
}

export default dayFn;
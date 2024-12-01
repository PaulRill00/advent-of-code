import { DayFunction } from '../../DayFunction';

const dayFn: DayFunction = (input) => {
    let total = 0;

    input.forEach(game => {
        const subSets = game.split(': ')[1];
        const sets = subSets.split('; ');

        const lowestValues = {
            red: 0,
            blue: 0,
            green: 0
        }

        for(let set of sets) {
            const values = set.split(', ');

            for (let colorString of values) {
                const color = ['red', 'green', 'blue'].find(x => colorString.includes(x))!;
                const value = Number(colorString.replace(` ${color}`, ''));

                if (value > lowestValues[color]) {
                    lowestValues[color] = value;
                }
            }
        }

        const gameTotal = lowestValues.red * lowestValues.blue * lowestValues.green;
        total += gameTotal;
    })

    return `Total of game ids: ${total}`;
}

export default dayFn;
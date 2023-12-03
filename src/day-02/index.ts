import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const maxValues = {
        red: 12,
        green: 13,
        blue: 14
    }

    let gameIdTotal = 0;

    input.forEach(game => {
        const [gameName, subSets] = game.split(': ');

        const gameId = Number(gameName.replaceAll('Game ', ''));
        const sets = subSets.split('; ');

        let validGame = true;

        setsloop: for(let set of sets) {
            const values = set.split(', ');

            for (let colorString of values) {
                const color = Object.keys(maxValues).find(x => colorString.includes(x))!;
                const value = Number(colorString.replace(` ${color}`, ''));

                if (value > maxValues[color]) {
                    validGame = false;
                    break setsloop;
                }
            }
        }

        if (validGame)
            gameIdTotal += gameId;
    })

    return `Total of game ids: ${gameIdTotal}`;
}

export default dayFn;
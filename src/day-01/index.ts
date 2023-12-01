import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const spelled = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    };
    
    let total = 0;

    input.forEach(line => {
        let first: number|undefined = undefined;
        let last: number|undefined = undefined;
        
        [...line].forEach((char, index) => {
            const numberWord = Object.keys(spelled).find(word => line.substring(index).startsWith(word));
            let number = numberWord ? spelled[numberWord] : Number(char)

            if (Number.isNaN(number)) return;
            
            if (first === undefined) first = number;
            else last = number;
        })       

        total += Number(`${first}${last ?? first}`);
    })    
    
    return `Total: ${total}`;
}

export default dayFn;
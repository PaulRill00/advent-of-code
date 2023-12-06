import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const time = input[0].split(':')[1].split(' ').map(x => x.trim()).filter(x => x.length)
    const distance = input[1].split(':')[1].split(' ').map(x => x.trim()).filter(x => x.length)

    const races = time.reduce<[number, number][]>((acc, time, index) => {
        const dt = distance[index];
        acc.push([Number(time), Number(dt)]);
        return acc;
    }, []);

    let score = 1;

    for (const [raceTime, raceDistance] of races) {
        let winningTimes: number[] = [];
        for (let speed = 1; speed <= raceTime; speed++) {
            const distance = (raceTime - speed) * speed;

            if (distance > raceDistance)
                winningTimes.push(speed);
        }

        score *= winningTimes.length;
    }

    return `Racing score: ${score}`;
}

export default dayFn;
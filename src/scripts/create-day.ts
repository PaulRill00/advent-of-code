import fs from 'fs';
import path from 'path';
import { year } from '../runner';

(async () => {
    const day = process.argv.slice(2)[0].padStart(2, '0');

    const folder = path.join(__dirname, `../${year}/day-${day}`);

    if (fs.existsSync(folder))
        throw new Error('Folder already exists')

    const content = `import { DayFunction } from '../../DayFunction';

const dayFn: DayFunction = (input) => {
    // Start here

    return \`\`;
}

export default dayFn;`

    fs.mkdirSync(folder);

    fs.writeFileSync(path.join(folder, 'part1.ts'), content, { flag: 'w+' });
    fs.writeFileSync(path.join(folder, 'part2.ts'), content, { flag: 'w+' });
    fs.writeFileSync(path.join(folder, 'input.txt'), '', { flag: 'w+' });
})();
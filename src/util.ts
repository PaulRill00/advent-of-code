import fs from 'fs';
import path from 'path';
import { year } from './runner';

export function getInput(day: string): string[] {
    const text = fs.readFileSync(path.join(__dirname, `${year}/day-${day}/input.txt`)).toString('utf-8');
    return text.split('\n');
}
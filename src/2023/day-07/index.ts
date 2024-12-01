import { DayFunction } from '../../DayFunction';

const CARDS = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
enum HandScores {
    FIVE_OF_A_KIND = 0,
    FOUR_OF_A_KIND = 1,
    FULL_HOUSE = 2,
    THREE_OF_A_KIND = 3,
    TWO_PAIR = 4,
    ONE_PAIR = 5,
    HIGH_CARD = 6
}

class Hand {
    private handScore: HandScores;

    constructor(public readonly hand: string, public readonly bet: number) {
        this.handScore = this.calcualteScore();
    }

    private getCounts() {
        const map = new Map<string, number>();

        for (const card of [...this.hand]) {
            const count = map.get(card) ?? 0;
            map.set(card, count + 1);
        }

        return map;
    }

    private get containsJokers() {
        return ~this.hand.indexOf('J');
    }

    private getJokerCount(counts: Map<string, number>): number {
        return counts.get('J') ?? 0
    }

    private isFiveOfAKind(counts: Map<string, number>) {
        if (counts.size === 1)
            return true;

        if (counts.size === 2 && this.containsJokers)
            return true;

        return false;
    }

    private isFourOfAKind(counts: Map<string, number>) {
        const values = [...counts.entries()]
            .filter(([x]) => x !== 'J')
            .map(([,a]) => a)
            .sort((a, b) => a - b);

        return values[0] === 1 && (values[1] + this.getJokerCount(counts)) === 4;
    }

    private isFullHouse(counts: Map<string, number>) {        
        const values = [...counts.entries()]
            .filter(([x]) => x !== 'J')
            .map(([,a]) => a)
            .sort((a, b) => a - b);

        return (
            (values[0] + this.getJokerCount(counts)) === 2 && values[1] === 3 ||
            values[0] === 2 && (values[1] + this.getJokerCount(counts)) === 3
        );
    }

    private isThreeOfAKind(counts: Map<string, number>) {        
        const values = [...counts.entries()]
            .filter(([x]) => x !== 'J')
            .map(([,a]) => a)
            .sort((a, b) => b - a);

        return (values[0] + this.getJokerCount(counts)) === 3;
    }

    private isTwoPair(counts: Map<string, number>) {     
        const values = [...counts.entries()]
            .filter(([x]) => x !== 'J')
            .map(([,a]) => a)
            .sort((a, b) => b - a);
        
        return (
            (values[0] + this.getJokerCount(counts)) === 2 && values[1] === 2 ||
            values[0] === 2 && (values[1] + this.getJokerCount(counts)) === 2
        );
    }

    private isOnePair(counts: Map<string, number>) {     
        if (this.getJokerCount(counts) && counts.size === 5)
            return true;

        return counts.size === 4;
    }

    private calcualteScore(): HandScores {
        const counts=  this.getCounts();
        if (this.isFiveOfAKind(counts))
            return HandScores.FIVE_OF_A_KIND;
        if (this.isFourOfAKind(counts))
            return HandScores.FOUR_OF_A_KIND;
        if (this.isFullHouse(counts))
            return HandScores.FULL_HOUSE;
        if (this.isThreeOfAKind(counts))
            return HandScores.THREE_OF_A_KIND;
        if (this.isTwoPair(counts))
            return HandScores.TWO_PAIR;
        if (this.isOnePair(counts))
            return HandScores.ONE_PAIR;
        return HandScores.HIGH_CARD;
    }

    public get score() {
        return this.handScore;
    }

    public compare(hand: Hand): number {
        const ownScore = this.score;
        const comparedScore = hand.score;

        if (ownScore !== comparedScore)
            return comparedScore < ownScore ? 1 : -1;

        for(let i = 0; i < this.hand.length; i++) {
            const ownCard = this.hand[i];
            const comparedCard = hand.hand[i];

            const ownCardScore = CARDS.indexOf(ownCard);
            const comparedCardScore = CARDS.indexOf(comparedCard);

            if (ownCardScore === comparedCardScore) continue;

            return comparedCardScore < ownCardScore ? 1 : -1;
        }

        return 0;
    }
}

const dayFn: DayFunction = (input) => {
    const hands = input.map(row => {
        const [hand, bet] = row.split(' ');
        return new Hand(hand, Number(bet));
    })

    const sorted = hands.sort((a, b) => b.compare(a));

    let total = 0;   

    sorted.forEach((hand, index) => {
        const mult = index + 1;
        total += hand.bet * mult;
    });

    return `Total winnings: ${total}`;
}

export default dayFn;
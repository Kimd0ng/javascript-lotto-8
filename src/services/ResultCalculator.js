const PRIZE = {
    THREE: 5000,
    FOUR: 50000,
    FIVE: 1500000,
    FIVE_BONUS: 30000000,
    SIX: 2000000000,
};

class ResultCalculator {
    static countMatches(ticketNumbers, winningSet) {
        let count = 0;
        ticketNumbers.forEach((n) => {
            if (winningSet.has(n)) count += 1;
        });
        return count;
    }

    static calculate(tickets, winningNumbers, bonusNumber) {
        const winningSet = new Set(winningNumbers);
        const counts = {
            3: 0,
            4: 0,
            5: 0,
            '5b': 0,
            6: 0,
        };

        tickets.forEach((ticket) => {
            const nums = typeof ticket.getNumbers === 'function' ? ticket.getNumbers() : ticket;
            const matchCount = ResultCalculator.countMatches(nums, winningSet);
            if (matchCount === 6) {
                counts[6] += 1;
                return;
            }
            if (matchCount === 5) {
                if (nums.includes(bonusNumber)) {
                    counts['5b'] += 1;
                    return;
                }
                counts[5] += 1;
                return;
            }
            if (matchCount === 4) {
                counts[4] += 1;
                return;
            }
            if (matchCount === 3) {
                counts[3] += 1;
            }
        });

        const totalPrize =
            counts[3] * PRIZE.THREE +
            counts[4] * PRIZE.FOUR +
            counts[5] * PRIZE.FIVE +
            counts['5b'] * PRIZE.FIVE_BONUS +
            counts[6] * PRIZE.SIX;

        return { counts, totalPrize };
    }
}

export { PRIZE };
export default ResultCalculator;

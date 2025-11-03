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

    static classify(nums, winningSet, bonusNumber) {
        const m = ResultCalculator.countMatches(nums, winningSet);
        if (m === 6) return 6;
        if (m === 5) {
            if (nums.includes(bonusNumber)) return '5b';
            return 5;
        }
        if (m === 4) return 4;
        if (m === 3) return 3;
        return null;
    }

    static computeTotalPrize(counts) {
        return (
            counts[3] * PRIZE.THREE +
            counts[4] * PRIZE.FOUR +
            counts[5] * PRIZE.FIVE +
            counts['5b'] * PRIZE.FIVE_BONUS +
            counts[6] * PRIZE.SIX
        );
    }

    static calculate(tickets, winningNumbers, bonusNumber) {
        const winningSet = new Set(winningNumbers);
        const counts = { 3: 0, 4: 0, 5: 0, '5b': 0, 6: 0 };

        tickets.forEach((ticket) => {
            const nums = typeof ticket.getNumbers === 'function' ? ticket.getNumbers() : ticket;
            const key = ResultCalculator.classify(nums, winningSet, bonusNumber);
            if (!key) return;
            counts[key] += 1;
        });

        const totalPrize = ResultCalculator.computeTotalPrize(counts);
        return { counts, totalPrize };
    }
}

export { PRIZE };
export default ResultCalculator;

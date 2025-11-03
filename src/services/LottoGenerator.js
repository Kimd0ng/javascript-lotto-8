import { MissionUtils } from '@woowacourse/mission-utils';

class LottoGenerator {
    static generateOne() {
        const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
        numbers.sort((a, b) => a - b);
        return numbers;
    }

    static generateMany(count) {
        const tickets = [];
        for (let i = 0; i < count; i += 1) {
            tickets.push(LottoGenerator.generateOne());
        }
        return tickets;
    }
}

export default LottoGenerator;

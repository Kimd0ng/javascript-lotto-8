import { MissionUtils } from '@woowacourse/mission-utils';
import { PRIZE } from '../services/ResultCalculator.js';

const print = (message) => MissionUtils.Console.print(String(message));

class Printer {
    static promptPurchase() {
        print('구입금액을 입력해 주세요.');
    }

    static printPurchaseCount(count) {
        print(`${count}개를 구매했습니다.`);
    }

    static printTickets(tickets) {
        tickets.forEach((nums) => {
            const line = `[${nums.join(', ')}]`;
            print(line);
        });
    }

    static promptWinningNumbers() {
        print('\n당첨 번호를 입력해 주세요.');
    }

    static promptBonusNumber() {
        print('\n보너스 번호를 입력해 주세요.');
    }

    static printStatsHeader() {
        print('\n당첨 통계');
        print('---');
    }

    static printResults(counts) {
        print(`3개 일치 (${Printer.formatCurrency(PRIZE.THREE)}원) - ${counts[3]}개`);
        print(`4개 일치 (${Printer.formatCurrency(PRIZE.FOUR)}원) - ${counts[4]}개`);
        print(`5개 일치 (${Printer.formatCurrency(PRIZE.FIVE)}원) - ${counts[5]}개`);
        print(`5개 일치, 보너스 볼 일치 (${Printer.formatCurrency(PRIZE.FIVE_BONUS)}원) - ${counts['5b']}개`);
        print(`6개 일치 (${Printer.formatCurrency(PRIZE.SIX)}원) - ${counts[6]}개`);
    }

    static printYieldRate(rate) {
        print(`총 수익률은 ${rate}%입니다.`);
    }

    static printError(error) {
        const message = error?.message ?? String(error);
        print(message.startsWith('[ERROR]') ? message : `[ERROR] ${message}`);
    }

    static formatCurrency(num) {
        return Number(num).toLocaleString('ko-KR');
    }
}

export default Printer;

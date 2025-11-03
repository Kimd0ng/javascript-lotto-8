import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import LottoGenerator from './services/LottoGenerator.js';
import ResultCalculator from './services/ResultCalculator.js';
import Printer from './views/Printer.js';
import { validatePurchaseAmount, parseAndValidateWinningNumbers, validateBonusNumber } from './utils/validators.js';

class App {
    async run() {
        const amount = await this.#readPurchaseAmount();
        const tickets = this.#issueTickets(amount);
        const winningNumbers = await this.#readWinningNumbers();
        const bonusNumber = await this.#readBonusNumber(winningNumbers);
        this.#printResults(tickets, winningNumbers, bonusNumber, amount);
    }

    async #readPurchaseAmount() {
        while (true) {
            try {
                Printer.promptPurchase();
                const input = await MissionUtils.Console.readLineAsync('');
                return validatePurchaseAmount(input);
            } catch (e) {
                Printer.printError(e);
            }
        }
    }

    #issueTickets(amount) {
        const count = Math.floor(amount / 1000);
        const generated = LottoGenerator.generateMany(count);
        const tickets = generated.map((nums) => new Lotto(nums));
        Printer.printPurchaseCount(count);
        Printer.printTickets(generated);
        return tickets;
    }

    async #readWinningNumbers() {
        while (true) {
            try {
                Printer.promptWinningNumbers();
                const input = await MissionUtils.Console.readLineAsync('');
                return parseAndValidateWinningNumbers(input);
            } catch (e) {
                Printer.printError(e);
            }
        }
    }

    async #readBonusNumber(winningNumbers) {
        while (true) {
            try {
                Printer.promptBonusNumber();
                const input = await MissionUtils.Console.readLineAsync('');
                return validateBonusNumber(input, winningNumbers);
            } catch (e) {
                Printer.printError(e);
            }
        }
    }

    #printResults(tickets, winningNumbers, bonusNumber, amount) {
        Printer.printStatsHeader();
        const { counts, totalPrize } = ResultCalculator.calculate(tickets, winningNumbers, bonusNumber);
        Printer.printResults(counts);
        const yieldRate = this.#formatYield(totalPrize, amount);
        Printer.printYieldRate(yieldRate);
    }

    #formatYield(totalPrize, spent) {
        if (spent === 0) return '0.0';
        const rate = (totalPrize / spent) * 100;
        return (Math.round(rate * 10) / 10).toFixed(1);
    }
}

export default App;

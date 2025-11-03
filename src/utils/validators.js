const ERROR_PREFIX = '[ERROR]';

export function validatePurchaseAmount(input) {
    const trimmed = String(input).trim();
    if (!/^\d+$/.test(trimmed)) {
        throw new Error(`${ERROR_PREFIX} 구입 금액은 숫자여야 합니다.`);
    }
    const amount = Number(trimmed);
    if (amount < 1000) {
        throw new Error(`${ERROR_PREFIX} 구입 금액은 1,000원 이상이어야 합니다.`);
    }
    if (amount % 1000 !== 0) {
        throw new Error(`${ERROR_PREFIX} 구입 금액은 1,000원 단위여야 합니다.`);
    }
    return amount;
}

export function parseAndValidateWinningNumbers(csv) {
    const numbers = String(csv)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((s) => Number(s));

    if (numbers.length !== 6) {
        throw new Error(`${ERROR_PREFIX} 당첨 번호는 쉼표로 구분된 6개 숫자여야 합니다.`);
    }
    validateNumbersArray(numbers);
    return numbers;
}

export function validateBonusNumber(input, winningNumbers) {
    const trimmed = String(input).trim();
    if (!/^\d+$/.test(trimmed)) {
        throw new Error(`${ERROR_PREFIX} 보너스 번호는 숫자여야 합니다.`);
    }
    const bonus = Number(trimmed);
    if (bonus < 1 || bonus > 45) {
        throw new Error(`${ERROR_PREFIX} 보너스 번호는 1부터 45 사이여야 합니다.`);
    }
    if (winningNumbers.includes(bonus)) {
        throw new Error(`${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복될 수 없습니다.`);
    }
    return bonus;
}

function validateNumbersArray(numbers) {
    const unique = new Set(numbers);
    if (unique.size !== 6) {
        throw new Error(`${ERROR_PREFIX} 숫자는 중복될 수 없습니다.`);
    }
    numbers.forEach((n) => {
        if (!Number.isInteger(n)) {
            throw new Error(`${ERROR_PREFIX} 번호는 정수여야 합니다.`);
        }
        if (n < 1 || n > 45) {
            throw new Error(`${ERROR_PREFIX} 번호는 1부터 45 사이여야 합니다.`);
        }
    });
}

export default {
    validatePurchaseAmount,
    parseAndValidateWinningNumbers,
    validateBonusNumber,
};

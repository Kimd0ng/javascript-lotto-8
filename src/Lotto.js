class Lotto {
    #numbers;

    constructor(numbers) {
        this.#validate(numbers);
        this.#numbers = numbers;
    }

    #validate(numbers) {
        if (numbers.length !== 6) {
            throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
        }
        const unique = new Set(numbers);
        if (unique.size !== 6) {
            throw new Error('[ERROR] 로또 번호는 중복될 수 없습니다.');
        }
        numbers.forEach((n) => {
            if (!Number.isInteger(n)) {
                throw new Error('[ERROR] 로또 번호는 정수여야 합니다.');
            }
            if (n < 1 || n > 45) {
                throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
            }
        });
    }

    getNumbers() {
        return [...this.#numbers];
    }
}

export default Lotto;

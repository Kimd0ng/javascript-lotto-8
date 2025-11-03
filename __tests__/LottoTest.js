import Lotto from '../src/Lotto';

describe('로또 클래스 테스트', () => {
    test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 6, 7]);
        }).toThrow('[ERROR]');
    });

    test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 5]);
        }).toThrow('[ERROR]');
    });

    test('로또 번호의 개수가 6개 미만이면 예외가 발생한다.', () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5]);
        }).toThrow('[ERROR]');
    });

    test.each([
        [[0, 2, 3, 4, 5, 6]], // 0 포함
        [[1, 2, 3, 4, 5, 46]], // 46 포함
    ])('로또 번호에 범위를 벗어난 숫자가 있으면 예외가 발생한다. (%p)', (numbers) => {
        expect(() => {
            new Lotto(numbers);
        }).toThrow('[ERROR]');
    });

    test('로또 번호에 정수가 아닌 값이 있으면 예외가 발생한다.', () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 3.5]);
        }).toThrow('[ERROR]');
    });

    test('경계값(1, 45)은 허용된다.', () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 45]);
        }).not.toThrow();
    });

    test('getNumbers()는 방어적 복사를 제공한다.', () => {
        const original = [1, 2, 3, 4, 5, 6];
        const lotto = new Lotto(original);
        const copy = lotto.getNumbers();

        // 반환 배열 변경이 내부 상태에 영향을 주면 안 됨
        copy[0] = 99;
        expect(lotto.getNumbers()).toEqual(original);
    });
});

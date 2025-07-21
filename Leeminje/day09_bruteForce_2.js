// 소수 찾기

/**
 * ✏️ 문제 개요
 * 문자열 형태의 숫자 조각들을 조합하여 만들 수 있는 모든 수 중에서, 소수인 수가 몇 개인지 구하는 문제
 *
 * ✏️ 목표
 * - 문자열 numbers로 만들 수 있는 모든 "조합된 숫자"를 구함
 * - 각 숫자 중 중복 없이 소수만 세서 개수 반환
 *
 * ✏️ 예상 로직
 * 1. numbers의 모든 자릿수 조합(순열)을 만든다 (1~numbers.length)
 * 2. 조합된 수들을 Set에 저장해 중복 제거
 * 3. 각각이 소수인지 판별 (isPrime 함수)
 * 4. 소수인 개수를 리턴
 *
 * ... 핵심은 "모든 순열 생성" + "중복 제거" + "소수 판별"
 */

// 풀이 코드
// 1️⃣ 모든 숫자 조합 만들기
function getPermutations(arr, selectNum) {
  if (selectNum === 1) return arr.map((val) => [val]);
  const result = [];

  arr.forEach((fixed, idx) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const perms = getPermutations(rest, selectNum - 1);
    const attached = perms.map((perm) => [fixed, ...perm]);
    result.push(...attached);
  });

  return result;
}

function solution(numbers) {
  const numPieces = numbers.split('');
  const numberSet = new Set();

  // 2️⃣ 1자리부터 전체 자리까지 조합 만들기
  for (let i = 1; i <= numPieces.length; i++) {
    const perms = getPermutations(numPieces, i);
    perms.forEach((perm) => numberSet.add(Number(perm.join(''))));
  }

  // 3️⃣ 소수 판별 함수
  const isPrime = (n) => {
    if (n === 2) return true;
    if (n < 2 || n % 2 === 0) return false;

    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  return [...numberSet].filter(isPrime).length;
}

/** 📖 풀이 과정
 * 1️⃣ 모든 숫자 조합 만들기
 * - 주어진 arr(남은 숫자 조각)에서 len길이만큼 순열을 생성하는 재귀 함수
 * - current는 지금까지 만든 숫자 조합 문자열
 * - 숫자를 하나 고르고 → 나머지에서 재귀 호출 → 길이만큼 되면 Set에 저장!
 *
 * 2️⃣ 1자리부터 전체 자리까지 조합 만들기
 * - 숫자 조각을 1자리부터 전체 자리까지 조합하기
 * - 1자리 숫자, 2자리 숫자, ..., 전체 길이 숫자까지 모두 시도!
 * - 이 단계에서 numberSet 안에 가능한 모든 조합 숫자가 들어감.
 *
 * 3️⃣ 소수 판별 함수
 * - 2와 짝수를 빠르게 제외하고, 3부터 n까지 홀수만 나눠보며 소수인지 확인
 */

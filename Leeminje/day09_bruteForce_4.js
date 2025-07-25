// 모음사전

/**
 * ✏️ 문제 개요
 * - 알파벳 A, E, I, O, U로 만들 수 있는 길이 1~5의 모든 단어가 사전에 수록되어 있음
 * - 사전은 사전순으로 정렬되어 있음 (ex: A, AA, AAA, ..., UUUUU)
 *
 * ✏️ 목표
 * - 입력된 단어가 이 사전에서 몇 번째 위치에 있는지 계산하여 반환
 *
 * ✏️ 예상 로직
 * 1. 각 자리수의 가중치를 사전 생성 규칙에 따라 계산
 * 2. 입력된 단어의 각 문자의 인덱스를 기반으로 가중치 곱합
 * 3. 단어 길이보다 짧은 단어도 사전에서 포함되므로 각 자리마다 +1 추가
 */

// 기본 풀이
const WEIGHT_WORD = ['A', 'E', 'I', 'O', 'U'];

const calcWeights = (length = 5) => {
  const weightArray = Array(length).fill(0);
  weightArray[length - 1] = 1;

  for (let i = length - 2; i >= 0; i--) {
    weightArray[i] = weightArray[i + 1] * WEIGHT_WORD.length + 1;
  }

  return weightArray;
};

function solution(word) {
  const weight = calcWeights(); // 가중치 [781, 156, 31, 6, 1]
  let answer = 0;

  for (let i = 0; i < word.length; i++) {
    const charIndex = WEIGHT_WORD.indexOf(word[i]);
    answer += charIndex * weight[i] + 1;
  }

  return answer;
}
/**📖 풀이과정
 *
 * 0️⃣ 가능한 모든 단어의 총 개수는 5자리까지 A~U 조합 = 최대 3905개
 * - 이를 직접 만들지 않고 수학적으로 접근
 *
 * 1️⃣ 각 자리수의 가중치를 계산
 * - 예: 첫 번째 자리에 A~U 중 I가 온다면, A부터 I까지 앞서 오는 조합 수를 세야 함
 * - 자리 가중치 = (다음 자리 가중치 * 5) + 1
 * - 가중치: [781, 156, 31, 6, 1]
 *
 * 2️⃣ 단어 순서 계산
 * - 각 문자의 인덱스 × 해당 자리 가중치 + 1을 누적
 * - +1은 현재 단어 그 자체를 포함시키기 위함
 *
 * 3️⃣ 누적한 값이 해당 단어의 사전 순서가 됨 (예: "AAAAE" → 6)
 */

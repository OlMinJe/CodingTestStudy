/**
 * ✏️ 문제 개요
 * - 주어진 숫자 배열(numbers)에서 각 숫자에 + 또는 -를 붙여
 *   결과값이 target이 되는 경우의 수를 구하는 문제.
 *
 * ✏️ 목표
 * - 가능한 모든 경우의 수를 탐색해서 target 값을 만드는 방법의 수를 구한다.
 *
 * ✏️ 해결 전략
 * 1. 각 숫자에 + 또는 -를 붙이는 **모든 조합**을 탐색해야 한다.
 * 2. DFS (깊이 우선 탐색)를 통해 순차적으로 더하거나 빼며 탐색을 진행한다.
 * 3. 마지막 인덱스까지 갔을 때 합이 target이면 경우의 수를 1 증가시킨다.
 */

// ✅ DFS 풀이
function solution(numbers, target) {
  let answer = 0;

  // 0️⃣ DFS 함수 정의 - index번째 숫자를 더하거나 빼며 탐색
  const dfs = (index, sum) => {
    // 1️⃣ 모든 숫자를 다 사용했을 때
    if (index === numbers.length) {
      // target과 일치하면 경우의 수 추가
      if (sum === target) answer++;
      return;
    }

    // 2️⃣ 현재 숫자를 더하는 경우
    dfs(index + 1, sum + numbers[index]);

    // 3️⃣ 현재 숫자를 빼는 경우
    dfs(index + 1, sum - numbers[index]);
  };

  // 🔁 탐색 시작
  dfs(0, 0);

  return answer;
}

/**
 * 📖 풀이과정
 *
 * 0️⃣ DFS를 사용할 이유
 * - 각각의 숫자에 + 또는 -를 붙인 모든 **경우의 수**를 확인해야 하기 때문에
 *   트리 형태로 모든 분기를 따라가는 DFS가 적합하다.
 *
 * 1️⃣ dfs(index, sum)
 * - index: 현재 탐색 중인 숫자의 인덱스
 * - sum: 지금까지 만든 숫자의 합
 * - 종료 조건: index가 마지막 숫자까지 도달했을 때 sum === target이면 정답 추가
 *
 * 2️⃣ 가지치기 없이 완전탐색
 * - numbers.length가 최대 20이므로 (2^20 = 약 100만), DFS로도 충분히 탐색 가능
 */

// ❌ BFS 풀이(시간 초과 발생함)
/**
 * function solution(numbers, target) {
  let answer = 0;
  let queue = [];

  // 0️⃣ 초기 상태 - 합 0에서 시작
  queue.push([0, 0]);

  // 🔁 큐가 빌 때까지 반복
  while (queue.length > 0) {
    const [currentSum, index] = queue.shift();

    // 1️⃣ 마지막 숫자까지 사용했을 때
    if (index === numbers.length) {
      if (currentSum === target) answer++;
    } else {
      // 2️⃣ 다음 숫자 더하기, 빼기 두 경우를 큐에 추가
      queue.push([currentSum + numbers[index], index + 1]);
      queue.push([currentSum - numbers[index], index + 1]);
    }
  }

  return answer; 
}*/

/**
 * 📖 BFS 풀이의 한계
 *
 * - 탐색 구조는 DFS와 동일하나, DFS는 스택/재귀를 사용하고, BFS는 큐에 노드를 계속 쌓는다.
 * - numbers.length가 20일 때 최대 2^20 (약 100만 개)의 노드를 큐에 넣어야 하므로,
 *   큐 처리 속도와 shift 연산으로 인해 시간 초과가 날 수 있다.
 */

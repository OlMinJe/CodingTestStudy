// 프로세스

/**
 * ✏️ 문제 개요
 * - 인쇄 대기 목록에서 우선순위가 높은 문서부터 출력되는 상황을 시뮬레이션
 * ✏️ 목표
 * - 각 문서의 인덱스를 추적하며
 * - 우선순위 비교 → 뒤로 보낼지 / 인쇄할지 결정
 * - 내가 요청한 문서가 몇 번째로 출력되는지 반환
 * ✏️ 예상 로직
 * 1. 하나의 프린터가 여러 개의 인쇄 요청을 받음
 * 2. 인쇄 요청은 운서대로 처리되지만, 대기열 중 더 높은 우선순위(priority)가 있다면, 현재 문서는 맨 뒤로 이동
 * 3. 내가 요청한 문서는 몇 번쨰로 인쇄되는가!
 */

// 초기 코드
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({ index, priority }));
  let count = 0;

  while (queue.length) {
    const current = queue.shift();
    const hasHigherPriority = queue.some((item) => item.priority > current.priority);

    if (hasHigherPriority) {
      queue.push(current);
    } else {
      count++;
      if (current.index === location) return count;
    }
  }
}

/** 📖 풀이 과정
 * - queue: 각 문서를 객체 { index, priority }로 구성해 위치 추적 가능
 * - some(): 현재 문서보다 더 높은 우선순위가 있는지 판단
 * - 조건에 따라 → 출력 처리 or 다시 뒤로 보냄
 */

// 기존 풀이(초기 코드 개선)
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({ index, priority }));
  let count = 0;

  while (queue.length) {
    const current = queue.shift();
    const maxPriority = Math.max(...queue.map((item) => item.priority));

    if (current.priority < maxPriority) {
      queue.push(current);
    } else {
      count++;
      if (current.index === location) return count;
    }
  }
}

/**
 * ✅ 개선 포인트
 * 1. Math.max(...) - 현재 문서보다 우선순위 최대값을 명확히 확인
 * 2. 비교 방식 개선 - some() 조건 판단보다 → 우선순위 명확한 수치 비교로 더 안정적
 * 3. 성능 개선 - some()은 조건 만족할 때 종료되지만, max()는 판단이 더 직관적
 */

/** 📖 풀이 과정
 * 1. 큐 초기화 → 문서의 인덱스와 우선순위를 객체로 매핑해 추적 용이하게 만듦
 * 2. 반복 처리 시작 → queue.shift()로 문서 꺼냄
 * 3. 최댓값과 비교 → 남아있는 문서 중 현재보다 높은 우선순위가 있으면 → 뒤로 보냄
 * 4. 인쇄 처리 → 그렇지 않으면 count++, 인쇄 순서 증가
 * 5. 내 문서 위치 확인 → 현재 문서의 index가 location과 같다면 → 출력 순서를 반환하고 종료
 */

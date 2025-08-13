// 입국 심사

/**
 * ✏️ 목표
 * - 입국 심사를 받는데 걸리는 최소시간 구하기
 *
 * ► 예상 로직 (이분탐색 : 파라메트릭 서치)
 * 1. 전체 시간의 중간값 구하기
 * 2. 각 심사대에서 시간 대비 몇명을 처리할 수 있는지 구한다.
 * 3. 그 사람 수가 `n`보다 작으면 `left` 포인트를 늘려주고 크면 `right` 포인트를 줄여준다.
 */

function solution(n, times) {
  times.sort((a,b) => a-b);
  let left = 0;
  let right = times[times.length-1] * n;

  while(left<=right) {
    const mid = Math.floor((left+right)/2);
    const people = times.reduce((acc,cur) => acc + Math.floor(mid/cur), 0);

    if(people < n) {
      left = mid +1;
    } else {
      right = mid -1;
    }
  }

  return left
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. 먼저 시간을 정렬 해 준다. (중간값을 구하기 위해)
 * 2. 중간 값을 구해준다. (`Math.floor(left + right / 2)`)
 * 3. 중간 시간/심사대에서 걸리는 시간은 === 각 심사대에서 처리 가능한 사람 수 이다.
 * 4. 구한 각 심사대에서 처리 가능한 사람를 더해 전체 수를 구한다.
 * 5. 전체 수가 주어진 n보다 작으면 left를 하나 늘려준다.
 * 6. 전체 수가 주어진 n보다 크면 right를 하나 줄여준다.
 * 7. 결론적으로 n과 같아진 left가 가장 최소 시간이다.
 */
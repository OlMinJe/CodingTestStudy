// 구명보트

/**
 * ✏️ 목표
 * - limit만큼 옮길 수 있는 구명보트를 최소로 움직이는 수 찾기
 *
 * ► 예상 로직 (이중포인터)
 * 1. 사람의 수를 정렬한다
 * 2. `leftPoint`를 0 부터 `rightPoint`를 사람의 수 만큼 지정한다.
 * 3. `left + right` 가 작으면 `left`를 늘려주고 `right`를 줄여주며 다시 찾는다.
 * 4. `limit`보다 크면 `right`만 줄여가며 `limit`보다 작은 경우를찾는다.
 */

function solution(people, limit) {
  let answer = 0;
  let sorted = people.sort((a,b) => a-b);

  let left = 0;
  let right = people.length -1;

  while(left <= right) {
    if(sorted[left] + sorted[right] <= limit) {
      left++;
      right--;
    } else right--;
    answer++;
  }

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. `sort` 함수를 이용하여 `people`을 정렬해준다.
 * 2. `left` 를 `0`으로 초기화한다.
 * 3. `right`를 `people.length - 1`로 초기화한다.
 * 4. `left`와 `right`가 같거나 `left`가 작을때 까진 반복하며 `limit`보다 작은 경우를 찾는다.
 * 4-1. 'left + right'가 `limit`보다 작거나 같으면 `left`를 `1` 늘려주고 `right`를 `1`줄여준다.
 * 4-2. `limit`보다 크면 'right'를 `1` 줄여주며 다시 반복하며 찾는다.
 * 4-3. 이때 `answer`를 1씩 늘려주며 옮기는 경우의 수를 늘려준다.
 */
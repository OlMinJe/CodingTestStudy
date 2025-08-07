/**
 * ✏️ 목표
 * - target number를 만들 수 있는 가짓수
 *
 * ► 예상 로직 (이중포인터)
 * 1. dfs를 통해 +경우 -경우의 가짓수를 나누어 모든 경우를 찾는다.
 * 2. 그중 target을 가지는 경우 count를 올려준다.
 * 3. count를 리턴한다.
 */

function solution(numbers, target) {
  let answer = 0;

  function dfs(idx,sum) {
    // index가 numbers.lenght와 같으면 dfs 종료
    if(idx === numbers.length){
      if(sum === target) answer++;
      return;
    }

    dfs(idx+1, sum+numbers[idx]);
    dfs(idx+1, sum-numbers[idx]);
  }

  dfs(0,0);

  return answer;
}

/**
 * 📖 풀이 과정 설명
 * 1. index를 1씩올리고 numbers를 순회하면서 수를 더해준다.
 * 2. index를 1씩 올리고 numbers를 순회하면서 수를 빼준다.
 * 3. 그렇게 만든 가상의 트리를 통해 `idx===numbers.length`이면 모든 순회를 마쳤으므로 종료해준다.
 * 4. 만약 target의 수와 sum이 같으면 `answer`를 1씩 증가해준다.
 */

/** 가상의 트리 구조
                                 (0, 0)
                      +1 /               \ -1
                 (1,1)                    (1,-1)
              +1 /     \ -1           +1 /      \ -1
          (2,2)       (2,0)       (2,0)        (2,-2)
         ...            ...           ...            ...
                    (5,3) <-- ✅ 정답!

**/
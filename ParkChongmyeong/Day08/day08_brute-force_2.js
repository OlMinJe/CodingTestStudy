// 피로도

/**
 * ✏️ 목표
 * - 피로도를 계산하여 최대 던전 수를 탐험할 수 있는 가짓수 return
 *
 * ► 예상 로직 dfs
 * 1. dfs를 이용하여 모든 던전을 순회하며 탐험 횟수 count
 * 2. 탐험을 한 후 탐험 횟수와 최대 횟수를 비교하며 최대 횟수 갱신
 * 3. dfs 재귀 종료 후 정답 return
 */

function solution(k, dungeons) {
  let answer = 0;
  let visited = new Array(dungeons.length).fill(false);

  // 현재 피로도과 탐험 횟수
  const dfs = (nowK, cntK) => {
    for(let i = 0 ; i < dungeons.length; i++) {
      // 방문하지 않았고 던전의 최소 피로도가 현재 피로도보다 낮을 때
      if(!visited[i] && dungeons[i][0] <= nowK) {
        visited[i] = true;
        dfs(nowK - dungeons[i][1], cntK+1);
        visited[i] = false;
      }
    }

    answer = Math.max(answer, cntK);
  }

  dfs(k,0)

  return answer;
}

/**
 * 📖 풀이 과정 설명
 *
 * 1. visited(방문 여부)를 던전의 크기만큼 설정
 * `new Array`와 `fill()`을 이용하여 던전의 크기만큼 boolean 형태로 초기화
 * 2. dfs를 현재 피로도와 탐험 횟수를 인자로 설정하며 함수 정의
 * If) 던전을 방문하지 않고 최소 피로도가 현재 피로도보다 낮으면
 * In if) 방문을 true 설정
 * In if) 재귀함수를 통해 현재 피로도를 현재피로도-소모피로도로 갱신, 탐험 횟수 + 1
 * In if) 모든 탐험을 완료하면 visited를 다시 false로 바꾸어 준다.(최대를 찾기 위해 반복하며 던전을 돌아야함)
 * `Math.max(최대, 현재 탐험 루트의 탐험 횟수)`로 최대 수를 갱신
 * 3. 정답 return 한다.
 */
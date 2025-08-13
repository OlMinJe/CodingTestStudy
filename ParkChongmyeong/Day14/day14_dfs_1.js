/**
 * ✏️ 목표
 * - 2D 격자 맵에서 출발지에서 도착지까지 갈 수 있는 최단 경로를 찾는 문제
 *
 * ► 예상 로직 (BFS(너비 우선 탐색) 사용)
 * 1. 상하좌우 이동방향을 배열로 저장한다.
 * 2. 큐를 이용해 탐색하면서 방문한 칸까지의 거리를 기록
 * 3. 도착지에 도달하면 그때의 거리를 반환
 */

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  const dist = Array.from({ length: n }, () => Array(m).fill(0));
  dist[0][0] = 1;

  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === n - 1 && y === m - 1) {
      return dist[x][y];
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        if (maps[nx][ny] === 1 && dist[nx][ny] === 0) {
          dist[nx][ny] = dist[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  return -1;
}

/**
 * 📖 풀이 과정 설명
 * 1. 출발 위치를 큐에 넣고 거리 1로 시작
 * 2. 큐에서 현재 위치를 꺼내 인접한 4방향 탐색
 * 3. 갈 수 있고 방문하지 않은 칸이면 거리 +1 하여 큐에 추가
 * 4. 도착지에 도달하면 현재 거리 반환
 */
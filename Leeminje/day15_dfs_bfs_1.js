// 게임 맵 최단거리
/**
 *
 * ✏️ 목표
 * - 상대 진영까지 도달할 수 있는 **최소 이동 칸 수**를 구한다.
 * - 도달할 수 없다면 -1을 반환한다.
 *
 * ✏️ 해결 전략
 * 1. 최단 거리 문제이므로 BFS(너비 우선 탐색)를 사용
 * 2. 큐에 [x, y, 현재까지의 거리] 형태로 상태를 저장
 * 3. 방문한 위치는 visited 배열로 관리해 중복 탐색을 막기
 * 4. 도착지에 처음 도달한 거리(dist)를 바로 반환!
 */

// ✅ BFS 풀이
function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const endX = n - 1;
  const endY = m - 1;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[0][0] = true;

  const queue = [[0, 0, 1]]; // 시작 위치 (0, 0), 거리 1
  let head = 0;

  // 유효한 위치인지 검사하는 함수
  const isValid = (x, y) => x >= 0 && y >= 0 && x < n && y < m && maps[x][y] === 1 && !visited[x][y];

  // 🔁 BFS 탐색
  while (head < queue.length) {
    const [x, y, dist] = queue[head++];

    // ✅ 도착지에 도달한 경우
    if (x === endX && y === endY) return dist;

    // 4방향으로 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (isValid(nx, ny)) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  // ❌ 도달할 수 없는 경우
  return -1;
}

/**
 * 📖 풀이과정
 *
 * 0️⃣ BFS를 사용할 이유
 * - (0, 0) → (n-1, m-1)까지의 **최단 거리**를 구해야 하므로, DFS보다 BFS가 적합
 * - BFS는 가까운 곳부터 차례로 탐색하기 때문에, 처음 도착한 경로가 최단 거리임이 보장됨
 *
 * 1️⃣ 큐 구조
 * - `queue`에는 [x, y, 거리] 형태로 좌표와 이동 거리를 함께 저장
 * - `shift()` 대신 `head++` 포인터 방식으로 성능을 개선
 *
 * 2️⃣ 유효한 이동인지 검사 (isValid)
 * - 맵을 벗어나지 않고, 벽이 아니며, 아직 방문하지 않은 좌표만 이동할 수 있음
 *
 * 3️⃣ visited 배열 사용
 * - 방문 여부를 기록하여 중복 탐색을 방지하며, 이미 방문한 좌표는 다시 탐색하지 않는다.
 *
 * 4️⃣ 종료 조건
 * - 도착 지점 `(n-1, m-1)`에 도달하면 그 즉시 현재 거리(dist)를 반환함.
 * - 탐색이 끝났음에도 도달하지 못한 경우 `-1`을 반환함.
 */

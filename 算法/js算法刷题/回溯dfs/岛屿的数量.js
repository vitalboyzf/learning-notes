// dfs深度优先遍历思想
function numIslands(grid) {
    if (grid.length === 0) return 0;
    let row = grid.length;
    let col = grid[0].length;
    let lands_num = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // 找到一个岛屿
            if (grid[i][j] === "1") {
                lands_num++;
                // 将相邻的岛屿合并，从grid中移除
                dfs(grid, i, j);
            }
        }
    }
    return lands_num;
}

function dfs(grid, i, j) {
    const row = grid.length;
    const col = grid[0].length;
    if (i < 0 || j < 0 || i >= row || j >= col || grid[i][j] === "0") {
        // 越界
        return;
    }
    grid[i][j] = "0";
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}
const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];


console.log(numIslands(grid));
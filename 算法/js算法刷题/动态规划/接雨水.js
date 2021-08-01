function trap(height) {
    let total = 0;
    const leftMaxHeight = new Array(height.length).fill(0);
    const rightMaxHeight = new Array(height.length).fill(0);
    for (let i = 1; i < height.length - 1; i++) {
        leftMaxHeight[i] = Math.max(leftMaxHeight[i - 1], height[i - 1]);
    }
    for (let i = height.length - 2; i > 0; i--) {
        rightMaxHeight[i] = Math.max(rightMaxHeight[i + 1], height[i + 1]);
    }
    for (let i = 1; i < height.length - 1; i++) {
        const h = Math.min(leftMaxHeight[i], rightMaxHeight[i]);
        const curHeight = h - height[i] > 0 ? h - height[i] : 0;
        total += curHeight;
    }
    return total;
}
const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height));
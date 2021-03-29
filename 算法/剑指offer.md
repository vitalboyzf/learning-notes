[TOC]
## 二维数组的查找
==在一个二维数组中（每个一维数组的长度相同），
每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。==
 - 数组实例：
```js
const arr = [
    [1, 2, 3],
    [2, 3, 4],
    [3, 5, 6]
];
```
### 1：暴力循环 【O(n^2)】
```js
function Find(target, array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === target) return true;
        }
    }
    return false;
}
```
### 2：右上查找法 【O((数组长度-1)*2)】
 - 解题思路：二维数组是按顺序排列，从左到右，从上到下，依次增大，数组必然是一个正方形矩阵。
```js
function Find(target, array) {
    let rows = array.length;
    //rows保存传入数组行的长度。
    if (rows == 0) {
        return false;
        //如果长度为0，数组为空直接反会false
    }
    let cols = array[0].length;
    //cols保存二维数组列长度
    if (cols == 0) {
        return false;
        //如果列长为空，直接返回false
    }
    let row = 0;
    let col = cols - 1;
    //将起始指针指向第一行，最后一列
    while (row < rows && col >= 0) {
        //如果行数，列数不越界，进行循环。
        if (array[row][col] < target) {
            //如果指针指向的索引位值小于目标值，说明目标值在下面的行里
            row++;//将指针指向下一行
        } else if (array[row][col] > target) {
            //如果指针指向的索引位值大于目标值，说明目标值就在当前行，向左移动指针
            col--;//指针左移
        } else {
            //如果指针既不大于也不小于目标值，则说明指针指向目标值，返回true
            return true;
        }
    }
    return false;
    //循环结束，还没有找到目标值，则说明数组中不含有目标值，返回false
}
```

## 替换空格
==请实现一个函数，将一个字符串中的每个空格替换成“% 20”。
例如，当字符串为We Are Happy.则经过替换之后的字符串为We % 20Are % 20Happy。==
### 1.正则替换
```js
function replaceSpace(str) {
    return str.replace(/\s/g, '%20');
}
```
### 2.循环添加
```js
function replaceSpace(str) {
    let arr = str.split(" ");
    let newStr = "";
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            newStr += arr[i]
        } else {
            newStr += arr[i] + "%20";
        }
    }
    return newStr;
}
```
##  逆置单链表
```js
function printListFromTailToHead(head) {
    if (head === null || head.next === null) return head;
    const result = printListFromTailToHead(head.next);
    head.next.next = head;
    head.next = null;
    return result;
}
```
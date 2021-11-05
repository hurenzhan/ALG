// 思路：
// 1. 准备最大值数量的桶（空间）
// 2. 桶的位数就是对应数值，出现一次做个记号 + 1 次
// 3. 遍历打印标记过的桶和次数
// 4. 时间复杂度：O(m+n) m:桶数 n:循环数

// 缺点：
// 对于数值较大的，会导致大量无意义空间和运算量
// 只能针对纯数值类型数据

// 适用场景：
// 纯数值且数值较小情况

const MAX_NUM = 405 // 最大数值

const numList: number[] = [88, 3, 5, 2, MAX_NUM, 3, 99];

// 最大数值 405，所以要准备 0-405 = 406 的桶
// @ts-ignore
const pailList: number[] = new Array(MAX_NUM + 1).fill(0);

// 给数字对应的桶累加次数
numList.forEach((i: number) => {
    pailList[i] += 1
});

// 遍历并打印标记过的桶
for (let i = 0; i <= MAX_NUM + 1; i++) {
    const matchNum: number = pailList[i];
    if (matchNum) { // 只处理标记过的桶
        for (let j = 0; j < matchNum; j++) console.log(i);
    }
}
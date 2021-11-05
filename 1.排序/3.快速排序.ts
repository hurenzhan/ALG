// 思路：
// 1. 找一个基数 n ，将序列大于 n 的数放到 n 的右边，反之放到左边
// 2. 用两个变量 i j ，分别从右往左找到一个小于 n 和 从左往右找到大于 n 的数，调换双方位置，直到 i j 碰头为止
// 3. 左右的序列一样用此方法排序，直到结束

// 优点：
// 1. 快排的每次交换都是跳跃式的，不会像冒泡只会在相邻数之间交换，总的交换速度就少了
// 2. 最坏去情况只可能是相邻的两个数的交换O(n²)，评价时间复杂度是(NlogN)

// 适用场景：
// 1. 任何场景

function quicksort(list: number[], leftIndex: number, rightIndex: number) {
    if (leftIndex > rightIndex) return; // 左坐标已经越过右坐标，说明没有能比较的数了

    // 基准数
    const temp = list[leftIndex];

    // 运动坐标
    let i = leftIndex;
    let j = rightIndex;

    while (i != j) {
        // 从右往左找，小于 temp 的数，否则一直移动坐标
        while (list[j] >= temp && i < j) j--;

        // 从左往右找，大于 temp 的数，否则一直移动坐标
        while (list[i] <= temp && i < j) i++;

        // 说明两个坐标没有相遇，交换位置
        if (i < j) [list[i], list[j]] = [list[j], list[i]];
    }

    // 将基准数与移动到的坐标对换位置，因为 i j 相遇的坐标数必定小于原基准数，因为 i 就是小于基准数的 j 对换过来的
    list[leftIndex] = list[i];
    list[i] = temp;

    // 继续递归左半区与右半区
    quicksort(list, leftIndex, i - 1);
    quicksort(list, i + 1, rightIndex);

    return list;
}

const numList: number[] = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

console.log(quicksort(numList, 0, numList.length - 1));
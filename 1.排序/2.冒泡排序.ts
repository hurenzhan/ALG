// 思路：
// 1. 依次循环每个数，与相邻的数对比判断是否需要调换位置
// 2. 每次循环可以确定一个数的归为，所以需要 n-1 个数归位即操作 n-1 次

// 缺点：
// 双重嵌套循环，时间复杂度是O(n²)，非常耗时
// 不适合数值过多的情况

// 适用场景：
// 数值无规律场景，解决了桶浪费空间的问题

const numList: number[] = [88, 3, 5, 2, 405, 3, 99];

// 正序
function order(list: number[]) {
    const listLength = list.length;

    for (let i = 0; i <= listLength - 1; i++) {  // 循环所有数
        for (let j = 0; j < listLength - i; j++) {  // 依次进行对比，正序每次归位最后一位，归位后的就不需要比较，所以每次 numLength - i
            if (list[j] > list[j + 1]) {    // 调换位置
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
        }
    }

    return list;
}

// 倒序
function inverted(list: number[]) {
    const listLength = list.length;

    for (let i = 0; i <= listLength - 1; i++) {
        for (let j = listLength; j > i; j--) {   // 倒数先从头归位，只比较到每次归位的下一位
            if (numList[j] > numList[j - 1]) {
                [numList[j], numList[j - 1]] = [numList[j - 1], numList[j]];
            }
        }
    }

    return list;
}

console.log(order(numList))
console.log(inverted(numList))
// 1. 购买同学们喜欢的书，投票不管多少只能购买一本，把投票的编号收集起来
// 2. 书的编号为 1~1000 的数字，需要按编号排序

const bookCodes = [20, 40, 32, 67, 40, 20, 89, 300, 400, 15];

// 根据复杂度，桶排序时间复杂度 O(N+M) 循环数 + 桶数
function pailSort(list: number[]): number[] {
    // @ts-ignore
    const pailList = new Array(1001).fill(0);

    // 给桶添加编号
    list.forEach((code: number) => {
        if (pailList[code]) return;
        pailList[code] = code;
    })

    return pailList.filter(Boolean);
}

console.log(pailSort(bookCodes));

// 冒泡排序，时间复杂度 O(n²)
function bubbleSort(list: number[]): number[] {
    let sortList = [...list];
    let listLength = sortList.length

    for (let i = 0; i < listLength - 1; i++) {
        for (let j = 0; j < listLength - i; j++) {
            if (sortList[j] > sortList[j + 1]) {
                [sortList[j], sortList[j + 1]] = [sortList[j + 1], sortList[j]]
            }
            // 剔除重复，并且要减少循环总长度
            if (sortList[j] === sortList[j + 1]) {
                sortList.splice(j + 1, 1);
                listLength--;
            }
        }
    }

    return sortList;
}

console.log(bubbleSort(bookCodes));

// 快排，时间复杂度是(NlogN)
// function quicksort(list: number[], leftIndex: number, rightIndex: number, leftRep: number[] = [], rightRep: number[] = []) {
//     if (leftIndex > rightIndex) return; // 左坐标已经越过右坐标，说明没有能比较的数了
//
//     // 基准数
//     const temp = list[leftIndex];
//
//     // 运动坐标
//     let i = leftIndex;
//     let j = rightIndex;
//
//     while (i != j) {
//         // 从右往左找，小于 temp 的数，否则一直移动坐标
//         while (list[j] >= temp && i < j) j--;
//
//         // 从左往右找，大于 temp 的数，否则一直移动坐标
//         while (list[i] <= temp && i < j) i++;
//
//         // 说明两个坐标没有相遇，交换位置
//         if (i < j) {
//             let isClearJ = false;
//             let isClearI = false;
//             const t = list[i]
//             // @ts-ignore
//             if (leftRep.includes(list[j])) {
//                 list.splice(j, 1);
//                 isClearJ = true
//             }
//             // @ts-ignore
//             if (rightRep.includes(t)) {
//                 list.splice(i, 1);
//                 isClearI = true
//             }
//
//             if (isClearJ) {
//                 if (!isClearI) {
//                     list.splice(j, 0, t);
//                 }
//             } else {
//                 leftRep.push(list[j])
//                 list[i] = list[j]
//             }
//
//             if (isClearI) {
//                 if (!isClearJ) {
//                     list.splice(i, 0, list[j]);
//                 }
//             } else {
//                 rightRep.push(t)
//                 list[j] = t
//             }
//
//             // [list[i], list[j]] = [list[j], list[i]];
//         }
//     }
//
//     // 将基准数与移动到的坐标对换位置，因为 i j 相遇的坐标数必定小于原基准数，因为 i 就是小于基准数的 j 对换过来的
//     list[leftIndex] = list[i];
//     list[i] = temp;
//     // 继续递归左半区与右半区
//     quicksort(list, leftIndex, i - 1, leftRep);
//     quicksort(list, i + 1, rightIndex, rightRep);
//
//     return list;
// }
//
// const sortList = [...bookCodes];
// quicksort(sortList, 0, bookCodes.length - 1);
// console.log(sortList)
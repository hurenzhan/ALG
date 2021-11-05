// 1. 将第 1 位删除，接着将第 2 位增加到这串数的末尾，以此类推删除到最后一位数
// 2. 再与删除的数连在一起
class Queue {
    list: number[];
    head: number;
    tail: number;

    constructor(list: number[], head?: number, tail?: number) {
        this.list = list;
        this.head = head ?? 0;  // 头指针
        this.tail = tail ?? list.length;    // 尾指针
    }
}

function demo_1(): number[] {
    const queue = new Queue([6, 3, 1, 7, 5, 8, 9, 2, 4]);

    const sortList: number[] = [];

    while (queue.head < queue.tail) {
        // 获取完数值后将头指针移动
        sortList.push(queue.list[queue.head]);
        queue.head++;

        // 下一位放到列表最后一位
        queue.list[queue.tail] = queue.list[queue.head];
        queue.tail++;

        // 继续移动指针到要删除的位置
        queue.head++;
    }

    return sortList;
}

console.log(demo_1(), 'demo_1');
// 1. 一副牌平均分 2 份，双方分别按顺序"出牌"到"桌子"上
// 2. 出的牌和桌子上的"某张牌"相同时，既"赢牌"可将两张牌及中间所夹的牌取走，添加到手中牌的末尾
// 3. 对方手牌出完视为获胜

// 问题分析：
// 1. 出牌和赢牌两个操作可以视为队列的出队和入队
// 2. 桌子可以视为一个栈，打出的牌到桌子上相当于入栈，赢牌收集所有桌子的牌就是出栈
// 3. 所以这道题需要 2 个队列和 1 个栈来解决

// 队列类
class Cards {
    list: number[];
    head: number;
    tail: number;
    name: string;

    constructor(list: number[], name?: string) {
        this.list = list;
        this.head = 0;
        this.tail = list.length;
        this.name = name ?? '';
    }

    // 入列
    add(item: number | number[]) {
        if (Array.isArray(item)) {
            this.list = this.list.concat(item);
            this.tail += item.length;
        } else {
            this.list[++this.tail] = item;
        }

    }

    // 出列
    out() {
        const item = this.list[this.head];
        if (item) {
            this.list[this.head] = 0
            this.head++;
        }
        return item;
    }

    // 获取列表
    getList() {
        return this.list.slice(this.head, this.tail)
    }
}

// 栈
class Desk {
    list: number[];
    top: number;    // 指针
    repIndex: number;   // 重复牌的坐标

    constructor() {
        this.list = [];
        this.top = 0;
        this.repIndex = -1;
    }

    // 入栈
    add(item: number) {
        this.list[this.top++] = item;
    }

    // 出栈
    out() {
        const item = this.list.pop();
        if (item) this.top--
        return item;
    }

    // 收牌
    fold() {
        let allList = []
        for (let i = this.top - 1; i >= this.repIndex; i--) {   // 下标从 0 开始， -1
            allList.push(this.list[--this.top])
        }
        this.list.length = this.repIndex;   // 清除已经移除出去的牌
        this.top = this.repIndex;   // 调整指针
        this.repIndex = -1;

        return allList;
    }

    // 检验是否有存在的牌并保存匹配坐标
    isExist(card: number) {
        this.repIndex = this.list.slice(0, this.top - 1).indexOf(card); // 最新打入的牌不能做匹配，-1
        return this.repIndex !== -1;
    }
}

const cardsA = new Cards([2, 4, 1, 2, 5, 6], 'roleA');
const cardsB = new Cards([3, 1, 3, 5, 6, 4], 'roleB');

//     [3, 3, 1]
//     [2, 5, 5, 6, 4]
// [1, 6, 2, 4, ]


function game(cardsA: Cards, cardsB: Cards) {
    const desk = new Desk();

    while (cardsA.head < cardsA.tail && cardsB.head < cardsB.tail) {    // 都有牌的时候说明游戏还没结束
        // 角色 A
        const outCardA = cardsA.out();
        desk.add(outCardA)
        // 校验桌子是否有打出的牌相同
        if (desk.isExist(outCardA)) {    // 如果有相同的，清空桌面的牌添加到自己牌后
            cardsA.add(desk.fold());
        }

        // 角色 B
        const outCardB = cardsB.out();
        desk.add(outCardB);  // 无相同的直接添加到桌面
        // 校验桌子是否有打出的牌相同
        if (desk.isExist(outCardB)) {    // 如果有相同的，清空桌面的牌添加到自己牌后
            cardsB.add(desk.fold());
        }
    }

    function handleLog(cards: Cards) {
        console.log(`
            ${cards.name}: win;
            card: ${cards.getList()};
            desk: ${desk.list};
        `)
    }

    handleLog(cardsB);
}

game(cardsA, cardsB);
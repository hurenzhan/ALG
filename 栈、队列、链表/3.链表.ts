// 节点关联指针实现链表
class LinkedNode {
    element: number;
    next: LinkedNode | null;

    constructor(element: number, next: LinkedNode | null) {
        this.element = element; // 节点
        this.next = next;   // 指针
    }
}

class Linked {
    head: LinkedNode | null;  // 头指针
    size: number;   // 长度

    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 查找节点
    private _getNode(index: number): LinkedNode | null {
        let head = this.head;
        if (head === null) return null;
        for (let i = 0; i < index; i++) {
            head = head && head.next;
        }
        return head;
    }

    add(index: number, element?: number) {
        // 直接添加节点
        if (!element) {
            element = index;    // 自己传的参数就是默认值
            index = this.size   // 添加坐标为最后一位
        }

        // 添加新头
        if (index === 0) {
            const oldHead = this.head;
            this.head = new LinkedNode(element, oldHead);
        } else {
            const prevNode = this._getNode(index - 1)   // 找到插入坐标的前一个节点
            if (!prevNode) return;
            prevNode.next = new LinkedNode(element, prevNode.next)  // 把前一个节点的指针节点指向自己的指针，然后自己赋值到前一个节点的指针上
        }
        this.size++;
    }
}

// 双数组实现链表
class ArrayLinked {
    data: number[]; // 存放数据
    right: number[];    // 存放数据的右指针指向坐标
    len: number;    // 长度

    constructor() {
        this.data = [];
        this.right = [];
        this.len = 0;
    }

    add(index: number, p?: number, value?: number) {
        const len = this.len;
        if (arguments.length < 3) {
            value = index;
            index = len;
            p = index + 1;
        }

        if (this.len) {
            this.right[p] = this.right[index];
            this.right[index] = p;
            this.data[p] = value;
        } else {
            this.data[p] = value;
        }
        this.len++;
    }

}

const l = new ArrayLinked();
l.add(1);
l.add(3);
l.add(5);
console.log(l)
// console.log(l.data[l.right[2]])

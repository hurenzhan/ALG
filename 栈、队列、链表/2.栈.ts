class Plank {
    text: string;
    top: number;

    constructor(text: string, top?: number) {
        this.text = text;
        this.top = top ?? 0;
    }

    // 校验回文 例：asysa 对称文字
    checkTimes() {
        const leftArea: any[] = [];  // 储存列表以中心分割的左半区
        const len = this.text.length;
        const mid = Math.ceil(len / 2 - 1)  // 获取中间坐标，坐标从 0 开始所以 -1
        let next = -1;
        this.top = 0    //初始化坐标

        // 将中心的左边依次入栈
        for (let i = 0; i < mid; i++) {
            leftArea[this.top++] = this.text[i];
        }

        // 匹配右半区起始坐标
        if (len % 2 === 0) {
            next = mid + 2;  // 偶数需要比奇数多移一位
        } else {
            next = mid + 1;
        }

        // 左右半区对比
        for (let i = next; i < len; i++) {
            if (leftArea[this.top - 1] !== this.text[i]) break;
            this.top--;
        }

        return this.top === 0;
    }

}

function demo_1() {
    const plank = new Plank('assycssa')
    console.log(`checkTimes: assycssa, result: ${plank.checkTimes()}`);
}

demo_1();
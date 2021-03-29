class Banner {
    constructor({
        imgWidth = 520,
        imgHeight = 280,
        container,
        pictures,
        onClick,
        onDblClick,
        autoTimerDuration,
        isAutoPlay = true
    } = {}) {
        this.doms = {
            divBanner: null,
            divImgs: null,
            divDots: null,
            divArrow: null
        };
        this.onClick = onClick;
        this.onDblClick = onDblClick;
        this.doms.divBanner = container;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.dotWidth = 12;
        this.currentIndex = 0;
        // 自动轮播定时器
        this.autoTimer = isAutoPlay ? {
            id: null,
            duration: +autoTimerDuration || 2000
        } : null;
        this.container = container;
        this.pictures = pictures;
        // 运动计时器配置
        this.timer = {
            duration: 16, // 运动间隔的时间，单位毫秒
            total: 300, // 运动的总时间，单位毫秒
            id: null // 计时器id
        };
        // 图片总数
        this.imgNumber = this.pictures.length;
        this.initApp();
    }
    // 初始化程序
    initApp() {
        this.initBanner();
        this.createImage();
        this.createDots();
        this.createArrow();
        this.initSize();
        this.initPosition();
        this.setDotStatus();
        this.bindEvent();
    }
    initBanner() {
        // 如果没有容器，生成一个容器
        if (!this.container) {
            const divBanner = document.createElement("div");
            document.body.insertBefore(divBanner, document.body.firstChild);
            this.doms.divBanner = divBanner;
            this.container = divBanner;
        }
        this.container.classList.add("banner-container");
        this.container.style.width = this.imgWidth + "px";
        this.container.style.height = this.imgHeight + "px";
        this.container.style.overflow = "hidden";
        this.container.style.position = "relative";
    }
    // 事件绑定
    bindEvent() {
        this.doms.divImgs.onmousedown = (e) => this.onmousedown(e);
        this.doms.divArrow.onclick = this.arrowClick.bind(this);
        this.doms.divDots.onclick = (e) => this.dotClick(e);
        if (this.autoTimer) {
            this.doms.divBanner.onmouseenter = this.onmouseenter.bind(this);
            this.doms.divBanner.onmouseleave = this.onmouseleave.bind(this);
            this.autoTimer.id = setInterval(this.toRight.bind(this), this.autoTimer.duration);
        }
    }
    createImage() {
        const imgs = document.createElement("div");
        imgs.className = "banner-imgs";

        for (let i = 0; i < this.pictures.length; i++) {
            const a = document.createElement("a");
            a.target = "_blank";
            a.ondblclick = (e) => {
                e.preventDefault();
                this.onDblClick(this.pictures[i], a);
            };
            a.onclick = (e) => {
                e.preventDefault();
                this.onClick(this.pictures[i], a);
            };
            const img = document.createElement("img");
            img.style.height = this.imgHeight + "px";
            img.style.width = this.imgWidth + "px";
            img.src = this.pictures[i].src;
            a.appendChild(img);
            imgs.appendChild(a);
        }
        this.doms.divImgs = imgs;
        this.container.appendChild(imgs);
        // 获取所有图片列表
        const children = this.doms.divImgs.children;
        const first = children[0];
        const last = children[children.length - 1];
        let newLastImg = first.cloneNode(true); // 深度克隆
        // 在最后添加一张和第一张图片相同的图片
        this.doms.divImgs.appendChild(newLastImg);
        const newFirstImg = last.cloneNode(true);
        // 在第一张图片之前添加一张和最后一张图片相同的图片
        this.doms.divImgs.insertBefore(newFirstImg, first);
    }
    // 初始化元素尺寸
    initSize() {
        // 设置小点容器宽度 => 一个小点的宽度*图片数量
        this.doms.divDots.style.width = this.dotWidth * this.imgNumber + "px";
        // 设置图片容器宽度 => 一张图片的宽度*(图片的数量+两张新加的图片宽度)
        this.doms.divImgs.style.width = this.imgWidth * (this.imgNumber + 2) + "px";
    }
    // 创建小圆点
    createDots() {
        // 创建小圆点容器
        const dots = document.createElement("div");
        dots.className = "banner-dots";
        // 添加到banner容器中
        this.doms.divBanner.appendChild(dots);
        // 将dots赋值给this.doms.divDots
        this.doms.divDots = dots;
        // 创建每个小圆点
        for (let i = 0; i < this.imgNumber; i++) {
            const span = document.createElement("span");
            this.doms.divDots.appendChild(span);
        }
    }
    createArrow() {
        const arrow = document.createElement("div");
        arrow.className = "banner-arrow";
        const leftBtn = document.createElement("div");
        leftBtn.className = "item left";
        leftBtn.innerHTML = "&lt;";
        const rightBtn = document.createElement("div");
        rightBtn.className = "item right";
        rightBtn.innerHTML = "&gt;";
        arrow.append(leftBtn, rightBtn);
        this.doms.divArrow = arrow;
        this.doms.divBanner.appendChild(arrow);
    }
    // 初始化位置
    initPosition() {
        // 设置位置空出第一张图片(第一张图片和倒数第二张图片相同)
        const left = (-this.currentIndex - 1) * this.imgWidth;
        this.doms.divImgs.style.marginLeft = left + "px";
    }
    // 设置小圆点的状态
    setDotStatus() {
        for (var i = 0; i < this.doms.divDots.children.length; i++) {
            var dot = this.doms.divDots.children[i];
            if (i === this.currentIndex) {
                dot.className = "active";
            }
            else {
                dot.className = "";
            }
        }
    }
    // 切换到某一个图片索引
    switchTo(nextIndex, direction) {
        // 如果想要到达的索引和当前索引相同，不用做任何事
        if (nextIndex === this.currentIndex) {
            return;
        }
        // 设置默认方向向左
        if (!direction) {
            direction = "left";
        }
        // nextIndex取值0,1,2；imgNums取值1,2,3
        const imgNums = -(nextIndex + 1);
        // newLeft就是最终要设置的marginLeft
        const newLeft = imgNums * this.imgWidth;
        // 动画设置过渡效果到marginLeft为newLeft
        this.animateSwitch(direction, newLeft);

        // 重新设置当前索引
        this.currentIndex = nextIndex;
        // 重新设置点的状态
        this.setDotStatus();
    }
    // 逐步改变marginLeft
    animateSwitch(direction, newLeft) {
        // 先停止之前的动画
        this.stopAnimate();
        // 1. 计算运动需要的次数
        const number = Math.ceil(this.timer.total / this.timer.duration);
        // 当前的运动次数
        let curNumber = 1;
        // 2. 计算总距离
        let distance;
        // 获取当前容器的marginLeft
        let curMarginLeft = parseFloat(getComputedStyle(this.doms.divImgs).marginLeft);
        // 有效图片容器总宽度，不包含首尾图片
        const totalWidth = this.imgNumber * this.imgWidth;
        // 如果容器运动方向向左 (按右边的按钮)
        if (direction === "left") {
            // console.log("cur:", curMarginLeft, "newLeft:", newLeft);
            // 如果新的marginLeft小于当前的marginLeft (正方向)
            if (newLeft < curMarginLeft) {
                // curMarginLeft到newLeft需要distance的距离
                distance = -(curMarginLeft - newLeft);
            }
            // 如果新的marginLeft大于当前的marginLeft (反方向)
            else {
                distance = -(totalWidth - Math.abs(newLeft - curMarginLeft));
            }
        }
        // 如果容器运动方向向右 (按左边的按钮)
        else {
            // 正常方向
            // console.log("cur:", curMarginLeft, "newLeft:", newLeft);
            if (newLeft > curMarginLeft) {
                distance = newLeft - curMarginLeft;
            }
            // 反方向
            else {
                distance = totalWidth - Math.abs(newLeft - curMarginLeft);
            }
        }
        // 3. 计算每次改变的距离
        const everyDistance = distance / number;
        this.timer.id = setInterval(() => {
            // 改变div的 marginLeft
            curMarginLeft += everyDistance;
            // 用于控制无缝轮播的判断逻辑
            // 如果图片容器运动方向向左(点击右边按钮)，并且当前marginLeft绝对值大于图片容器总宽度
            if (direction === "left" && Math.abs(curMarginLeft) > totalWidth) {
                // 设置marginLeft回到第一张图片位置
                curMarginLeft += totalWidth;
            }
            // 如果图片容器运动方向向右(点击左边按钮)，并且当前marginLeft决定值小于一张图片宽度
            else if (direction === "right" && Math.abs(curMarginLeft) < this.imgWidth) {
                // 设置marginLeft回到最后一张图片位置
                curMarginLeft -= totalWidth;
            }
            // 设置新的marginLeft(一点点移动容器)
            this.doms.divImgs.style.marginLeft = curMarginLeft + "px";
            // 达到目标位置，停止运动
            if (curNumber++ === number) {
                this.stopAnimate();
            }
        }, this.timer.duration);
    }
    // 停止运动动画
    stopAnimate() {
        clearInterval(this.timer.id);
        this.timer.id = null;
    }
    // 左右控制按钮箭头点击
    arrowClick(e) {
        // 如果按下左边按钮
        if (e.target.classList.contains("left")) {
            this.toLeft();
        }
        // 如果按下右边按钮
        else if (e.target.classList.contains("right")) {
            this.toRight();
        }
    }
    // 小点容器点击控制事件
    dotClick(e) {
        // 如果点击的是单个小点
        if (e.target.tagName === "SPAN") {
            // 找到当前点击的小点的索引
            const index = Array.from(e.target.parentNode.children).indexOf(e.target);
            // 控制移动图片容器移动,如果小点索引大于当前索引，就是向左移动，反之向右移动
            this.switchTo(index, index > this.currentIndex ? "left" : "right");
        }
    }
    // 左边控制按钮点击，图片容器向右移动
    toLeft() {
        // 获取下一个要移动的位置索引
        let nextIndex = this.currentIndex - 1;
        // 如果下一个位置小于0，
        if (nextIndex < 0) {
            // 下一个位置置为最后一张图片的位置
            nextIndex = this.imgNumber - 1;
        }
        // 向右移动到下一个位置
        this.switchTo(nextIndex, "right");
    }
    // 右边控制按钮点击，图片容器向左移动
    toRight() {
        // 获取下一个要移动的位置索引
        let nextIndex = (this.currentIndex + 1) % this.imgNumber;
        // 向左移动到下一个位置
        this.switchTo(nextIndex, "left");
    }
    // 鼠标进入事件，清除自动轮播定时器，自动轮播停止
    onmouseenter() {
        clearInterval(this.autoTimer.id);
        this.autoTimer.id = null;
    }
    // 鼠标离开事件，重新设置定时器，重新开始自动轮播
    onmouseleave() {
        // 如果点击图片，会刷新页面，同时设置定时器，这是触发这个事件this.autoTimer.id不为空，不需要做任何事
        if (this.autoTimer.id) return;
        this.autoTimer.id = setInterval(this.toRight.bind(this), this.autoTimer.duration);
    }
    // 鼠标按下移动切图
    onmousedown(e) {
        e.target.oncontextmenu = () => false;
        e.target.ondragstart = () => false;
        const startX = e.offsetX;
        e.target.onmouseup = (e) => {
            if (e.offsetX - startX === 0) return;
            if (e.offsetX - startX > 0) {
                let nextIndex = this.currentIndex - 1;
                if (nextIndex < 0) {
                    nextIndex = this.imgNumber - 1;
                }
                this.switchTo(nextIndex, "right");
            } else {
                let nextIndex = (this.currentIndex + 1) % this.imgNumber;
                this.switchTo(nextIndex, "left");
            }
        };
    }
}
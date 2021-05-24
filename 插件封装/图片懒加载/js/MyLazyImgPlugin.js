class LazyImgPlugin {
    constructor({
        context = document,
        attr = "lazy-image",
        callback = Function.prototype,
        speed = 300,
        threshold = 0
    }) {
        this.context = context;
        this.attr = attr;
        this.speed = speed;
        this.callback = callback;
        this.threshold = threshold;
        this.imageBoxesList = [];
        this.ob = null;
        this.init();
    }
    init() {
        this.ob = new IntersectionObserver(changes => {
            changes.forEach(change => {
                const {
                    isIntersecting,
                    target
                } = change;
                if (isIntersecting) {
                    // 需要加载
                    this.lazySingle(target);
                    // 移除对target元素的监听
                    this.ob.unobserve(target);
                }
            });
        }, {
            threshold: [this.threshold]
        });
        this.observerAll();
    }
    // 加载目标图片
    lazySingle(imageBox) {
        const img = imageBox.querySelector("img");
        const realSrc = img.getAttribute(this.attr);
        img.src = realSrc;
        img.onload = () => {
            img.style.transition = `opacity ${this.speed}ms`;
            img.style.opacity = 1;
            img.removeAttribute(this.attr);
            this.callback.call(this, imageBox);
        };
    }
    observerAll(isRefresh) {
        // 找到所有带lazy-image属性的img元素
        const imgs = this.context.querySelectorAll(`img[${this.attr}]`);
        imgs.forEach(img => {
            // 找到每一个img的父节点
            const imgBox = img.parentNode;
            // 解决快速下拉出现的问题
            if (isRefresh && this.imageBoxesList.includes(imgBox)) return;
            // 监听这个父节点的出现
            this.ob.observe(imgBox);
            this.imageBoxesList.push(imgBox);
        });
        // 删除无效元素
        this.imageBoxesList = this.imageBoxesList.filter(image => image.querySelector("img").getAttribute(this.attr));
    }
    refresh() {
        // 重新监听
        this.observerAll(true);
    }
}
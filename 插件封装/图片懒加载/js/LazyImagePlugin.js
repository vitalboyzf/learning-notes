(function () {
    function LazyImage(options) {
        // init params
        options = options || {};
        let defaults = {
            context: document,
            attr: "lazy-image",
            threshold: 1,
            speed: 300,
            callback: Function.prototype
        };
        // eslint-disable-next-line new-cap
        return new LazyImage.prototype.init(Object.assign(defaults, options));
    }
    LazyImage.prototype = {
        constructor: LazyImage,
        init: function init(config) {
            // 把信息挂在到实例上：在其它方法中，基于实例即可获取这些信息
            this.config = config;
            this.imageBoxList = [];
            // 创建监听器
            this.ob = new IntersectionObserver(changes => {
                changes.forEach(item => {
                    let {
                        isIntersecting,
                        target
                    } = item;
                    // 如果目标出现
                    if (isIntersecting) {
                        // 加载目标图片
                        this.singleHandle(target);
                        // 取消对这张图片的监听
                        this.ob.unobserve(target);
                    }
                });
            }, {
                threshold: [config.threshold]
            });
            // 监听所有延迟加载
            this.observeAll();
        },
        // 单张图片的延迟加载
        singleHandle: function singleHandle(imgBox) {
            let config = this.config,
                // 取出容器中的图片
                imgObj = imgBox.querySelector("img"),
                // 获取真实图片地址
                trueImage = imgObj.getAttribute(config.attr);
            // 加载图片
            imgObj.src = trueImage;
            // 移除图片上的lazy-image属性
            imgObj.removeAttribute(config.attr);
            // 图片加载完成
            imgObj.onload = () => {
                // 设置图片过渡出现
                imgObj.style.transition = `opacity ${config.speed}ms`;
                imgObj.style.opacity = 1;
                // 执行回调函数
                config.callback.call(this, imgObj);
            };
        },
        // 监听需要的DOM元素
        observeAll(refresh) {
            let config = this.config,
                allImages = config.context.querySelectorAll(`img[${config.attr}]`);
            [].forEach.call(allImages, img => {
                // 获取img的容器
                let imageBox = img.parentNode;
                if (refresh && this.imageBoxList.includes(imageBox)) return;
                this.imageBoxList.push(imageBox);
                // 监听这个图片容器
                this.ob.observe(imageBox);
            });
        },
        // 刷新：获取新增的需要延迟加载的图片，做延迟加载
        refresh: function refresh() {
            this.observeAll(true);
        }
    };
    LazyImage.prototype.init.prototype = LazyImage.prototype;
    if (typeof window !== "undefined") {
        window.LazyImage = LazyImage;
    }
}());
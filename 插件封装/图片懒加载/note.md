    图片延迟加载的意义：
        项目中，如果一开始加载页面，就把所有的真实图片也去加载，不论是从网络消耗上，还是从页面渲染上都是非常的消耗性能的，导致加载过慢... 真实开发中，我们一般首次渲染，不去渲染真实的图片，把图片部分用一个默认的盒子占位（有默认的背景图，给用户一种感觉：图片正在加载中）
        把能够出现在当前视口中的图片（它所在的那个占位盒子出现在视口中）做加载

### 单张图片懒加载

* html代码

``` html
  <div class="lazyImageBox">
      <img src="" alt="" lazy-image="images/12.jpg">
  </div>
```

* css代码

``` css
   html,
   body {
       height: 300%;
   }

   .lazyImageBox {
       position: absolute;
       left: 50%;
       top: 1500px;
       transform: translateX(-50%);
       width: 400px;
       height: 300px;
       background: url("./images/default.gif") no-repeat center center #EEE;
   }

   .lazyImageBox img {
       width: 100%;
       height: 100%;
       opacity: 0;
       transition: opacity .3s;
   }
```

* js代码

==方案一==

``` js
//获取盒子
let lazyImageBox = document.querySelector('.lazyImageBox'),
    // 获取img标签
    lazyImage = lazyImageBox.querySelector('img');
const singleLazy = function singleLazy() {
    // 获取真实图片路径
    let trueImg = lazyImage.getAttribute('lazy-image');
    // 加载真实图片
    lazyImage.src = trueImg;
    // 图片加载完成，opacity设置为1，显示出图片
    lazyImage.onload = () => {
        lazyImage.style.opacity = 1;
    };
};
// 使用DOM监听器 IntersectionObserver:监听一个或者多个DOM元素和可视窗口的交叉信息
let ob = new IntersectionObserver(changes => {

    // changes是一个数组，包含所有监听的DOM元素和视口的交叉信息
    let item = changes[0],
        {
            isIntersecting,
            target
        } = item;
    // 出现在视口中了
    if (isIntersecting) {
        // 加载图片
        singleLazy();
        //加载真实图片后，移除对盒子的监听
        ob.unobserve(lazyImageBox);
    }
}, {
    // 1:完全出现在视口中 isIntersecting为true
    // 0:刚出现在视口 isIntersecting就为true
    threshold: [1]
});
// 监听lazyImageBox这个盒子，监听的时候是去重的
ob.observe(lazyImageBox);
```

==方案二==

``` js
       // 节流函数
       function throttle(func, wait = 500) {
           let timer = null,
               previous = 0;
           return function anonymous(...params) {
               let now = new Date(),
                   remaining = wait - (now - previous);
               if (remaining <= 0) {
                   clearTimeout(timer);
                   timer = null;
                   previous = now;
                   func.call(this, ...params);
               } else if (!timer) {
                   timer = setTimeout(() => {
                       clearTimeout(timer);
                       timer = null;
                       previous = new Date();
                       func.call(this, ...params);
                   }, remaining);
               }
           };
       }
       // 获取盒子容器
       let lazyImageBox = document.querySelector('.lazyImageBox'),
           // 获取img图片
           lazyImage = lazyImageBox.querySelector('img');
       // 加载真实图片
       const singleLazy = function singleLazy() {
           let trueImg = lazyImage.getAttribute('lazy-image');
           lazyImage.src = trueImg;
           lazyImage.onload = () => {
               // 真实图片加载成功
               lazyImage.style.opacity = 1;
           };
           // 表示该图片已经被加载过了
           lazyImageBox.isLoad = true;
       };

       const lazyFunc = function lazyFunc() {
           // 防止重复处理
           if (lazyImageBox.isLoad) return;
           // 图片容器底部到视口顶部的距离
           let A = lazyImageBox.getBoundingClientRect().bottom,
               // 视口高度
               B = document.documentElement.clientHeight;
           // 容器完全出现在视口（图片容器底部到视口顶部的距离等于是视口高度）
           if (A <= B) {
               // 加载真实图片
               singleLazy();
           }
       };
       // 一秒钟后看看是否需要加载图片
       setTimeout(lazyFunc, 1000);
       //默认浏览器会在最快的反应时间内，监听到scroll事件的触发，从而执行lazyFunc这个方法，这样导致触发频率太高了 -> 节流处理
       window.onscroll = throttle(lazyFunc);
```

### 多张图片延迟加载插件

``` js
(function() {
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
                console.log(changes.length);
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
```

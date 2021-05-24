/* eslint-disable no-undef */
(function () {
    function Swiper(options, wrap) {
        // 挂载容器 默认在body上
        this.wrap = wrap || $("body");
        // 轮播类型
        this.animateType = options.animateType || "fade";
        // 轮播图宽度
        this.imgWidth = options.imgWidth || $(wrap).width;
        // 轮播图高度
        this.imgHeight = options.imgHeight || $(wrap).height;
        // 是否显示轮播图切换按钮 默认为true
        this.showChangeBtn = options.showChangeBtn !== undefined ? options.showChangeBtn : true,
            // 是否显示切换小点 默认为true    
            this.showSpotBtn = options.showSpotBtn !== undefined ? options.showSpotBtn : true;
        // 图片列表
        this.imgList = options.imgList || [];
        // 自动轮播间隔时间
        this.autoChangeTime = options.autoChangeTime || 1000;
        // 是否自动轮播，默认为true
        this.isAuto = options.isAuto !== undefined ? options.isAuto : true;
        // 下一张图片的索引值
        this.nextIndex = 0;
        // // 判断动画是否结束  true  代表的就是 动画没有执行完
        this.isRun = false;
        this.timer = null;
        // 初始化轮播图  包含功能：  创建轮播图结构  初始化轮播图样式  轮播的功能
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
        };
    }
    //   创建轮播图结构 
    Swiper.prototype.createDom = function () {
        // 创建swiper容器
        var swiperWrapper = $('<div class="my-swiper"></div>');
        // 创建图片容器
        var imgWrapper = $('<ul class="swiper-img-wrapper"></ul>');
        // 创建小点容器
        var spotDiv = $('<div class="swiper-spot"></div>');
        // 遍历图片列表数组
        this.imgList.forEach(function (item) {
            // 创建图片item,添加到图片容器中
            $('<li><img src="' + item + '"></img></li>').appendTo(imgWrapper);
            // 添加小点item到小点容器中
            $("<span></span>").appendTo(spotDiv);
        });
        // 如果转化类型是animate，再将第一张图片追加到最后一个位置，实现无缝轮播
        if (this.animateType === "animate") {
            $('<li><img src="' + this.imgList[0] + '"></img></li>').appendTo(imgWrapper);
        }
        // 将图片容器放入轮播图容器
        swiperWrapper.append(imgWrapper);
        // 如果有两侧改变图片的按钮
        if (this.showChangeBtn) {
            // 添加两个按钮
            swiperWrapper.append($('<div class="swiper-left-btn swiper-btn"></div>'))
                .append($('<div class="swiper-right-btn swiper-btn"></div>'));
        }
        // 如果有小点，将小点容器添加到轮播图容器
        if (this.showSpotBtn) {
            swiperWrapper.append(spotDiv);
        }
        // 将轮播图挂载到wrap上
        $(this.wrap).append(swiperWrapper);

    };
    // 初始化样式
    Swiper.prototype.initStyle = function () {
        $(".my-swiper *", this.wrap).css({
            padding: 0,
            margin: 0,
            listStyle: "none"
        });
        $(this.wrap).find(".my-swiper").css({
            overflow: "hidden",
            position: "relative",
            height: this.imgHeight
        }).find(".swiper-img-wrapper").css({
            overflow: "hidden"
        }).find("img").css({
            width: "100%",
            height: "100%"
        }).end().end().find(".swiper-btn").css({
            width: 25,
            height: 35,
            position: "absolute",
            top: "calc(50% - 17.5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundSize: "100% 80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }).filter(".swiper-left-btn").css({
            backgroundImage: "url(./img/back.png)",
            borderTopRightRadius: "18px 18px",
            borderBottomRightRadius: "18px 18px"
        }).end().filter(".swiper-right-btn").css({
            backgroundImage: "url(./img/next.png)",
            borderTopLeftRadius: "18px 18px",
            borderBottomLeftRadius: "18px 18px",
            right: 0
        });
        $(".my-swiper > .swiper-spot", this.wrap).css({
            position: "absolute",
            bottom: 0,
            width: "100%",
            textAlign: "center"
        }).find("span").css({
            display: "inline-block",
            marginRight: "10px",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.5)"
        }).eq(this.nextIndex).css({
            backgroundColor: "#f00"
        });

        if (this.animateType === "animate") {
            $(".my-swiper >.swiper-img-wrapper", this.wrap).css({
                position: "absolute",
                left: 0,
                width: this.imgWidth * (this.imgList.length + 1),
                height: this.imgHeight
            }).find("li").css({
                float: "left",
                height: this.imgHeight,
                width: this.imgWidth
            });
        } else {
            $(".my-swiper >.swiper-img-wrapper", this.wrap).css({
                width: this.imgWidth,
                height: this.imgHeight,
                position: "relative"
            }).find("li").css({
                position: "absolute",
                height: this.imgHeight,
                width: this.imgWidth,
                display: "none"
            }).eq(this.nextIndex).show();
        }


    };
    // 绑定时事件
    Swiper.prototype.bindEvent = function () {
        // 保存this指针
        var self = this;
        // 点击左侧按钮
        $(".swiper-left-btn", this.wrap).on("click", function () {
            self.change("prev");
        });
        // 点击右侧按钮
        $(".swiper-right-btn", this.wrap).on("click", function () {
            self.change("next");
        });
        // 点击小点
        $(".my-swiper > .swiper-spot > span", this.wrap).on("click", function () {
            // 停止轮播
            self.change($(this).index());
        });
        $(".my-swiper").on("mouseenter", function () {
            clearInterval(self.timer);
        });
        $(".my-swiper").on("mouseleave", function () {
            self.autoChange();
        });
    };
    // 轮播图片切换 核心逻辑 dir可以传入pre,next,目标索引值
    Swiper.prototype.change = function (dir) {
        // 有正在运行的轮播
        if (this.isRun) return;
        switch (dir) {
            // 轮播到上一个图片
            case "prev":
                // 如果下一张图片是第一张图片
                if (this.nextIndex === 0) {
                    // 如果轮播类型是animate
                    if (this.animateType === "animate") {
                        // 图片容器回到到第一张
                        $(".swiper-img-wrapper", this.wrap).css({
                            left: -this.imgWidth * this.imgList.length
                        });
                    }
                    // 当前轮播指针指向最后一张图片
                    this.nextIndex = this.imgList.length - 1;
                } else {
                    // 当前不是第一张图片，直接将当前指针减一
                    this.nextIndex--;
                }
                break;
            case "next":
                // 如果动画类型是animate，当前是最后一张图片
                if (this.animateType === "animate" && this.nextIndex === this.imgList.length) {
                    $(".swiper-img-wrapper", this.wrap).css({
                        left: 0
                    });
                    // 下一个节点是1
                    this.nextIndex = 1;
                } else if (this.animateType === "fade" && this.nextIndex === this.imgList.length - 1) {
                    this.nextIndex = 0;
                } else {
                    this.nextIndex++;
                }
                break;
            default:
                // 是目标索引
                this.nextIndex = dir;
                break;
        }
        // 动画执行
        // 保存this指针
        var self = this;
        // 如果是animate类型
        this.isRun = true;
        if (this.animateType === "animate") {
            // 图片容器移动
            $(".swiper-img-wrapper", this.wrap).animate({
                // 向左移动 
                left: -this.nextIndex * this.imgWidth
            }, function () {
                self.isRun = false;
            });
        } else {
            $(".swiper-img-wrapper > li", this.wrap).fadeOut().eq(this.nextIndex).fadeIn(function () {
                clearInterval(self.timer);
                if (self.isAuto) {
                    self.autoChange();
                }
                self.isRun = false;
            });
        }

        $(".my-swiper > .swiper-spot > span", this.wrap).each(function (index) {
            //  判断当前显示的图片是不是第一张图片   
            if (index === self.nextIndex % self.imgList.length) {
                $(this).css({
                    backgroundColor: "#f00"
                });
            } else {
                $(this).css({
                    backgroundColor: "rgba(255, 255, 255, 0.5)"
                });
            }
        });
    };
    // 自动轮播
    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.change("next");
        }, this.autoChangeTime);
    };

    // prototype 在原型链上扩展方法
    $.fn.extend({
        // options接收的轮播图的数据
        swiper: function (options) {
            var obj = new Swiper(options, this);
            obj.init();
            // 保留jquery链式调用的特点
            return this;
        }
    });
}());
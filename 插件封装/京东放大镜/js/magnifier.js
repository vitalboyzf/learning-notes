/* eslint-disable no-undef */
class Magnifier {
    constructor({
        root = document.body,
        src,
        width = 200,
        height = 200,
        scale = 2,
        gap = 10
    }) {
        this.root = root;
        this.src = src;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.gap = gap;
        this.createDom();
        this.$magnifier = $(".magnifier");
        this.$abbre = $(".abbre");
        this.$mark = $(".mark");
        this.$detail = $(".detail");
        this.$detailImg = $(".detailImg");
        this.init();
    }
    init() {
        const detailW = this.width * this.scale;
        const detailH = this.height * this.scale;
        const markWH = this.width / this.scale;
        const abbreW = this.width;
        const abbreH = this.height;
        this.computedUtil = {
            detailW,
            detailH,
            markWH,
            abbreW,
            abbreH,
            abbreOffset: this.$abbre.offset(),
            detailImgW: detailW / (markWH / abbreW),
            detailImgH: detailH / (markWH / abbreH)
        };
        $(".detailImg").css({
            width: this.computedUtil.detailImgW,
            height: this.computedUtil.detailImgH
        });
        this.listenEvent();
    }
    createDom() {
        `dom结构：<section class="magnifier">
        <div class="abbre">
            <img src="images/2.jpg" alt="">
            <!-- mark遮罩层 -->
            <div class="mark"></div>
        </div>
        <!-- 详情图 -->
        <div class="detail">
            <img class="detailImg" src="images/2.jpg" alt="">
        </div>
        </section>`;
        const section = document.createElement("section");
        section.className = "magnifier";
        section.style.width = this.width + this.width * this.scale + this.gap + "px";
        const abbre = document.createElement("div");
        abbre.className = "abbre";
        abbre.style.width = this.width + "px";
        abbre.style.height = this.height + "px";

        const imgS = document.createElement("img");
        const imgB = document.createElement("img");
        imgS.src = imgB.src = this.src;
        imgB.className = "detailImg";
        const mark = document.createElement("div");
        mark.className = "mark";
        mark.style.height = mark.style.width = this.width / this.scale + "px";
        const detail = document.createElement("div");
        detail.className = "detail";
        detail.style.width = this.width * this.scale + "px";
        detail.style.height = this.height * this.scale + "px";
        detail.style.marginLeft = this.gap + "px";
        // 插入
        section.appendChild(abbre);
        section.appendChild(detail);
        abbre.appendChild(imgS);
        abbre.appendChild(mark);
        detail.appendChild(imgB);
        // 将dom模板结构插入到真实dom中
        this.root.appendChild(section);
    }
    // 计算mark/大图的移动位置
    computed(ev) {
        let curL = ev.pageX - this.computedUtil.abbreOffset.left - this.computedUtil.markWH / 2;
        let curT = ev.pageY - this.computedUtil.abbreOffset.top - this.computedUtil.markWH / 2;
        // 边界处理
        let minL = 0,
            minT = 0,
            maxL = this.computedUtil.abbreW - this.computedUtil.markWH,
            maxT = this.computedUtil.abbreH - this.computedUtil.markWH;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        this.$mark.css({
            left: curL,
            top: curT
        });
        // mark在abbre中移动的比例等于detailImg在detail中移动的比例，
        // 并且方向相反
        // detailImgLeft/detailImgW=-curL/abbreW
        // detailImgTop/detailImgH=-curT/abbreH
        this.$detailImg.css({
            left: -curL / this.$abbre.width() * this.computedUtil.detailImgW,
            top: -curT / this.$abbre.height() * this.computedUtil.detailImgH
        });
    }
    listenEvent() {
        // 事件处理函数
        this.$abbre.mouseenter((ev) => {
            this.$mark.css("display", "block");
            this.$detail.css("display", "block");
            this.computed(ev);
        }).mousemove((ev) => {
            this.computed(ev);
        }).mouseleave((ev) => {
            this.$mark.css("display", "none");
            this.$detail.css("display", "none");
        });
    }
}
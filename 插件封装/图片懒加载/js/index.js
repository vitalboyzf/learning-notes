let waterfallModule = (function () {
    // 获取需要操作的DOM元素
    let container = document.querySelector(".container"),
        columns = container.querySelectorAll(".column"),
        loadMore = document.querySelector(".loadMore"),
        observe = null;
    columns = Array.from(columns);

    // 基于AJAX从服务器端获取数据
    const queryData = () => {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open("GET", "data.json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        });
    };

    // 页面中的数据绑定
    const bindHTML = data => {
        // 等比例根据真实宽度修改高度
        data = data.map(item => {
            let realW = 230,
                originW = item.width,
                originH = item.height,
                realH = realW / (originW / originH);
            item.width = realW;
            item.height = realH;
            return item;
        });
        for (let i = 0; i < data.length; i += 3) {
            // 取出三个分一组
            let group = data.slice(i, i + 3);
            // 每一组根据高度从小到大排序
            group.sort((a, b) => a.height - b.height);
            // 三个columns容器根据高度从大到小排序
            columns.sort((a, b) => b.offsetHeight - a.offsetHeight);
            // 循环组中每一项
            group.forEach((item, index) => {
                // 生成dom结构
                // <div class="card">
                // 	<a href="#">
                // 		<div class="lazyImageBox" style="height: 180px;">
                // 			<img src="" alt="" lazy-image="images/1.jpg">
                // 		</div>
                // 		<p>泰勒·斯威夫特（Taylor Swift），1989年12月13日出生于美国宾州，美国歌手、演员。2006年出道，同年发行专辑《泰勒·斯威夫特》，该专辑获得美国唱片业协会的白金唱片认证</p>
                // 	</a>
                // </div> 
                let card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<a href="${item.link}">
                    <div class="lazyImageBox" style="height: ${item.height}px;">
                        <img src="" alt="" lazy-image="${item.pic}">
                    </div>
                    <p>${item.title}</p>
                </a>`;
                // 插入到每一个容器中
                columns[index].appendChild(card);
            });
        }
    };

    // 加载更多数据
    const loadMoreFunc = () => {
        // 创建监听器
        let options = {
            threshold: [0]
        };
        let ob = new IntersectionObserver(async changes => {
            let item = changes[0];
            // 标签出现
            if (item.isIntersecting) {
                // 加载更多数据
                let data = await queryData();
                // 将新加载的数据加载到页面
                bindHTML(data);
                // 刷新
                observe.refresh();
            }
        }, options);
        // 监听loadMore标签的出现
        ob.observe(loadMore);
    };
    return {
        async init() {
            let data = await queryData();
            bindHTML(data);
            // eslint-disable-next-line new-cap
            observe = window.LazyImage({
                threshold: 0.5
            });
            loadMoreFunc();
        }
    };
}());
waterfallModule.init();
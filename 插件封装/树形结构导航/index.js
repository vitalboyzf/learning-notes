class TreeStructureCollapseMenu {
    constructor({
        container = document.body,
        dataUrl
    }) {
        this.container = container;
        this.getDate(dataUrl);
        this.handler();
    }
    getDate(url) {
        fetch(url).then(response => response.json()).then(data => {
            this.binding(data);
        });
    }
    binding(data) {
        const ul = document.createElement("ul");
        let n = 1;
        const html = (data) => {
            let str = ``;
            data.forEach(item => {
                let {
                    children,
                    open,
                    name
                } = item;
                str += `<li class="level level${n++}">
                        <a href="#" class="ztree-title">${name}</a>
                       ${children && children.length > 0 ?
                         `<em class="ztree-icon ${open ? "open" : ""} "></em>` : ""}
                         <ul  style="display:${open ? " block" : "none"}" >
                                 ${html(children)}
                        </ul >
                        </li >`;
            });
            n--;
            return str;
        };
        ul.innerHTML = html(data);
        this.container.appendChild(ul);
    }
    handler() {
        this.container.addEventListener("click", (e) => {
            const target = e.target;
            if (target.tagName === "EM") {
                let ulBox = target.nextElementSibling;
                const isOpen = target.classList.contains("open");
                if (isOpen) {
                    // 当前打开状态,让其隐藏
                    target.classList.remove("open");
                    ulBox.style.display = "none";
                } else {
                    target.classList.add("open");
                    ulBox.style.display = "block";
                }
            }
        });
    }
}
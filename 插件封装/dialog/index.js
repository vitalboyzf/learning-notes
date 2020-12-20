const Dialog = (function () {
    return class Dialog {
        constructor(options) {
            this.dialog = document.createElement("div");
            this.handlers = [];
            this.assignOption = Object.assign({
                id: document.body,
                content: "提示信息",
                cancelText: "确定",
                confirmText: "取消",
                cancel() { },
                confirm() { }
            }, options);
            this.createDom(this.assignOption);
            this.hide();
        }

        createDom({ id, cancelText, confirmText, content }) {
            this.dialog.className = "container";
            this.dialog.style.transition = ".3s";
            this.dialog.innerHTML = `
           <i class="close">&times;</i>
           <div class="dialog-content">
               ${content}
           </div>
           <div class="footer">
               <button class="btn btn-confirm">${confirmText}</button>
               <button class="btn btn-cancel">${cancelText}</button>
           </div>`;
            id.appendChild(this.dialog);
            // 监听事件
            this.dialog.addEventListener("click", e => {
                if (e.target.tagName === "I" && e.target.classList.contains("close")) {
                    // 右上角X
                    this.hide();
                } else if (e.target.tagName === "BUTTON" && e.target.classList.contains("btn-cancel")) {
                    // 确定
                    // this.defaultOptions.confirm();
                    this.assignOption.confirm();
                    return null;
                } else if (e.target.tagName === "BUTTON" && e.target.classList.contains("btn-confirm")) {
                    // 取消
                    this.hide();
                    this.assignOption.cancel();
                }
            });
        }
        show() {
            if (this.dialog) {
                this.dialog.style.opacity = 1;
                this.dialog.style.transform = "translateY(0px)";
                return this;
            }
        }
        hide() {
            if (this.dialog) {
                this.dialog.style.opacity = 0;
                this.dialog.style.transform = "translateY(-100px)";
                return this;
            }
        }
        // 订阅事件
        on(type, fn) {
            if (this.handlers[type] === undefined) {
                this.handlers[type] = [];
            }
            let typeArr = this.handlers[type];
            if (typeArr.includes(fn)) return;
            typeArr.push(fn);
            return this;
        }
        // 取消事件
        off(type, fn) {
            const typeArr = this.handlers[type];
            if (typeArr instanceof Array) {
                // 删除事件数据中的这个fn
                typeArr.forEach((item, i) => {
                    if (item === fn) {
                        typeArr.splice(i, 1);
                    }
                });
            }
        }
        // 执行事件
        emit(type, args) {
            let typeArr = this.handlers[type];
            if (typeArr instanceof Array) {
                typeArr.forEach(fn => {
                    fn(args);
                });
            }
        }
    };
}());
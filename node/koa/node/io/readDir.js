const path = require("path");
const fs = require("fs");
class File {
    constructor(href, name, ext, isFile, size, createTime, updateTime) {
        this.href = href;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
        // this.children = children;
    }
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const href = filename;
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = stat.mtime;
        return new File(href, name, ext, isFile, size, createTime, updateTime);
    }
    static async getContent(isBuffer = false) {
        if (isBuffer) {
            return fs.promises.readFile(this.filename);
        } else {
            return fs.promises.readFile(this.filename, "utf8");
        }
    }
    async getChildren() {
        if (this.isFile) {
            return [];
        }
        let children = await fs.promises.readdir(this.href);
        children = children.map(cld => {
            return File.getFile(path.join(this.href, cld));
        });
        return await Promise.all(children);
    }
}
async function test() {
    const file = await File.getFile(path.resolve(__dirname, "./"));
    const children = await file.getChildren();
    console.log(children);
}
test();
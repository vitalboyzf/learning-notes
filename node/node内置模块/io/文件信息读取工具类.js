const fs = require("fs");
const path = require("path");

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime).toLocaleTimeString();
        const updateTimer = new Date(stat.mtime).toLocaleTimeString();
        return new File(filename, name, ext, isFile, size, createTime, updateTimer);
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename, "utf-8");
            }
        }
        return null;
    }

    async getChildren() {
        if (this.isFile) {
            return [];
        }
        // 是目录，读取当前文件夹中的文件
        const children = await fs.promises.readdir(this.filename);
        // 获取当前文件夹下的每一个文件的信息
        const childrenArr = children.map(name => {
            // 拼接路径
            const result = path.resolve(this.filename, name);
            return File.getFile(result);
        });
        return Promise.all(childrenArr);
    }

    static async readDir(dirname) {
        const file = await File.getFile(dirname);
        const result = await file.getChildren();
        console.log(result);
        for (const r of result) {
            // 如果子文件是文件夹，递归读取
            if (!r.isFile) {
                await this.readDir(r.filename);
            }
        }
    }
}


(async function () {
    const filename = (path.resolve(__dirname, "./test"));
    // const content = await file.getContent(false);
    // console.log(content);
    // console.log(await file.getChildren());
    await File.readDir(filename);
    // console.log(result);
    // console.log(await result[0].getChildren());
}());
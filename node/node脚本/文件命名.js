const path = require("path");
const cluster = require("cluster");
console.log(cluster);
const fs = require("fs");
const resolve = (...paths) => path.resolve(__dirname, ...paths);

class RenameFile {
    constructor(dir) {
        this.dir = dir;
        this.squIdx = 1;
        this.files = fs.readdirSync(resolve(dir));
    }
    delete(deleteRule) {
        for (let i = 0; i < this.files.length; i++) {
            const originPath = resolve(this.dir, this.files[i]);
            fs.renameSync(originPath,
                resolve(this.dir, this.files[i].replace(deleteRule, "")));
        }
    }
    add(addStart, targetStr) {
        for (let i = 0; i < this.files.length; i++) {
            const originPath = resolve(this.dir, this.files[i]);
            const targetPathArr = this.files[i].split("");
            targetPathArr.splice(addStart, 0, targetStr);
            const targetPath = resolve(this.dir, targetPathArr.join(""));
            fs.renameSync(originPath, targetPath);
        }
    }
    rename(newName) {
        for (let i = 0; i < this.files.length; i++) {
            const originPath = resolve(this.dir, this.files[i]);
            const seqIdx = this.squIdx++ + ".";
            fs.renameSync(originPath,
                resolve(this.dir, seqIdx + newName));
        }
    }
}
// const util = new RenameFile("D:\\bilibili课程\\开课吧20期");
const util = new RenameFile("D:\\bilibili课程\\CodeWhy react");
util.delete(/_P\w*_/g);
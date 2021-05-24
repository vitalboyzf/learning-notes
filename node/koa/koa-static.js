const path = require("path");
const fs = require("fs");
const mime = require("mime");
async function getFilename(urlPath, root) {
    const filename = path.join(root, urlPath);
    try {
        const stat = await fs.promises.stat(filename);
        // 是文件夹 如果加上index.html可以找到，返回加上index.html的结果
        if (stat.isDirectory()) {
            const newUrlPath = path.join(urlPath, "index.html");
            return getFilename(newUrlPath, root);
        } else {
            // 是文件,返回这个文件路径
            return filename;
        }
    } catch (error) {
        // 找不到文件，返回null
        return null;
    }
}
module.exports = function (root) {
    return async (ctx, next) => {
        const result = await getFilename(ctx.request.path, root);
        const filename = await result && fs.createReadStream(result);
        if (!filename) {
            await next();
            return;
        }
        ctx.body = fs.createReadStream(result);
        ctx.type = mime.getType(filename);
        await next();
    };
};
const { constants } = require("buffer");
const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "text.txt");
const ws = fs.createWriteStream(filename);
let i = 0;
function write() {
    let flag = true;
    while (i < 1024 * 1024 && flag) {
        flag = ws.write("z");
        i++;
    }
    if (i === 1024 * 1024) {
        ws.close();
    }
    i++;
}
write();
ws.on("drain", () => {
    write();
});

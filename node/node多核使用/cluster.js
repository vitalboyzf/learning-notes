const cluster = require("cluster");
const os = require("os");

const cpuNums = os.cpus().length;
const process = require("process");
const workers = {};
if (cluster.isMaster) {
    for (let i = 0; i < cpuNums; i++) {
        const worker = cluster.fork();
        console.log("init pid", worker.process.pid);
        workers[worker.process.pid] = worker;
    }
    cluster.on("exit", (worker, code, signal) => {
        const oldPid = worker.process.pid;
        console.log("工作进程 %d 关闭重启中", worker.process.pid);
        delete workers[worker.process.pid];
        worker = cluster.fork();
        workers[worker.process.pid] = worker;
        console.log("重启成功 pid :", oldPid + "=>" + worker.process.pid);
    });
} else {
    const app = require("./app");
    app.listen(3000);
}
process.on("SIGTERM", () => {
    for (const pid in workers) {
        process.kill(workers[pid]);
    }
    process.exit();
});
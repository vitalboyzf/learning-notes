# os const os = require("os");
### 常见操作API
- 获取CPU架构：`os.arch()` x64
- 获取换行符号：`os.EOL` windows:\r\n ios:\n
- 获取cup信息：`os.cups()`
- 获取系统内存剩余：`os.freemem` console.log((os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + "G");
- 获取用户信息：`os.userInfo()`
- 获取临时缓存目录：`os.tmpdir()`
- 获取主机名：`os.hostname()`
- 获取操作系统类型：`os.type()` Windows_NT
- 获取操作系统平台：`os.platform()` win32
- 返回一个数组，其中存放了1分钟、5分钟及15分钟的系统平均负载：`os.loadavg` 
- 系统的总内存量，单位为字节：`os.totalmem()`
- 返回一个数组，其中存放了系统中的所有网络接口：`os.networkInterfaces()`
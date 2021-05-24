const mysql = require("mysql2/promise");
const connection = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "school",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function test() {
    const [result] = await connection.execute(`select * from student`);
    console.log(result);
}

test();
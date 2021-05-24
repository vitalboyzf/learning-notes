### 显示所有数据库 show dbs
### 使用数据库 use db
### 向集合中添加文档
### db.collection.insertOne({文档内容})
### db.collection.insertMany([多个文档])
 - 如果新的文档没有指定id字段，则会自动添加一个id作为主键
 - 自动添加的id是一个Object对象，该对象是通过调用ObjectId()函数创建的
### 查询文档
- db.collection.find(查询对象)
### 修改文档
- db.collection.updateOne(<filter>,<update>)
-  db.collection.updateMany(<filter>,<update>)
-   db.collection.replaceOne(<filter>,<update>)
### 删除文档
db.collection.deleteOne(查询对象)
db.collection.deleteMany(查询对象)
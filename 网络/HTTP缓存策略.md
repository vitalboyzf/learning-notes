# 浏览器的缓存策略
    浏览器每次发起请求时，先查看本地缓存中是否有查找结果以及缓存标识，如果缓存有效，则直接使用本地缓存，否则，向服务器发起请求，并携带缓存标识。
    根据是否发起HTTP请求，将缓存标识分为两部分：强缓存和协商缓存，强缓存优先于协商缓存
- ==强缓存==，服务器给客户端一个缓存时间，客户端每次请求资源时都会看是否过期，如果在这个时间内没过期的多次请求，直接使用缓存，不在这个时间内则执行协商缓存策略
    + `expires`:服务器响应消息头字段，告诉浏览器在过期时间之前可以从浏览器缓存中获取数据，由于是绝对时间，用户可能将客户端本地时间修改导致浏览器缓存失效，时间是由服务器发送的，如果服务器时间和客户端时间存在不一致，也会出现问题。
    + `cache-control`：常见的设置是max-age public private no-cache no-store
        1. max-age:最大有效时间（秒）
        2. public:客户端代理服务器都可以进行缓存（DNS)
        3. private:只有客户端才能缓存，代理服务器不可以缓存（默认值）
        4. no-cache:不使用强缓存，直接协商缓存
        5. no-store:强缓存和协商缓存都不使用
    + cache-control优先级高于expires，为了兼容HTTP/1.0一般两个字段都要设置
- ==协商缓存==，请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。
如果资源没更改，返回304，浏览器读取本地缓存。
如果资源有更改，返回200，返回最新的资源。
    + `etag`：每个文件有一个，就是这个文件的标识，如果这个文件改变了，etag也会改变。
    + `last-modified`：文件的最后修改时间，精确到秒
    + etag是HTTP1.1出现的，解决了last-modified只能精确的秒的缺点，优先级也比last-modified高
    + 每次请求返回来的响应头中的 etag和 last-modified，在下次请求时在 request header 就把这两个带上，服务端把你带过来的标识进行对比，然后判断资源是否更改了，如果更改就直接返回新的资源，并返回新的etag、last-modified。如果资源没有变，那就不变etag、last-modified，这时候对客户端来说，每次请求都是要进行协商缓存了
## 协商缓存
- 当浏览器的强缓存失效后或者请求头设置了不走强缓存，并且在请求头中设置了If-Modified-Since或者If-None-Match的时候，会将这两个属性和服务器进行验证，是否命中协商缓存，如果命中协商缓存，会返回304状态，并且在响应头会设置Last-Modified或者ETag字段
- 协商缓存有两组字段：`Last-Modified`/`If-Modified-Since`(http/1.0)和
                    `ETag`/`If-None-Match`(http/1.1)
### Last-Modified/If-Modified-Since(http/1.0)
- 服务器通过Last-Modified字段告知客户端，资源最后一次被修改的时间，泪如Last-Modified:Mon, 10 Nov 2018 08:10:22 GMT
- 浏览器将这个值和内容一起记录到缓存数据库中
- 下一次请求相同资源时，浏览器从缓存中找出“不确定是否过期的缓存”，将上次响应头中的Last-Modified时间写入请求头的If-Modified-Since字段
- 服务器会将If-Modified-Since值与Last-Modified字段对比，如果相等，响应304，反之，响应200以及新的数据
### ETag/If-None-Match(http/1.1)
- ETag是文件的特殊标识，流程和Last-Modified一致，只是吧If-Modified-Since变成了If-None-Match


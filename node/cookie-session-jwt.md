## cookie和session和jwt原理解析
### 简介
- 由于http协议是无状态的协议，为了保存用户登录状态和区分用户，一般使用cookie、session、jwt进行身份认证
- cookie是在http-header中的（不宜过大，减少传输数据量）
- 可以通过浏览器添加cookie，服务端也可以设置cookie, 每次请求都会携带cookie （每次请求都携带，浪费流量） 合理设置 
- cookie 默认不能跨域 （两个完全不同的域名  父子域名（可以设置子域能拿到父域中的数据）， cookie存在前端里
- session在服务器里的，默认浏览器是拿不到的，session可以存放数据原则上没有上线，而且安全，基于cookie的  session默认都是存在内存中的（如果服务器宕掉了，session就丢失了）
- jwt这种方案，服务根据用户提供的信息生成一个令牌。每次带带上令牌和你的信息，用你的信息再次生成令牌做对比 （里面不能存放隐私） 
### cookie
#### 特点
- 只支持存储字符串类型的value
- 一般单个Cookie保存的数据不能超过4K
- 客户端计算机暂时或永久保存的信息
- 浏览器每次请求服务器，会默认携带当前域名下的cookie，放在http的请求头中，由于每次请求都携带，应合理设置，减少流量浪费
- 由于是存储在浏览器中，可能被人篡改，可以加入签名验证提高安全性
- 在浏览器中是以字符串形式保存的使用`;`进行分隔，js通过document.cookie进行获取，同时可以添加一些options
- xsrf攻击就是利用了浏览器请求自动携带cookie这个特征进行攻击的
#### options
- name 表示cookie的名字，一个域名下的cookie名不能相同，相同会被覆盖
- value 表示cookie的值
- domain cookie绑定的域名，如果没有设置，就会自动绑定到执行语句的当前域，可以设置这个属性为父域名实现不同子域的读写
- path 指定路径，如果设置为 /abc，则只有 /abc 下的路由可以访问到该 cookie，如：/abc/read。默认为`/`通常不设置，如果设置了局限性很大
- secure 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。
- expires/max-age存活时间
- httpOnly 如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全
#### 在node原生中设置cookie
```js
 res.setHeader('Set-Cookie', ['name=zf', 'age=12; domain=.zf.cn; httpOnly=true']);
```
#### 在koa中使用cookie
##### 实现cookie中间件
```js
// 删除=，将+转化为-，将/转化为_
const toBase64URL = (str) => {
    return str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//, "_");
};
app.use(async (ctx, next) => {
    // 保存要发送的cookie
    const cookies = [];
    ctx.myCke = {
        // 设置cookie的方法，key:cookie名   value:cookie名 options:其他配置例如httpOnly/domain/max-age等
        set(key, value, options = {}) {
            // 其他配置的数组
            let optsArr = [];
            // 如果设置了domain就添加上这个配置
            if (options.domain) {
                optsArr.push(`domain=${options.domain}`);
            }
            if (options.httpOnly) {
                optsArr.push(`httpOnly=${options.httpOnly}`);
            }
            if (options.maxAge) {
                optsArr.push(`max-age=${options.maxAge}`);
            }
            // 配置了加密签名
            if (options.signed) { 
                // base64 在传输的时候 会 把 + / = 做特殊处理
                  const salt = [key, value].join("=");
                let sign = toBase64URL(crypto.createHmac("sha1", secret).update(salt).digest("base64"));
                cookies.push(`${key}.sign=${sign}`);
            }
            // 将cookie的配置放入cookies
            cookies.push(`${key}=${value}; ${optsArr.join("; ")}`);
            console.log(cookies);
            // 设置响应头，返回cookie
            ctx.res.setHeader("Set-Cookie", cookies);
        },
        get(key, options) {
            // 获取浏览器传过来的cookie,并解析为对象格式
            let cookieObj = querystring.parse(ctx.req.headers["cookie"], "; "); // a=1; b=2 {a:1,b:2}
            // 如果需要验证签名
            if (options.signed) {
                // 将cookie中携带的签名和真实签名进行对比，如果相同，校验成功，返回对应的cookie
                if (cookieObj[`${key}.sign`] === toBase64URL(crypto.createHmac("sha1", secret).update(`${key}=${cookieObj[key]}`).digest("base64"))) {
                    return cookieObj[key];
                } else {
                    return "error";
                }
            }
            return cookieObj[key] || "";
        }
    };
    return next();
});
```

##### 使用自带的cookies属性
```js
const secret = "secret";
router.get("/write", async function (ctx) {
    ctx.cookies.set("name", "zf", {
        httpOnly: true
    });
    ctx.cookies.set("age", "12", {
        signed: true
    });
    ctx.body = "write ok";
});
router.get("/read", async function (ctx) {
    ctx.body = ctx.cookies.get("age", {
        signed: true
    }) || "empty"; // name=zf; age=12
});
```
### session
#### 特点
- 存储类型丰富，存储数据量比cookie大很多
- 保存在服务器中，比较安全
- 因为是存储在服务器中，但是当访问量过多，会占用过多的服务器资源，影响服务器性能
- 基于cookie，通过cookie携带sessionId
- session默认是储存在内容中，如果服务器重启，session就丢失了
#### 原理
```js
let cardName = "zf"; // 店铺名字
let session = {}; // session就是一个服务器记账的本子，为了稍后能通过这个本找到具体信息
// 获取sessionId
 let hasVisit = ctx.cookies.get(cardName,{signed:true});
 // 必须保证你的卡是我的店的
    if(hasVisit && session[hasVisit]){ 
        session[hasVisit].mny -= 100;
        ctx.body = '恭喜你消费了 ' + session[hasVisit].mny
    }else{
        const id = uuid.v4(); //冲500
        session[id] = {mny:500};
        ctx.cookies.set(cardName,id,{signed:true});
        ctx.body = '恭喜你已经是本店会员了 有500元'
    }
```
#### 使用koa-session
```js
let cardName = "zf";
router.get("/wash", async function(ctx) {
    let hasVisit = ctx.session[cardName];
    if (hasVisit) {
        ctx.session[cardName].mny -= 100;
        ctx.body = "恭喜你消费了 " + ctx.session[cardName].mny;
    } else {
        ctx.session[cardName] = { mny: 500 };
        ctx.body = "恭喜你已经是本店会员了 有500元";
    }
});
```
#### 只要关闭浏览器 ，session 真的就消失了？
- 不对。对 session 来说，除非程序通知服务器删除一个 session，否则服务器会一直保留，程序一般都是在用户做 log off 的时候发个指令去删除 session。然而浏览器从来不会主动在关闭之前通知服务器它将要关闭，因此服务器根本不会有机会知道浏览器已经关闭
- 之所以会有这种错觉，是大部分 session 机制都使用会话 cookie 来保存 session id，而关闭浏览器后这个 session id 就消失了，再次连接服务器时也就无法找到原来的 session。
- 如果服务器设置的 cookie 被保存在硬盘上，或者使用某种手段改写浏览器发出的 HTTP 请求头，把原来的 session id 发送给服务器，则再次打开浏览器仍然能够打开原来的 session。
- 恰恰是由于关闭浏览器不会导致 session 被删除，迫使服务器为 session 设置了一个失效时间，当距离客户端上一次使用 session 的时间超过这个失效时间时，服务器就认为客户端已经停止了活动，才会把 session 删除以节省存储空间。
### jwt 
#### jwt的组成
JWT 的三个部分依次如下。
- Header（头部）
    + Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。
    ```js
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```
    + 上面代码中，alg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT。
    + 最后，将上面的 JSON 对象使用 Base64URL转成字符串。
- Payload（负载）
    + Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。
    + iss (issuer)：签发人
    + exp (expiration time)：过期时间
    + sub (subject)：主题
    + aud (audience)：受众
    + nbf (Not Before)：生效时间
    + iat (Issued At)：签发时间
    + jti (JWT ID)：编号
- Signature（签名）
    + Signature 部分是对前两部分的签名，防止数据篡改。
- 也就是：Header.Payload.Signature
- Base64URL
JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。
#### 特点
- 服务端无状态化、可扩展性好
- 浏览器默认不会携带token，需要每次请求放到请求头中（Authorization），不是每次请求都需要携带，可减小传输数据
- 可以避开浏览器的同源策略，更容易跨域携带身份凭证
- 基于token的认证，是服务端无状态，用计算token的时间换取服务端的存储空间
- 支持移动端设备
- 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
- 不加密的情况下，不能将秘密数据写入JWT。
- JWT不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
- JWT的最大缺点是，由于服务器不保存session状态，因此无法在使用过程中废止某个token，或者更改token的权限。也就是说，一旦JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
- JWT本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
- 为了减少盗用，JWT不应该使用HTTP协议明码传输，要使用HTTPS协议传输。
![](./assets/jwt.png)
#### 实现jwt原理
```js
const secret = "zf"; // 通过openssl 生成一个1k大的秘钥
const jwt = {
    // 加密，通过crypto模块进行加密，返回base64并对base64中的 = + / 进行处理
    sign(content, secret) {
        return this.toBase64URL(crypto.createHmac("sha256", secret).update(content).digest("base64"));
    },
    // 处理base64中的字符串的 = + /
    toBase64URL: (str) => {
        return str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//, "_");
    },
    // 解密固定写法
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join("=");
        return str.replace(/-/g, "+").replace(/_/g, "/");
    },
    // 将内容转化为base64
    toBase64(content) {
        return this.toBase64URL(Buffer.from(JSON.stringify(content)).toString("base64"));
    },
    // 根据内容和秘钥，返回token令牌
    encode(info, secret) {
        // head是固定的对象转化为JSON进行加密
        const head = this.toBase64({
            typ: "JWT",
            alg: "HS256"
        });
        // content是对传入内容进行base64转化
        const content = this.toBase64(info);
        // sign是对head和content进行加密
        const sign = this.sign([head, ".", content].join(""), secret);
        return head + "." + content + "." + sign;
    },
    // 解密操作
    decode(token, secret) {
        // 获取token字符串的三个部分
        let [head, content, sign] = token.split(".");
        // 将token的head和content重新加密，和sign进行对比，如果一样，证明没有被篡改
        let newSign = this.sign([head, content].join("."), secret);
        if (newSign === sign) {
            // 将内容解密返回
            return JSON.parse(Buffer.from(this.base64urlUnescape(content), "base64").toString());
        } else {
            throw new Error("用户更改了信息");
        }
    }
};
```
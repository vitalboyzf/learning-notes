[toc]
# fetch
- 参考：阮一峰博客http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
### 简介
- fetch()是XMLHttpRequest的升级版，用于在JavaScript脚本里面发出HTTP请求。
### 用法
- fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。
    1. fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
    2. fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest的API设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
    3. fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
- 基本语法
    ```js
    fetch("https://www.baidu.com")
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log('Request Failed', err)); 
    ```
    - 第一个then中拿到的response是一个Stream流对象，response.json()是一个异步操作，取出所有内容，并将其转为JSON对象。
#### response对象
- 同步属性（直接从服务器拿到的属性）
    + `Response.ok`：返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
    + `Response.status`：返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
    + `Response.statusText`：返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
    + `Response.url`：返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
    + `Response.type`：可能有以下值
        1. basic：普通请求，即同源请求。
        2. cors：跨域请求。
        3. error：网络错误，主要用于 Service Worker。
        4. opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求。
        5. opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分。 
    + `Response.redirected`：返回一个布尔值，表示请求是否发生过跳转。
#### 判断请求是否成功
- fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况认为请求成功。
- 这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。
- 只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。
#### Response.headers 属性
- Headers 对象可以使用for...of循环进行遍历
- Headers 对象提供了以下方法，用来操作标头。
    + Headers.get()：根据指定的键名，返回键值。
    + Headers.has()： 返回一个布尔值，表示是否包含某个标头。
    + Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
    + Headers.append()：添加标头。
    + Headers.delete()：删除标头。
    + Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
    + Headers.values()：返回一个遍历器，可以依次遍历所有键值。
    + Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
    + Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
#### 读取内容的方法
- `Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
    + response.text()：得到文本字符串。
    + response.json()：得到 JSON 对象。
    + response.blob()：得到二进制 Blob 对象。
    + response.formData()：得到 FormData 表单对象。
    + response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
- 上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
####  Response.clone()
- Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。
- response.text()，就把 Stream 读完了。后面再调用response.json()，就没有内容可读了，所以报错。
Response.clone()，可以创建Response对象的副本，实现多次读取。
#### Response.body 
- response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作，它可以用来分块读取内容，应用之一就是显示下载的进度。
```js
const response = await fetch('flower.jpg');
const reader = response.body.getReader();
while(true) {
  const {done, value} = await reader.read();
  if (done) {
    break;
  }
  console.log(`Received ${value.length} bytes`)
```
- 上面示例中，response.body.getReader()方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块。这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。
### fetch请求参数
- 的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。
#### POST 请求
```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```
#### 提交 JSON 数据
```js
const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```
- 上面示例中，标头Content-Type要设成'application/json;charset=utf-8'。因为默认发送的是纯文本，Content-Type的默认值是'text/plain;charset=UTF-8'。
#### 提交表单
```js
const form = document.querySelector('form');
const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```
#### 文件上传
```js
const input = document.querySelector('input[type="file"]');
const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```
- 上传二进制文件时，不用修改标头的Content-Type，浏览器会自动设置。
#### 直接上传二进制数据
```js
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```
### fetch()配置对象的完整 API
```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```
- `cache`属性指定如何处理缓存。可能的取值如下
    + default：默认值，先在缓存里面寻找匹配的请求。
    + no-store：直接请求远程服务器，并且不更新缓存。
    + reload：直接请求远程服务器，并且更新缓存。
    + no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
    + force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
    + only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
- `mode`属性指定请求的模式。可能的取值如下：
    + cors：默认值，允许跨域请求。
    + same-origin：只允许同源请求。
    + no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
- `credentials`属性指定是否发送 Cookie。可能的取值如下：
    + same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送。
    + include：不管同源请求，还是跨域请求，一律发送 Cookie。
    + omit：一律不发送。
- `referrerPolicy`属性用于设定Referer标头的规则。可能的取值如下：
    + no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
    + no-referrer：不发送Referer标头。
    + origin：Referer标头只包含域名，不包含完整的路径。
    + origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
    + same-origin：跨域请求不发送Referer，同源请求发送。
    + strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
    + strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
    + unsafe-url：不管什么情况，总是发送Referer标头。
### 取消fetch()请求
- fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象。
```js
let controller = new AbortController();
let signal = controller.signal;
fetch(url, {
  signal: controller.signal
});
signal.addEventListener('abort',
  () => console.log('abort!')
);
controller.abort(); // 取消
console.log(signal.aborted); // true
```
- 上面示例中，首先新建 AbortController 实例，然后发送fetch()请求，配置对象的signal属性必须指定接收 AbortController 实例发送的信号controller.signal。
- controller.abort()方法用于发出取消信号。这时会触发abort事件，这个事件可以监听，也可以通过controller.signal.aborted属性判断取消信号是否已经发出。下面是一个1秒后自动取消请求的例子。
```js
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);
try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```
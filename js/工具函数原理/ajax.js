   // 简单请求的ajax封装
        /**
         * 
         * 
         */
         function ajax(options) {
            let method = options.method;
            let url = options.url;
            let data = options.data;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                 if (xhr.readyState === 4) {
                     if (xhr.status === 200) {
                        options.success(JSON.parse(xhr.responseText));
                     } else {
                         throw new Error(xhr.statusText);
                     }
                 }
            };
            if (method === "GET") {
                xhr.open(method, url + "?" + data, true);
                xhr.send();
            } else {
                xhr.open(method,url,true);
                // 在数据传递过程中，编码格式为key=value
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send(data);
            }
        }
         ajax({
             method:"GET",
             url:"https://open.duyiedu.com/api/student/findAll",
             data:"appkey=zf_yyy_1569734712113",
             success(data) {
                 console.log(data);
             }
         });

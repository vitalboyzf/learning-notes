     // 封装jsonp
     let $ = {
         ajax(option) {
             let url = option.url;
             let dataType = option.dataType;
             let targetProtocol = "";
             let targetHost = "";
             if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
                 let u = new URL(url);
                 targetHost = u.host;
                 targetProtocol = u.protocol;
             } else {
                 targetHost = location.host;
                 targetProtocol = location.protocol;
             }
             if (dataType === "jsonp") {
                 if (location.host === targetHost && location.protocol === targetProtocol) {
                     //  同源不处理
                 } else {
                     let callback = "cb" + Math.floor(Math.random() * 10000000);
                     let script = document.createElement("script");
                     if (url.indexOf("?") > 0) {
                         script.src = url + "&callback=" + callback;
                     } else {
                         script.src = url + "?callback=" + callback;
                     }
                     window[callback] = option.success;
                     //  script.id = callback;
                     document.head.appendChild(script);
                 }
             }
         }
     };
     $.ajax({
         url: "https://developer.duyiedu.com/edu/testJsonp",
         type: "get",
         dataType: "jsonp",
         success(data) {
             console.log(data);
         }
     });
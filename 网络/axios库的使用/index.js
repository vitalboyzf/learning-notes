/* eslint-disable no-undef */

axios.defaults.baseURL = "http://49.232.250.47:2021/";

const send = document.querySelector(".send");
const cancel = document.querySelector(".cancel");
const source = axios.CancelToken.source();
send.onclick = function () {
    axios.get("/label", {
        cancelToken: source.token,
        params: {
            offset: 0,
            limit: 4
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        if (axios.isCancel(err)) {
            console.log(err.message);
            return;
        }
        console.dir(err);
    });
};
cancel.onclick = function () {
    source.cancel("取消请求");
};
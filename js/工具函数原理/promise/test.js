const pro = Promise.resolve("ok");
pro.then(res => {
    return "haha";
}).finally(_ => {

}).then(res => {
    console.log(res);
});
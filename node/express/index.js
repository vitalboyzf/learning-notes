const express = require('express');
const qs = require('querystring');
const url = require('url');
const app = new express();
const path = require('path');
app.listen(2558, () => {
    console.log("start...");
})
const staticPath = path.resolve(__dirname, './public');

app.use(express.static(staticPath, {
    index: "index.html",
}));
app.use(express.urlencoded({extends: true}));


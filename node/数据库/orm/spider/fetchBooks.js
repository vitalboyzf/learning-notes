const axios = require("axios").default;
const Book = require("../modules/Book");
const cheerio = require("cheerio");

async function getBooksHtml() {
    const resp = await axios.get("https://book.douban.com/latest");
    return resp.data;
}

async function getBookLinks() {
    const html = await getBooksHtml();
    const $ = cheerio.load(html);
    const anchorElement = $("#content .grid-12-12 li a");
    return anchorElement.map((i, ele) => {
        const href = ele.attribs["href"];
        return href;
    }).get();
}

async function getBookDetail(DetailUrl) {
    const html = await axios.get(DetailUrl);
    const $ = cheerio.load(html.data);
    const name = $("h1 span").text().trim();
    const imageUrl = $(".nbg img").attr("src");
    const spans = $("#info span.pl");
    const authorSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("作者");
    });
    const author = authorSpan.next("a").text().trim();
    const publicSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("出版年");
    });
    const publishDate = publicSpan[0].nextSibling.nodeValue.trim();
    return {
        name,
        imageUrl,
        author,
        publishDate
    };
}

async function fetchAll() {
    const links = await getBookLinks();
    const prom = links.map(link => {
        return getBookDetail(link);
    });
    return Promise.all(prom);
}

async function saveToDB() {
    const books = await fetchAll();
    Book.bulkCreate(books);
    console.log("保存成功");
}

saveToDB();

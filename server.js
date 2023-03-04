const express = require("express");
const app = express();
const port = 8088;
// {module}{2} 引入/router/books.js 程式
const booksRouter = require("./router/books");
const aboutRouter = require("./router/about");


// 路由設定 / API設計
app.get("/", (req, res) => {
    res.send("hello world!");
});
// {module}{3} 將/books的requests，導入到booksRouter處理
app.use("/books", booksRouter);
app.use("/about", aboutRouter);



app.listen(port, () => {
    console.log(`server is running at localhost:${port}`);
});


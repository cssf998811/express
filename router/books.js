// 建立router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("我是/books的跟路徑");
});

router.get("/page", (req, res) => {
    res.json({ message: "我是/books/page 的跟路徑" });
});

// {module}{1} 將router導出，等著別人request引入使用
module.exports = router;
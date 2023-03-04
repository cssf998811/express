const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("我是/about的router");
});

//  /about/hello?name=Banny
router.get("/hello", (req, res) => {
    let name = req.query.name;
    res.send(`我是/about/name ，您好${name}`);
});

module.exports = router;
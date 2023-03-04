// 建立router
const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/", (req, res) => {
    res.send("我是/books的跟路徑");
});

router.get("/page", (req, res) => {
    res.json({ message: "我是/books/page 的跟路徑" });
});

// 檔案系統I/O ==> 非同步的動作(asynchronous)
router.get("/data", (req, res) => {
    fs.readFile("data.json", "utf-8", (err, data) => { //err -> 錯誤資料
        if (err) {
            console.log(err);
            res.send("檔案有問題!!!");
        } else {
            console.log(data);
            console.log(typeof data); // 檢查資料型別


            let result = JSON.parse(data); // 轉成JSON(Object)資料型別
            console.log(result)
            console.log(typeof result);


            // res.send(data); //回傳前端String資料
            res.send(result); //回傳前端JSON資料
        }
    });
});

// 錯誤示範 會得到 神秘的undefine
// router.get("/data-2", (req, res) => {
//     let data2 = fs.readFile("data.json", "utf-8", () => { });
//     console.log(data2);
//     res.send(data2);
// });


let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf-8", (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
};

router.get("/multi-data-promise", (req, res) => {
    let result = {};
    readFilePromise("./models/data1.json")
        .then(data => {
            result["data1"] = data
            return readFilePromise("./models/data2.json")
        })
        .then(data => {
            result["data2"] = data
            return readFilePromise("./models/data3.json")
        })
        .then(data => {
            result["data3"] = data
            return readFilePromise("./models/data4.json")
        })
        .then(data => {
            result["data4"] = data
            return readFilePromise("./models/data5.json")
        })
        .then(data => {
            result["data5"] = data
            result["message"] = "我是用promise取得的"
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/multi-data-async", async (req, res) => {
    try {
        let result = {};
        let data1 = await readFilePromise("./models/data1.json");
        let data2 = await readFilePromise("./models/data2.json");
        let data3 = await readFilePromise("./models/data3.json");
        let data4 = await readFilePromise("./models/data4.json");
        let data5 = await readFilePromise("./models/data5.json");
        result['data1'] = data1;
        result['data2'] = data2;
        result['data3'] = data3;
        result['data4'] = data4;
        result['data5'] = data5;
        result['message'] = "我是用async/await取得的";

        res.json(result);
    } catch (err) {
        console.log(err);
    }
});


// {module}{1} 將router導出，等著別人request引入使用
module.exports = router;
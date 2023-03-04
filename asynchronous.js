// 非同步處理機制
const fs = require("fs");

// 1.使用readFileSync
let d1 = fs.readFileSync("./models/data1.json", "utf-8");
console.log("d1完成");
let d2 = fs.readFileSync("./models/data2.json", "utf-8");
console.log("d2完成");
let d3 = fs.readFileSync("./models/data3.json", "utf-8");
console.log("d3完成");

console.log(JSON.parse(d1));
console.log(JSON.parse(d2));
console.log(JSON.parse(d3));

// ----------------------------------------------------------------------

// 2.使用Promise
// step1.宣告promise
let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};
// step2.使用promise
// 使用Promise讀檔案
let output = {};
readFilePromise("./models/data1.json")
    .then(data1 => {
        output["data1"] = data1
        return readFilePromise("./models/data2.json")
    })
    .then(data2 => {
        output["data2"] = data2
        return readFilePromise("./models/data3.json")
    })
    .then(data3 => {
        output["data3"] = data3
        console.log(output);
    })
    .catch(err => {
        console.log("我是.catch區!!!");
        console.log(err);
    });

// ----------------------------------------------------------------------

// 3.使用asymc/await  (ECMAScipt 2016~2017， ES7寫法)
// 定義flipCoin function
let flipCoin = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve("上課囉!!!");
            } else {
                reject("翹課去zzz");
            }
        }, 500);
    });
};

// 使用async / await
let main = async () => {
    // 使用try-catch做錯誤處理
    try {
        let r = await flipCoin(); // 轉成"同步"語言執行 -> 執行完才會往下
        // 沒加await -> 還是"非同步"，console.log(r) will return pending
        // let r = flipCoin(); // 
        console.log("async / await完成");
        console.log(r);
    } catch (err) {
        console.log(err);
    };
};

main();

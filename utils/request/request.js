const rp = require("request-promise");
const fs = require("fs");

//lastest cookie
const lastestCookie = require("../config/latest_cookie");
const urlGenerator = require("../config/url_generator");
const buffCsData = require("../data_manager/manager");



const myRequest = {

    /*--临时储存空间---*/
    package : {},

    getResponseList: async (url) => {
        const options = {
            url: url,
            gzip: true,
            headers: {
                "Accept": "*/*",
                "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                "Accept-Encoding" : "gzip, deflate, br",
                "Connection": "keep-alive",
                "Cookie" : lastestCookie,
                "Referer": "https://news.qq.com/zt2020/page/feiyan.htm",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
            }
        };

        let getDataBody = new Promise((resolve, reject) => {

            rp(options,function (err, res, body) {
                if(err){
                    reject(err);
                }
                let reponseData = JSON.parse(body).data;
                resolve(reponseData);
            });
        })

        return getDataBody;
    },

    requestLoopBy : async (urlName, time) =>{

        time = time || 800;

        const setLoop = function () {

            let handle = setInterval(() => {
                let requestUrl  =  urlGenerator[urlName]();
                console.log("requestUrl",requestUrl);

                myRequest.getResponseList(requestUrl).then(data => {

                    /*--储存原始数据功能--*/
                    buffCsData.sendLatestMsg(data).catch(err => {
                        console.error(err);
                    });

                }).catch(err => {
                    console.error("request failed!",err);
                });

            },time);

            myRequest.package.loopHandle = handle;
        };

        setLoop();
    },

    stopRequestLoop : async () => {

        let handle = myRequest.package.loopHandle;
        clearInterval(handle);
    },


}


module.exports = myRequest;
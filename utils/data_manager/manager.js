const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const util = require("util");

const urlGenerator = require("../config/url_generator");

const nodemailer = require('nodemailer');


const originDataPath = path.resolve(__dirname, "../../database/buff/origin_data.json");
const subscribersPath = path.resolve(__dirname, "../../database/buff/subscribers.json");

const dataManager = {

    saveOriginData : async (originData) => {
        await fsPromises.writeFile(originDataPath, originData, {encoding: 'utf8'});
        console.log("原始数据存储成功!");
    },

    sendLatestMsg: async (originData) => {
        let oldMsg = await dataManager.getLatestMsg();
        await dataManager.saveOriginData(originData);

        let latest = await dataManager.getLatestMsg();
        if(oldMsg.title === latest.title){
            console.log("无最新消息!");
            return ;
        }
        let subscribers = await dataManager.getSubscribers();
        for(let user of subscribers){
            await dataManager.sendMsgTo(user, latest);
        }
    },

    sendMailManual : async (count, users) =>{

    },

    replaceEscapeCharacter : (data) => {
        let reg = /\\/g;
        let newData = data.replace(reg,"");
        newData = newData.replace(/n{1}/g,"");
        return newData;
    },

    getLatestMsg : async() =>{
        let data = await fsPromises.readFile(originDataPath, {encoding:"utf-8"});
        let latest = JSON.parse(data).pop();
        console.log("latest-------",latest);
        return latest;
    },

    getSubscribers : async () =>{
        let data = await fsPromises.readFile(subscribersPath, {encoding:"utf-8"});
        let users = JSON.parse(data);
        return users;
    },

    sendMsgTo : async (user, msg) => {
        let transporter = nodemailer.createTransport({
            service: 'QQ', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // SSL安全链接
            auth: {   //发送者的账户密码
                user: 'kehanlove@foxmail.com', //账户
                pass: 'gscfpfmotofkbeaa', //smtp授权码，到邮箱设置下获取
            }
        });

        //发送邮件
        transporter.sendMail({
            from: '"kehanlove@foxmail.com"', // 发送者昵称和地址
            to: user.email, // 接收者的邮箱地址
            subject: msg.title, // 邮件主题
            // text: , // 存文本类型的邮件正文
            html: "<div><div style='color: #222222;font-weight: 500;font-size: 20px;'>"+msg.title+"</div>\n" +
                "        <div style='color:#737373;'>"+msg.desc+"</div>\n" +
                "        <div>来源："+msg.source+"</div></div><div>"+msg.time+"</div></div>" // html类型的邮件正文
        }, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('邮件发送成功 ID：', info.messageId);
        });
    },


}


module.exports = dataManager;



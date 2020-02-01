const fsPromises = require('fs').promises;

const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const creeperRequest = require("../utils/request/request");
const buffDataManager = require("../utils/data_manager/manager");

module.exports = {
    index : async (ctx,next) => {
        ctx.url = './home.html';
    },

    actPost : async(ctx) => {

        const msg = {
            status : 0,
            message : ''
        };

        try{
            // await creeperRequest.requestLoopBy('major',1800000);
            await creeperRequest.requestLoopBy('major',900000);
        }catch (err) {
            msg.message = "程序启动失败!";
            console.error(msg.message,err);
            ctx.body = msg;
            return;
        }

        msg.status = 1;
        msg.message = "程序启动成功!";

        ctx.body = msg;
    },

    stopPost : async (ctx) => {
        const msg = {
            status : 1,
            message : '程序关闭成功'
        };

        try{
            await creeperRequest.stopRequestLoop()
        }catch(err) {
            msg.status = 0;
            msg.message = "程序关闭失败!";
            console.error(msg.message,err);
            ctx.body = msg;
            return;
        }

        console.log(msg.message);

        ctx.body = msg;

    },

    sendMail : async (ctx) =>{
        const msg = {
            status : 1,
            message : '程序启动成功'
        };
        try{
            await buffDataManager.sendMailManual();
        }catch (e) {
            msg.status = 0;
            msg.message = "程序关闭失败!";
            console.error(msg.message,err);
            ctx.body = msg;
            return;
        }

        ctx.body = msg;
    }

};
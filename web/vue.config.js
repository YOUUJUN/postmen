// const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
// const util = require('util');
// const events = require('events');

// module.exports = new events();

// const buildPageConfig = async () => {
//
//     let pages = {};
//     let pagesPath = path.join(__dirname,"/src/pages");
//
//     let files = await fsPromises.readdir(pagesPath);
//
//     for(let file of files){
//         let filePath = path.join(pagesPath,file);
//         let page = {};
//         await fsPromises.stat(filePath).then(
//             stats => {
//                 if (stats.isDirectory()) {
//                     let entry = path.posix.join("src/pages", file,file.concat('.js'));
//                     page.entry = entry;
//                     page.template = path.posix.join("src/pages", file,file.concat('.html'));
//                     page.filename = file.concat('.html');
//                     pages[file] = page;
//                 }
//             }
//         )
//
//     }
//
//     await new Promise((resolve, reject) => {
//         let obj = {
//             publicPath : '/',
//             outputDir : './../vue-dist',
//             pages : pages
//         };
//         module.exports.emit('trigger',obj);
//     });
//
// };


// buildPageConfig();

const buildPageSync = () => {
    let pages = {};
    let pagesPath = path.join(__dirname,"/src/pages");

    let files = fs.readdirSync(pagesPath);

    for(let file of files){
        let filePath = path.join(pagesPath,file);
        let page = {};
        let stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            let entry = path.posix.join("src/pages", file,file.concat('.js'));
            page.entry = entry;
            page.template = path.posix.join("src/pages", file,file.concat('.html'));
            page.filename = file.concat('.html');
            pages[file] = page;
        }

    }

    return pages;
};

let obj = {
    publicPath : '/',
    outputDir : './../vue-dist',
    pages : buildPageSync()
};


module.exports = obj;






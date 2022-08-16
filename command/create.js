"user strict";

const path = require("path");
const co = require("co");
const prompt = require("co-prompt");
const fs = require("fs-extra");
const { exec } = require("child_process");
const templateConfig = require("./templateConfig");

/**
 * 复制本地模板项目
 */
function copyTemplate(projectPath, templateName, callback) {
    // 模板文件夹路径
    console.log("templateName",templateName)
    const templatePath = path.resolve(__dirname, `../template/${templateName}`);

    console.log("\n start copy");;

    fs.copy(templatePath, projectPath, function(error) {
        handleError(error);

        console.log("\n √ copy completed");

        callback()
    })
}

/**
 * 错误处理
 */
function handleError(error) {
    if (!error) return false;
    console.log(error);
    process.exit();
}

/**
 * 拉取远程git项目
 */
// function cloneRemote(projectPath, templateName, callback) {
//     co(function* () {
//         const config = templateConfig[templateName];

//         // const username = yield prompt("git username: ");
//         // let password = yield prompt.password("git password: ");

//         const url = config.url;
//         const branch = config.branch;

//         // const cmdStr = `git clone -b ${branch} http://${username}:${password}@${url} ${projectPath}`
//         const cmdStr = `git clone -b ${branch} ${url} ${projectPath}`

//         console.log("\n start clone...");

//         exec(cmdStr, error => {
//             handleError(error);
            
//             console.log("\n clone completed");

//             callback();
//         })
//     })
// }

module.exports = (projectName, cmd) => {

    co(function* () {
        let templateName = yield prompt("template name [v2e (default), wxApp]: ");
        if (!templateName) templateName = "v2e";

        if (!templateConfig[templateName]) {
            console.log("\n template does not exit, the options are [pc, mobile");
            process.exit()
        }

        const projectPath = path.resolve(process.cwd(), projectName);

        fs.emptyDir(projectPath, function(error) {
            handleError(error);

            console.log("\n √ clear dir");

            const fn = function () {
                // console.log("\n remove git config..")
                // exec(`rm -r -Force ${projectName}/.git`, error => {
                //     handleError(error);
                //     console.log("\n removed.")

                    console.log(`\n cd ${projectName} && npm install`);
                    process.exit()
                // })
            };

            // cloneRemote(projectPath, templateName, fn)
            copyTemplate(projectPath, templateName, fn)
        })
    })
}
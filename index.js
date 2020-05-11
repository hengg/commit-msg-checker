#!/usr/bin/env node
const fs = require('fs');
const exec = require('child_process').exec;
// const args = process.argv.splice(2);

exec('git rev-parse --show-toplevel', function (error, stdout, stderr) {
    if (error) {
        console.error(`执行错误，获取项目路径错误: ${error}`);
        return;
    }
    const absPath = stdout.trim();
    fs.stat(`${absPath}/.git/hooks/`, function (err) {
        if (err) {
            console.error(err);
            console.error('请确认当前项目是否通过git管理源代码');
        } else {
            const commitMsg = fs.readFileSync(
                `${absPath}/node_modules/commit-msg-checker/commit-msg.js`
            );
            fs.writeFile(`${absPath}/.git/hooks/commit-msg`, commitMsg, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    fs.chmod(`${absPath}/.git/hooks/commit-msg`, 0o775, function (err) {
                        if (err) console.error(err);

                        console.log('已为项目添加对commit msg的检查');
                        console.log('Happy Hacking!');
                    });
                }
            });
        }
    });
});

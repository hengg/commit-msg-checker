#!/usr/bin/env node
const fs = require('fs');
const exec = require('child_process').exec;
const args = process.argv.splice(2);

if (args.length === 1) {
    switch (args[0]) {
        case '-h':
            printHelp();
            break;
        case 'cancel':
            cancelChecker();
            break;
        case 'cx':
            exec('git rev-parse --show-toplevel', function (error, stdout, stderr) {
                if (error) {
                    console.error(`执行错误，获取项目路径错误: ${error}`);
                    return;
                }
                const absPath = stdout.trim();
    
                fs.chmod(`${absPath}/.git/hooks/commit-msg.js`, 0o775, function (err) {
                    if (err) console.error(err);
                })
            });
            break;
        default:
            break;
    }
    return;
} else if(args.length>1){
    console.error('命令错误;');
    printHelp(); 
    return;
}

function printHelp() {
    console.log('帮助 -h:');
    console.log('\tnpx checker-init: 增加检查；');
    console.log('\tnpx checker-init cancel: 取消检查；');
    console.log('\tnpx checker-init cx: 权限不足时使用此命令提升；');
}

function cancelChecker() {
    exec('git rev-parse --show-toplevel', function (error, stdout, stderr) {
        if (error) {
            console.error(`执行错误，获取项目路径错误: ${error}`);
            return;
        }
        const absPath = stdout.trim();
        const commitHookPath = `${absPath}/.git/hooks/`;
        fs.stat(commitHookPath, function (err) {
            if (err) {
                console.error(err);
                console.error('请确认当前项目是否通过git管理源代码');
            } else {
                fs.unlink(`${commitHookPath}/commit-msg.js`, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('已取消检查');
                    }
                });
            }
        });
    })
}

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

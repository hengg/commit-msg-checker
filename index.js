#!/usr/bin/env node
var fs = require("fs");

var args = process.argv.splice(2);
if (args[0] === "del") {
  fs.access(".git/hooks/commit-msg", function(err) {
    if (err) {
      console.error("该项目似乎没有使用commit-msg-checker");
    } else {
      var commitMsg = fs.readFileSync(".git/hooks/commit-msg");
      fs.writeFileSync(".git/hooks/commit-msg.bak", commitMsg);
      fs.unlink(".git/hooks/commit-msg", function(err) {
        if (err) console.error(err);
        console.log("已为项目删除对commit msg的检查🦢");
      });
    }
  });
} else {
  fs.stat(".git/hooks/", function(err) {
    if (err) {
      console.error(err);
      console.error("请确认当前项目是否通过git管理源代码");
    } else {
      var commitMsg = fs.readFileSync(
        "./node_modules/commit-msg-checker/commit-msg.js"
      );
      fs.writeFile(".git/hooks/commit-msg", commitMsg, function(err) {
        if (err) {
          console.err(err);
        } else {
          console.log("已为项目添加对commit msg的检查");
          console.log("Happy Hacking!");
        }
      });
    }
  });
}

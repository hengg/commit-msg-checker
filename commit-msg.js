#!/usr/bin/env node
"use strict";

var fs = require("fs");

var REG = /^((feat|fix|style|docs|refactor|test|chore)(\(|:)(\w*))(\s*)(.*)$/;

var validateMessage = function(message) {
  var match = REG.exec(message);
  if (!match) {
    console.error(`提交信息：${message} 不符合规范`);
    console.error("如下规则请参考");
    console.error("feat:新功能");
    console.error("fix:修复缺陷");
    console.error("style:格式化代码");
    console.error("docs:修改文档");
    console.error("refactor:重构");
    console.error("test:增加测试");
    console.error("chore:构建过程或辅助工具的变动");
    return false;
  }
  return true;
};

var msgFromBuffer = function(buffer) {
  return buffer
    .toString()
    .split("\n")
    .shift();
};

var commitMsgFile = process.argv[2];

fs.readFile(commitMsgFile, function(_err, buffer) {
  var msg = msgFromBuffer(buffer);
  if (!validateMessage(msg)) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

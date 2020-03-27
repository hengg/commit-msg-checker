#!/usr/bin/env node
"use strict";

const fs = require("fs");

const packageInfo = require("../../package.json");
const config = packageInfo.msgChecker || {};
const isCheck = config.check || true;
if (!isCheck) process.exit(1);

const REG = config.reg||/^((feat|fix|style|docs|refactor|test|chore)(\([\S\s]+\))*:(\w{1,}))(\s*)(.*)$/;
const color = (str, color) => process.stdout.isTTY ? `\x1B[${color}m${str}\x1B[0m` : str;

const validateMessage = (message) => {
  const match = REG.exec(message);
  if (match) return true;

  console.error(`${color(`提交注释：${message} 不符合规范。请按如下规则提交:`, '31')}\n
    feat:新功能
    fix:修复缺陷
    style:格式化代码
    docs:修改文档
    refactor:重构
    test:增加测试
    chore:构建过程或辅助工具的变动
  `);
  return false;
};

const msgFromBuffer = (buffer) => {
  return buffer
    .toString()
    .split("\n")
    .shift();
};

const commitMsgFile = process.argv[2];

fs.readFile(commitMsgFile, (_err, buffer) => {
  const msg = msgFromBuffer(buffer);
  if (!validateMessage(msg)) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

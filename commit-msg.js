#!/usr/bin/env node
"use strict";
var fs = require("fs");

var REG = /^((feat|fix|chore)(\w*))(\s*)(.*)$/;

var validateMessage = function(message) {
  var match = REG.exec(message);
  if (!match) {
    console.error(`提交信息：${message} 不符合规范`);
    return false;
  }
  return true;
};

var firstLineFromBuffer = function(buffer) {
  return buffer
    .toString()
    .split("\n")
    .shift();
};

exports.validateMessage = validateMessage;

var commitMsgFile = process.argv[2];
var incorrectLogFile = commitMsgFile.replace(
  "COMMIT_EDITMSG",
  "logs/incorrect-commit-msgs"
);

fs.readFile(commitMsgFile, function(err, buffer) {
  var msg = firstLineFromBuffer(buffer);

  if (!validateMessage(msg)) {
    fs.appendFile(incorrectLogFile, msg + "\n", function() {
      process.exit(1);
    });
  } else {
    process.exit(0);
  }
});

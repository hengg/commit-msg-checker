# commit-msg-checker
校验git commit message 是否符合规范，需要Node 8 及以上版本

默认的commit message规范为<type>(<scope>):<subject>
说明如下
- type代表commit类型
    ```bash
    feat：新功能
    fix：修复缺陷
    docs：文档
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动
    ci:CI工具相关变动
    build:构建
    perf:优化相关的变动
    ```
- scope为可选项，说明本次commit的变更范围
- subject为本次变更的描述

例如`docs(README):update changelog`和`fix:fix issue-3`都是符合规范的commit message

## 安装
```bash
npm i commit-msg-checker -D
```
## 使用
在工程根目录下执行`checker-init`即可为项目添加检查

也可以在package.json中添加自定义配置
```json
//package.json
{
    ...
    "msgChecker":{
        "reg": "/\s/", // 配置此项可以自定义用于校验的正则表达式
        "check":true // 可以通过将此项设置为false以关闭检查器
    }
    ...
}
```
## TODO
- ✅自定义校验规则
- 更多自定义配置
- 单测覆盖

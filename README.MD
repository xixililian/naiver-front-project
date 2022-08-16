a command tool to create front project with basic files and codes, generate new files with basic codes for project.

命令行工具，可以创建前端项目的基础文件和代码，也可以为已有项目创建拥有基础代码的新文件。

it is not a Widely applicable tool, because it based on my provately experence. but, it probably just useful for you.

它不是一个广泛适用的工具，因为它只是根据我的个人的项目经验而写得。不过，也许它刚好对你有用。


userage
===

创建项目
---

    npm install -global naiver-front-project
    naiver create <projectName>


会在当前目录创建一个项目，根据选择的类型会创建：

- v2e: vue2 + elementUI 的项目
- wxApp: 微信 minapp + sass 的项目

创建的项目都包含了基本的结构和基础代码：

- 已搭建好的项目开发与构建的环境与配置
- 模块化的项目结构
- 全局状态管理机制与基础代码
- 路由、导航的机制与基础代码
- 基础的登录、注册、欢迎、主页与通用的视频播放、下载等页面
- 自动维护微信登录状态的功能
- ajax的可配置的封装函数
- 一些实用的函数、方法、与类


创建文件
---

    待完善
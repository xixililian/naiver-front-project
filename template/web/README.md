# 资源目录说明

目录说明：

- src:

  各项目的开发资源，详细说明见后文。

- dist:

  webpack构建后，生成部署文件的文件夹

## src 目录下的资源目录说明

+ cms: 案件管理系统
+ mcms: (移动端) 案件管理系统
+ www: 宣传网站
+ mwww: (移动端) 宣传网站

## 各项目内的资源目录说明

- _public

  项目各板块抽取出的公共模块，包括界面的头部、底部、全局组件、全局脚本、全局样式等。在构建时，这些资源被统一注入到了各模块中或被各模块按需加载了进去

- pages

  项目的各模块（视图页面）的开发资源。在本项目的 webpack.config.js 文件中，有各模块的注释说明

## 构建脚本

各项目的构建脚本定义在 package.json 文件中，命名与 src 中的项目目录名保持一致，如 "npm run cms" 命令会案件管理系统项目的开发环境。命名带-bld后缀表示构建命令，如 "npm run cms-bld" 命令会构建案件管理系统项目，构建的目标文件夹为 dist (与 dist 平级)
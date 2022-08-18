# learning notes 学习笔记

## vite 的 `npm init vue@latest` 命令的执行原理

+ [浅析npx和npm之间的关系与区别、npx主要特点、使用npx主要解决什么问题、npm init与npx区别](https://www.cnblogs.com/goloving/p/12895446.html)

> 在npm@6版本中，增加了一个新命令npm init <pkg>，这两个命令是等价的：

```
npm init react-app myapp
npx create-react-app myapp
```

> `npm init <pkg>` 对于 create 开头的脚手架制定了一个特殊命令，例如create-react-app、create-esm。npm init 下载时会默认对安装的pkg包添加create前缀，同时像npx一样不会全局安装，只是运行一次，后面会删除。

**知道这个就能看懂 vite 的 `npm init vue@latest` 命令了**

---
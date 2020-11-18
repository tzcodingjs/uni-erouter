# uni-erouter
## 介绍
一款优化uni-app项目多人协作的工具
- 通过项目pages.json自动生成可配置文件
- 监听文件修改并实时更新pages.json文件
- 各个页面通过各自目录下对应的page.json自行配置，防止团队协作时pages.json文件频繁产生冲突。

## 目前支持的配置项有
1) globalStyle
2) pages
3) easycom
4) tabBar
5) condition
---

## 安装
```npm

npm install uni-erouter --save

```

## 快速开始
### 初始化
```npm 

uni-erouter init

```

### 监听文件改变
```npm

uni-erouter watch

```

### 快速启动工具
```npm
uni-erouter start
```

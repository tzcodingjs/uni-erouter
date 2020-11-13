const fs = require('fs');
const path = require('path');
const Progress = require('progress');


class Init {
  constructor() {
    this.pagesData = {}
    this.configs = ['easycom', 'globalStyle', 'condition', 'tabBar']
  }
  start() {
    console.log('创建目录')
    this.createDir()
    this.createFiles()
    console.log('目录初始化完成')
  }

  // 创建目录
  createDir() {
    const dirs = [
      path.join(path.resolve(), 'pagesConfig')
    ]
    dirs.map(item => {
      if (!fs.existsSync(item)) {
        console.log('创建目录', item)
        fs.mkdirSync(item);
      }
    })
  }

  // 创建pages配置文件
  createFiles() {
    const pagesJsonFilePath = path.join(path.resolve(), 'pages.json');
    if (fs.existsSync(pagesJsonFilePath)) {
      const dataStr = fs.readFileSync(pagesJsonFilePath, 'utf-8');
      this.pagesData = JSON.parse(dataStr)
    }
    this.createCommon()
    this.createPages()
  }
  // 通用pages配置项提取
  createCommon() {
    this.configs.map(item => {
      let itemPath = path.join(path.resolve(), 'pagesConfig', `${item}.json`);
      let jsonData = {}
      if (!fs.existsSync(itemPath)) {
        if (this.pagesData[item]) {
          jsonData[item] = this.pagesData[item];
        }
        fs.writeFileSync(itemPath, JSON.stringify(jsonData));
        console.log(`创建${item}文件`);
      }
    })
  }
  // 创建页面配置
  createPages() {

  }

}

module.exports = new Init()
const fs = require('fs');
const path = require('path');
const render = require('./render');
class Watch{
  constructor(){
    // 待监听文件
    this.watchFile = [
      path.join(path.resolve(), "pagesConfig"),
      path.join(path.resolve(), "pages"),
    ]
    // 待监听文件名
    this.watchFileName = "easycom.json,page.json,condition.json,globalStyle.json,tabBar.json";
  }
  change(){

  }
}

module.exports = new Watch()
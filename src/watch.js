const fs = require('fs');
const path = require('path');
const render = require('./render');
class Watch {
  constructor() {
    this.timer = null
    // 需要监听的文件
    this.watchFile = [
      path.join(path.resolve(), "pagesConfig"),
      path.join(path.resolve(), "pages"),
    ]
    // 需要监听的文件名
    this.watchFileName = "easycom.json,page.json,condition.json,globalStyle.json,tabBar.json";
  }
  change() {
    console.log('监听文件改动中...')
    const pagesJsonFilePath = path.join(path.resolve(), "pages.json");
    this.watchFile.map(itemPath => {
      ((_path) => {
        fs.watch(
          _path,
          { recursive: true },
          (eventType, filename) => {
            const filePath = path.join(_path, filename)
            const fileName = path.basename(filename)
            // 是否需要被监听
            if (this.watchFileName.indexOf(fileName) > -1) {
              if (this.timer) clearTimeout(this.timer)
              this.timer = setTimeout(() => {
                render.start()
              }, 500)
            }
          }
        )
      })(itemPath)
    })
  }
}

module.exports = new Watch()
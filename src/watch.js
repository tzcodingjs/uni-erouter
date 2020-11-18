const fs = require('fs');
const path = require('path');
const Render = require('./render');

class Watch {
  constructor() {
    this.timer = null
    // 需要监听的文件
    this.watchFiles = [
      path.join(path.resolve(), "pagesConfig"),
      path.join(path.resolve(), "pages")
    ]
    // 需要监听的文件名
    this.watchFileName = "easycom.json,page.json,condition.json,globalStyle.json,tabBar.json";
  }
  change() {
    console.log('监听文件改动中...')
    const pagesJsonFilePath = path.join(path.resolve(), "pages.json");
    const render = Render.init(this.watchFiles, this.watchFileName)
    this.watchFiles.map(itemPath => {
      ((_filePath) => {
        fs.watch(
          _filePath,
          { recursive: true },
          (eventType, filename) => {
            const filePath = path.join(_filePath, filename)
            const fileName = path.basename(filename)
            // 是否需要被监听
            if (this.watchFileName.indexOf(fileName) > -1) {
              if (this.timer) clearTimeout(this.timer)
              this.timer = setTimeout(() => {
                render.start()
                console.log('监听文件改动中...')
              }, 500)
            }
          }
        )
      })(itemPath)
    })
  }
}

module.exports = new Watch()
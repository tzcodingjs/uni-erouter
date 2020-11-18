const fs = require('fs');
const path = require('path');
class Render {
  constructor(watchFiles, watchFileName) {
    this.watchFiles = watchFiles;
    this.watchFileName = watchFileName;
    this.pagesJsonFilePath = path.join(path.resolve(), "pages.json");
  }

  static init(watchFiles, watchFileName) {
    return new this(watchFiles, watchFileName);
  }

  start() {
    let pagesData = {};
    try {
      let files = [];
      this.watchFiles.forEach((item) => {
        files = files.concat(this.filesArray(item));
      });
      files.forEach(item => {
        try {
          let dataStr = fs.readFileSync(item, 'utf-8');
          if (dataStr !== '') {
            let data = JSON.parse(dataStr)
            for (let key in data) {
              if (pagesData[key]) {
                if (data[key] instanceof Array) {
                  for (let i = 0; i < data[key].length; i++) {
                    let item = data[key][i];
                    let isSame = false;
                    for (let j = 0; j < pagesData[key].length; j++) {
                      let its = pagesData[key][j];
                      if (JSON.stringify(its) == JSON.stringify(item)) {
                        isSame = true;
                        break;
                      }
                    }
                    if (!isSame) {
                      pagesData[key].push(item);
                    }
                  }
                } else {
                  pagesData[key] = data[key];
                }
              }
              else {
                pagesData[key] = data[key];
              }
            }
          }
        } catch (e) {
          throw Error(`文件${item}解析失败`);
        }
      });
      fs.writeFileSync(this.pagesJsonFilePath, JSON.stringify(pagesData, null, "\t"));
      console.log("pages.json 创建成功");
    } catch (e) {
      throw Error(`pages.json创建失败，${e}`)
    }
  }

  filesArray(filePath) {
    let files = [];
    let dirItems = fs.readdirSync(filePath);
    dirItems.forEach(item => {
      if (this.watchFileName.indexOf(item) > -1) {
        files.push(path.join(filePath, item));
      } else {
        if (fs.statSync(path.join(filePath, item)).isDirectory()) {
          let _files = this.filesArray(path.join(filePath, item));
          if (_files.length > 0) {
            files = files.concat(_files);
          }
        }
      }
    });
    return files
  }
}

module.exports = Render
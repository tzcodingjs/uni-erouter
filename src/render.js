const fs = require('fs');
const path = require('path');
class Render {
  constructor() {
    this.pagesJsonFilePath = path.join(path.resolve(), "pages.json");
  }
  start() {
    let pagesData = {}
    try {

    } catch (e) {
      throw Error(`错误信息:${e}`)
    }
  }
}

module.exports = new Render()
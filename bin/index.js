#!/usr/bin/env node

const program = require('commander')
const init = require('../src/init')
const watch = require('../src/watch')

// 初始化方法
program.command('init').description('init').action(() => {
  init.start()
})

// 监听文件改变
program.command('watch').description('watch').action(() => {
  watch.change()
})

program.parse(process.argv)
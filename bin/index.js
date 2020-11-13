#!/usr/bin/env node

const program = require('commander')
const init = require('../src/init')
const watch = require('../src/watch')

// 初始化方法
program.command('init').description('现在执行了init方法').action(() => {
  console.log('测试1')
  init.start()
})

// 监听文件改变
program.command('watch').description('现在执行了watch方法').action(() => {
  console.log('测试2')
  watch.init()
})

program.parse(process.argv)
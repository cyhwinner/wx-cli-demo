#! /usr/bin/env node
const program = require('commander');
const version = require('./package.json').version;
const create = require('./lib/create.js')
program
  .command('add <file-name>')
  .option('-v, --version', version)
  .action((fileName, cmd) => {
    create(fileName)
  })
  
program.parse(process.argv)


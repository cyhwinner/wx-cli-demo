const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { 
  defaultPreset,
  newFilePathPreset,
  addFileTypePreset,
  overridePreset
} = require('./util/presetConfig');
const Generator = require('./Generator.js');

async function create(fileName, option) {
  const cwd = process.cwd();
  let context = '';

  // 如果返回相同格式 现在一个是布尔 一个是path
  let {confirm, filePath } = await inquirer.prompt([defaultPreset, newFilePathPreset]);
  context = path.resolve(cwd, confirm ? fileName : filePath + fileName); 
  if (fs.existsSync(context)) {
    const { override } = await inquirer.prompt([overridePreset])
    if (!override) {
      console.error(chalk.red(logSymbols.error, '已经存在相同目录'));
      return
    }
    fs.removeSync(context);
  }
  const { fileType } = await inquirer.prompt([addFileTypePreset]);
  fs.mkdirSync(context);
  
  const generator = new Generator({fileName, context, fileType});
  generator.generate()
}

module.exports = create
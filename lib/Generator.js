const loadFiles = require('./util/loadFiles');
const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

class Generator {
  constructor({fileName, context, fileType}) {
    this.fileName = fileName
    this.context = context;
    this.fileType = fileType;
    this.loadFiles = loadFiles;
    this.templatePath = path.resolve(__dirname, '../template');
    this.isComponent = fileType === 'Component';
    this.files = {};
  }

  generate() {
    fs.readdir(this.templatePath, (err, files) => {
      files.forEach((file) => {
        fs.readFile(path.resolve(this.templatePath, file), (err, content) => {
          if (err) {
            console.log(chalk.red(logSymbols.error, err));
            return;
          }
          this.files[file] = ejs.render(String(content), {isComponent: this.isComponent})
          let fileName = this.fileName + '.' + file.split('.')[1];
          let filePath = path.resolve(this.context, fileName)
          
          fs.writeFileSync(filePath, this.files[file])
        })
      })
    })
    console.log(chalk.green(logSymbols.success, '创建成功'));
  }
}

module.exports = Generator
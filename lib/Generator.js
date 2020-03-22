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
    console.log(this.templatePath)
    this.isComponent = fileType === 'Component';
    this.files = {};
  }

  generate() {
    fs.readdir(this.templatePath, (err, files) => {
      files.forEach((file, index) => {
        fs.readFile(path.resolve(this.templatePath, file), (err, content) => {
          if (err) {
            console.log(chalk.red(logSymbols.error, err));
            return;
          }
          this.files[file] = ejs.render(String(content), {isComponent: this.isComponent})
          let filePath = path.resolve(this.context, this.fileName + this.loadFiles[index])
          
          fs.writeFileSync(filePath, this.files[file])
        })
      })
    })
  }
}

module.exports = Generator
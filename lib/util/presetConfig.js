const defaultPreset = {
  name: 'confirm',
  type: 'confirm',
  message: '在当前文件路径下新增吗？'
}

const newFilePathPreset = {
  name: 'filePath',
  type: 'input',
  when: answer => !answer.confirm,
  message: '请输入文件路径'
}
const overridePreset = {
  name: 'override',
  type:'confirm',
  message: '确定覆盖同名文件夹吗'
}

const addFileTypePreset = {
  name: 'fileType',
  message: '选择新建文件类型',
  type: 'list',
  choices: ['Component', 'Page'],
  default: 'Component'
}

module.exports = {
  defaultPreset,
  newFilePathPreset,
  overridePreset,
  addFileTypePreset
}
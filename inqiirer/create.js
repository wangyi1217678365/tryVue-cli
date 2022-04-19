const path = require('path')

const fsExtra = require('fs-extra')

const inquirer = require('inquirer')

const Generator = require('../createProject/index')

const {isOverwriteSelect} = require('./data')

module.exports = async function (name, options) {
  const cwd = process.cwd()
  const targetAir  = path.join(cwd, name)
  if (fsExtra.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options?.force) {
      await fsExtra.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
      let {action} = await inquirer.prompt({
        name: 'action',
        type: 'list',
        choices: isOverwriteSelect
      })
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        await fsExtra.remove(targetAir)
      }
    }
  }

  const generator = new Generator(name, targetAir)

  generator.create()
}
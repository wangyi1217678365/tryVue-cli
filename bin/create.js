const path = require('path')

const fsExtra = require('fs-extra')

const inquirer = require('inquirer')

const Generator = require('./Generator.js')

const SelectOptions = require('./SeletOptions.js')
module.exports = async function (name, options) {
  const cwd = process.cwd()
  const targetAir  = path.join(cwd, name)
  if (fsExtra.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options?.force) {
      await fsExtra.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
      let {action} = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
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
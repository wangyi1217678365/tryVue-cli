const { getRepoList } = require('./api.js')
// 加载动画
const ora = require('ora')

const inquirer = require('inquirer')

const util = require('util') 

const downloadGitRepo = require('download-git-repo') // 不支持 Promise

const chalk = require('chalk')

const path = require('path')

const figlet = require('figlet')

async function wrapLoading (fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  spinner.start();
  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}


class Generator {
  constructor (name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo () {
    // 1）从远程拉取模板数据
    const data = await wrapLoading(getRepoList, 'waiting fetch template');
    if (data.status !== 200) return;
    // 过滤我们需要的模板名称
    const repos = data.data.map(item => item.name);
    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos.concat('Manaully select fearures'),
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  async download (repo) {
    const requestUrl = `tryVue-projectTemplate/${repo}`

    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  // 核心创建逻辑
  async create (){
    const repo = await this.getRepo()

    if (repo === 'Manaully select fearures') {

    } else {
      await this.download(repo)
    }

    // 4）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
    // console.log('\r\n' + figlet.textSync('zhurong', {
    //   font: 'Ghost',
    //   horizontalLayout: 'default',
    //   verticalLayout: 'default',
    //   width: 80,
    //   whitespaceBreak: true
    // }));
  }
}

module.exports = Generator;
#! /usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
// 配置创建项目的指令
program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../inqiirer/create')(name, options);
  });

// 配置图形化界面指令
program
  .command('ui')
  .description('start add open zr-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((options) => {
    console.log(options);
  });

// 配置版本号信息
program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

program
  .on('--help', () => {
    console.log(`\r\nRun ${chalk.cyan('zr <command> --help')} for detailed usage of given command\r\n`);
  });

// 解析用户执行命令传入参数
program.parse(process.argv);

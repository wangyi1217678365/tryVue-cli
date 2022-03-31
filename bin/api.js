const getData = require('./http.js')
const {OrganizationsName} = require('./config.js')
/**
 * 获取模板列表
 * @returns Promise
 */
 const getRepoList = () => getData(`https://api.github.com/orgs/${OrganizationsName}/repos`)

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
 const getTagList = (repo) => getData(`https://api.github.com/repos/${OrganizationsName}/${repo}/tags`)

 module.exports = {
  getRepoList
 }
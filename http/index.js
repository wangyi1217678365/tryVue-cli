const axios = require('axios')
const basurl = "https://api.github.com/orgs"

const request = axios.create({
  baseURL: basurl,
  timeout: 600000
})

request.interceptors.request.use(function (config) {
  // console.log(config, '完整参数')
  return config
}, function (error) {
  // 发生错误也要正常返回请求(为了适应async)
  return Promise.resolve(error)
})

request.interceptors.response.use(function (response) {
  // console.log(response, "请求返回的结果")
  return response
}, function (error) {
  // console.log("发生了错误??????????????????????????????????????????")
  // 发生错误的请求也要正常返回 resolve, 这样 Promise.all 和race 还有 async就会正常运行
  return Promise.resolve(error)
})

function getData (url, data = {}, method = "GET", options = {}) {
  const obj = {
    ...options,
    url,
    method
  }
  // console.log(obj, "请求参数")
  const formatMethods = method.toUpperCase()
  if (formatMethods === "GET" || formatMethods === "DELETE") {
    obj.params = data
  } else {
    obj.data = data
  }
  return request(obj)
}


module.exports = getData
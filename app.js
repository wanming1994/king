let Member = require('/service/member.js')
let util = require('/utils/util.js')
let config = require('/utils/config.js')

App({
  globalData: {
    LOGIN_STATUS: false,
    sys: wx.getSystemInfoSync()
  },
  onShow(opData) {

  },
  loginOkCallbackList: [],
  onLaunch(opData) {
    let that = this
    console.log('wx.log')
    wx.login({
      success(data) {
        // 用户登陆成功
        wx.getUserInfo({
          withCredentials: true,
          success: function (inf) {
            console.log(inf)
            var info = inf
            tryLogin(data.code,info, (res) => {
              that.globalData.LOGIN_STATUS = true
            })
          },
          fail: function (err) {
            reject(err);
          }
        })
       
      }
    })
  }
})

//登陆，获取sessionid
var tryLogin = (function () {
  let count = 0
  return function (code, info, fn) {
    if (count >= config.LOGIN_ERROR_TRY_COUNT) {
      util.errShow('登陆超时')
      return
    }
    new Member(function (res) {
      if (res.data.login || res.data.sessionId !== null) {
        //设置请求session到本地
        // wx.setStorageSync('JSESSIONID', res.data.sessionId)
        wx.setStorageSync('token', res.data.token)


        fn ? fn(res) : ''
      } else {
        setTimeout(function () {
          tryLogin(code)
          count++
        }, config.LOGIN_ERROR_TRY_TIMEOUT)
      }
    }, function (err) {
      util.errShow('登陆失败', 1000)
    }).login({
      code: code,
      userInfo: info
    })
  }
})()
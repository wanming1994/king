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
    wx.login({
      success(data) {
        tryLogin(data.code, (res) => {
          if (that.loginOkCallbackList.length > 0) {
            for (let i = 0; i < that.loginOkCallbackList.length; i++) {
              if (typeof that.loginOkCallbackList[i] === 'function') {
                that.loginOkCallbackList[i]()
              }
              continue
            }
          }
          that.globalData.LOGIN_STATUS = true;
          that.globalData.memberInfo = res.data        
        })
      }
    })
  }
})

//登陆，获取token
var tryLogin = (function () {
  let count = 0
  var that=this
  return function (code, fn) {
    if (count >= config.LOGIN_ERROR_TRY_COUNT) {
      util.errShow('登陆超时')
      return
    }
    new Member(function (res) {
      if (res.data.token) {
        wx.setStorageSync('token', res.data.token);
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
      code: code
    })
  }
})()
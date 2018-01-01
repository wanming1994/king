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
    const extension = opData.query.extension;
    console.log(1111111)
    console.log('推广人：' + extension)
    wx.login({
      success(data) {
        // 用户登陆成功
        wx.getUserInfo({
          withCredentials: true,
          fail: function (err) {
            if (err.errMsg.indexOf('auth') > -1) {
              wx.showModal({
                title: '提示',
                content: '未授予用户信息权限，部分功能会受到限制，是否前往设置',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting()
                  }
                }
              })
            }
          },
          complete: function (info) {
            tryLogin(data.code, info, extension, (res) => {
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
  }
})

//登陆，获取token
var tryLogin = (function () {
  let count = 0
  var that = this
  return function (code, info, extension, fn) {
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
      code: code,
      userId: extension,
      userInfo: info
    })
  }
})()
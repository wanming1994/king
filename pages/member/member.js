let app = getApp(),
  util = require("../../utils/util.js")
Page({
  data: {
    memberInfo: app.globalData.memberInfo
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
 
  onShow: function () {
    var that = this;
    if (app.globalData.LOGIN_STATUS) {
      this.getInfoWhenLogin()
    } else {
      app.loginOkCallback = res => {
        this.getInfoWhenLogin()
      }
    }
  },
  getInfoWhenLogin: function () {
    var that=this;
    that.setData({
      memberInfo:app.globalData.memberInfo
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          authSuccess:true,
          userInfo: res.userInfo
        })
      },
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
      }
    })
  },
  getGoods() {
    util.navigateTo({
      url: 'getGoods/getGoods',
    })
  },
  
  //个人资料
  toInfo: function () {
    util.navigateTo({
      url: 'info/info',
    })
  },
  //积分兑换
  goExchange: function () {
    util.navigateTo({
      url: 'exchange/exchange',
    })
  },
  //我的影响力
  toMyInfluence: function () {
    util.navigateTo({
      url: 'influence/influence',
    })
  },
  //分享
  goShare: function () {
    util.navigateTo({
      url: 'share/share',
    })
  },
  //绑定手机
  bindPhone: function () {
    util.navigateTo({
      url: 'bind/bind',
    })
  },

  //我的订单
  toOrder: function (e) {
    var id = e.currentTarget.dataset.current
    util.navigateTo({
      url: 'order/order?id=' + id,
    })
  }
})
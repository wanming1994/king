// pages/home/home.js

var   app = getApp(),
  util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //分享
  onShareAppMessage: function (res) {
    var that = this;
    console.log()
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '邀请您加入大王纸尿裤',
        imageUrl:'https://www.sincereglobe.com/IMAGE/share.jpg',
        path: '/pages/home/home?extension=43',
        path: '/pages/home/home?extension=' + app.globalData.memberInfo.userId,
        success: function (res) {
          console.log('/pages/home/home?extension=' + app.globalData.memberInfo.userId)
          // 转发成功
          wx.showToast({
            title: '转发成功',
            icon: 'success'
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }

    }
    return {
      title: '邀请您加入大王纸尿裤',
      imageUrl: 'https://www.sincereglobe.com/IMAGE/share.jpg',
      // path: '/pages/home/home?extension=' + app.globalData.memberInfo.userId,
      path: '/pages/home/home?extension=43',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
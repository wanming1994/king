let order = require("../../../service/order.js"),
  member= require("../../../service/member.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
// pages/home/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  clickImg:function(){
    new order(function(res){
      var orderId = res.data.orderInfo.id;
      new order(function(data){
        wx.requestPayment({
          'timeStamp': data.data.timeStamp,
          'nonceStr': data.data.nonceStr,
          'package': data.data.package,
          'signType': 'MD5',
          'paySign': data.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function(){
              wx.redirectTo({
                url: '/pages/member/share/share',
              })
            },1500)
          },
          'fail': function (res) {
          }
        })
      }).goPay({
        orderId: orderId,
        userScore:0,
      })
    }).submit({
      orderType:3,
      recommendUserId: 43
        // recommendUserId: wx.getStorageSync('extension') ? wx.getStorageSync('extension'):''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    new member(function(data){
      that.setData({
        recommendUser: data.data.userName
      })
    }).getUserName({
      // userId: wx.getStorageSync('extension') ? wx.getStorageSync('extension'):''
      userId: 43
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
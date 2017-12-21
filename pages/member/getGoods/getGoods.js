var app = getApp();
var util = require("../../../utils/util.js");
var order = require('../../../service/order.js');
var getPwd = require('../../../utils/getPassword.js');
var password = require('../../../service/common.js');
// pages/member/getGoods/getGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData: {
      count: 0,
      name: '',
      num: 0
    },
    sum: 0,
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new order(res => {
      this.setData({
        data: res.data.data,
        sum: res.data.sum
      })
    }).myEcoupons({

    })
    new order(function () {

    }).goodsAttribute({
      ecouponId: 1
    })
  },


  select: function (e) {
    const { id, count, name } = e.currentTarget.dataset
    if (Number(count) === 0) {
      util.errShow("该类型暂无可提")
      return
    }
    this.setData({
      showAction: true
    })
  },

  //弹出框toggle

  toggleMask(e) {
    this.setData({
      showAction: !this.data.showAction,
      buyType: e.currentTarget.dataset.type,
      _swiper: this.data._swiper
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
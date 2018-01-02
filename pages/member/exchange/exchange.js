
var app = getApp()
var product = require("../../../service/product.js")
var order = require("../../../service/order.js")
var member = require("../../../service/member.js")
var util = require("../../../utils/util")
// pages/member/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    new product(function (data) {
      that.setData({
        exchangeList: data.data.exchangeGoodsList,
        size: that.data.size,
        page: 1
      });
    }).exchangeList({
      page: 1,
      size: that.data.size
    })

  //type0兑换中，1兑换完成
    new member(function(){

    }).goodsexchange({
      type:1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //兑换提交
  goExchange: function (e) {
    var that=this;
    var id = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    wx.showModal({
      title: '兑换提示',
      content: '确认花费' + price+'积分兑换商品吗?',
      success:function(res){
        if(res.confirm){
          new order(function (res) {

          }).submit({
            goodsId: id,
            goodsAmount: 1,
            orderType: 1
          })
        }
      }
    })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();  //加载的状态
    new product(function (data) {
      var exchangeList = data.data.exchangeGoodsList
      that.setData({
        exchangeList: exchangeList,
        size: that.data.size,
        page: 1
      });
      if (data.data.exchangeGoodsList.length == 0) {
        that.setData({
          tips: '没有更多啦~',
          showtips: false
        })
      }
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }).exchangeList({
      size: that.data.size,
      page: 1
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    var page = this.data.page;
    var exchangeList = this.data.exchangeList;
    new product(function (data) {
      wx.hideNavigationBarLoading() //完成停止加载
      if (data.data.exchangeGoodsList.length < that.data.size) {
        that.setData({
          tips: '没有更多啦~',
          showtips: false
        })
      } else {
        exchangeList = exchangeList.concat(data.data.exchangeGoodsList)
        that.setData({
          exchangeList: exchangeList,
          loading: false,
          tips: '努力加载中',
          showtips: false,
          page: page
        })
      }
    }).exchangeList({
      size: that.data.size,
      page: ++page
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
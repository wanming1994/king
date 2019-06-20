// pages/member/exchange/index.js
var app = getApp()
var product = require("../../../service/product.js")
var order = require("../../../service/order.js")
var member = require("../../../service/member.js")
var Education = require("../../../service/education.js")
var util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelList: [{
      id: 1,
      name: '0~1岁'
    }, {
      id: 2,
      name: '1~3岁'
    }, {
      id: 3,
      name: '3~6岁'
    }, {
      id: 4,
      name: '小学'
    }, {
      id: 5,
      name: '初中'
    }, {
      id: 6,
      name: '高中'
    }, {
      id: 7,
      name: '大学'
    }, {
      id: 8,
      name: '硕士'
    }, {
      id: 9,
      name: '博士'
    }]
  },
  //七天训练营
  trainingCamp() {
    wx.navigateTo({
      url: '/pages/member/educationalFund/trainingCamp',
    })
  },
  //点击顶部导航
  topBindtap(e) {
    var that = this
    const index = e.currentTarget.dataset.index
    const name = e.currentTarget.dataset.name
    const id = e.currentTarget.dataset.id
    if (typeof index === 'undefined') return
    const topList = this.data.channelList
    const topScrollId = topList[index - 2 > 0 ? index - 2 : 0].id
    this.setData({
      topAcIndex: index,
      topAcId: id,
      topScrollId: `top${topScrollId}`
    })
    if (id == "0000") {
      return
    }
  },
  //早教交流群
  myGroup() {
    wx.navigateTo({
      url: '../educationalFund/group',
    })
  },
  myCourse() {
    wx.navigateTo({
      url: '../educationalFund/course/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    new Education(res => {
      this.setData({
        useData: res.data.categoryList
      })
    }).educationCategories()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
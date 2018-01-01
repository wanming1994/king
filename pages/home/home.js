// pages/home/home.js

let swiperAutoHeight = require("../../template/swiper/swiper.js"),
  Product = require("../../service/product.js"),
  Cart = require("../../service/cart.js"),
  Coupon = require("../../service/coupon.js"),
  Tenant = require("../../service/tenant.js"),
  Ad = require("../../service/ad.js"),
  app = getApp(),
  util = require("../../utils/util.js")

Page(Object.assign({}, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  //邀请
  joinUs: function () {
    util.navigateTo({
      url: 'join/join'
    })
  },

  //商品详情
  goProductDeatil: function (e) {
    var id = e.currentTarget.dataset.id;
    util.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.LOGIN_STATUS) {
      this.getData()
    } else {
      app.loginOkCallbackList.push(() => {
        this.getData()
      })
    }
  },

  getData: function () {
    var that = this;
    new Product(function (data) {
      that.setData({
        productHotList: data.data.hotGoodsList
      })
      // console.log(data)
    }).list()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //分享
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: that.data.tenantData.name,
      path: 'pages/home/home?&extension=' + app.globalData.memberInfo.userId,
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
}))
let swiperAutoHeight = require("../../../template/swiperProduct/swiper.js"),
  Cart = require("../../../service/cart.js"),
  Product = require("../../../service/product.js"),
  order = require("../../../service/order.js"),
  WxParse = require('../../wxParse/wxParse.js'),
  app = getApp(),
  util = require("../../../utils/util.js")


function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page(Object.assign({}, swiperAutoHeight, {

  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  /**
   * 页面的初始数据
   */
  data: {
    goodsAmount: 1,
    sys: app.globalData.sys,//系统信息
    productData: {},//数据
    showAction: false,//显示弹窗
    buyType: 'buy',//buy or cart
    specification: {},//商品规格
    canClick: [],
    pageLoad: false,//页面加载完成
    userScoreInput: 0,//付款使用积分
    scoreMax: 0,//可用积分
  },
  catchActionMask(e) {
    return false;
  },
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    this.data.id = id;
    var extension = options.extension;
    new Product((res) => {
      wx.setNavigationBarTitle({
        title: res.data.info.name
      })
      var introduction = res.data.info.goods_desc;
      this.setData({
        productData: res.data,
        introduction: res.data.info.goods_desc,
      })

      if (introduction != null) {
        WxParse.wxParse('introduction', 'html', introduction, that, 5);
      }
      setTimeout(res => {
        this.setData({
          pageLoad: true
        })
      }, 200)
    }).view({
      id: id
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
  //立即购买选择数量
  revisenum(e) {
    let stype = e.currentTarget.dataset.type,
      min = 1,
      max = 10,
      goods_number = this.data.productData.info.goods_number,
      goodsAmount = this.data.goodsAmount
    switch (stype) {
      case 'input':
        goodsAmount = (!isNaN(e.detail.value) && e.detail.value >= min && e.detail.value <= goods_number) ? e.detail.value : goodsAmount
        break;
      case 'add':
        goodsAmount = goodsAmount + 1 <= goods_number ? goodsAmount + 1 : goods_number
        break;
      case 'reduce':
        goodsAmount = goodsAmount - 1 < min ? 1 : --goodsAmount
        break;
    }
    this.setData({
      goodsAmount: goodsAmount
    })
  },


  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  },


  //立即购买确认按钮
  paySubmit: function () {
    let that = this;
    wx.showLoading()
    //创建订单submit
    new order(function (res) {
      wx.hideLoading()
      that.setData({
        userScoreInput:res.data.userScore,
        scoreMax: parseInt(res.data.userScore),
        showBuyDetail: true,
        showAction: false,
        actual_price: res.data.orderInfo.actual_price,
        orderId: res.data.orderInfo.id
      })

      //计算初始积分抵扣现金（默认使用最大积分来抵现）
      new order(function(data){
        that.setData({
          scoreMoney: data.data.scoreMoney < that.data.actual_price ? data.data.scoreMoney : that.data.actual_price,
          trueAmount: res.data.orderInfo.actual_price - data.data.scoreMoney >= 0 ? res.data.orderInfo.actual_price - data.data.scoreMoney:0
        })
      }).calPoint({
        useScore: res.data.userScore
      })

    }).submit({
      goodsId: that.data.productData.info.id,
      goodsAmount: that.data.goodsAmount,
      orderType: 0
    })
  },
  //去付款
  toBuyConfirm() {
    let that=this;
    //发起支付接口
    new order(function(){
      this.setData({
        showBuyDetail: false,
        showAction: false,
      })
    }).goPay({
      orderId: that.data.orderId,
      userScore: that.data.userScoreInput
    })
    
  },
  closeMask(){
    this.setData({
      showBuyDetail: false,
      showAction: false,
    })
  },
  //付款输入积分
  userScoreInput(e) {
    let that=this;
    let val = parseInt(e.detail.value)
    let userScoreInput = val > this.data.scoreMax ? this.data.scoreMax : val
    new order(function (data) {
      that.setData({
        scoreMoney: data.data.scoreMoney,
        userScoreInput: userScoreInput ? userScoreInput : 0,
        // trueAmount: userScoreInput ? this.data.actual_price - userScoreInput : this.data.actual_price,
        trueAmount: that.data.actual_price - data.data.scoreMoney >= 0 ? that.data.actual_price - data.data.scoreMoney : 0
      })
    }).calPoint({
      useScore: userScoreInput ? userScoreInput:0
    })
  
  },
  toggleshowShortcut: function () {
    this.setData({
      showShortcut: false
    })
  }
}))
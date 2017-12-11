let swiperAutoHeight = require("../../../template/swiperProduct/swiper.js"),
  Cart = require("../../../service/cart.js"),
  Product = require("../../../service/product.js"),
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
    selectArr: [],
    pageLoad: false,//页面加载完成
    videoShow: false,
    showShortcut: false
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
      // var attributes = res.data.attributes;
      var introduction = res.data.info.goods_desc;
      var attributesList = res.data.attributes;
      this.setData({
        title: res.data.name,
        productData: res.data,
        specification: {
          select: res.data.specification,
          all: res.data.specifications,
          selectList: res.data.productSpecifications,
          // attributes: res.data.attributes,
        },
        introduction: res.data.info.goods_desc,
        attributesList: res.data.attributes
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //弹出框toggle

  toggleMask(e) {
    this.setData({
      showAction: !this.data.showAction,
      buyType: e.currentTarget.dataset.type,
      _swiper: this.data._swiper
    })
  },

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
  // 评价
  ecaluate: function (e) {
    util.navigateTo({
      url: 'evaluate/evaluate?id=' + this.data.id
    })
  },


  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    var pageModel = this.data.pageModel;
    var tenantRecomList = this.data.tenantRecomList;
    new Product(function (data) {
      wx.hideNavigationBarLoading() //完成停止加载
      if (data.pageModel.totalPages < data.pageModel.pageNumber) {
        that.setData({
          tips: '没有更多啦~',
          showtips: false
        })
      } else {
        tenantRecomList = tenantRecomList.concat(data.data)
        that.setData({
          tenantRecomList: tenantRecomList,
          loading: false,
          tips: '努力加载中',
          showtips: false
        })
      }
    }).recommend({
      id: that.data.id,
      pageSize: 6,
      pageNumber: ++pageModel.pageNumber
    });
  },


  //加入购物车和立即购买确认按钮
  paySubmit: function () {
    let that = this;
    //立即购买
    if (that.data.buyType == 'buy') {
      // new Cart(function () {
      //   that.setData({
      //     showAction: false
      //   })
      //   util.navigateTo({
      //     url: '/pages/pay/pay'
      //   })
      // }).add({
      //   id: that.data.selectData.id,
      //   quantity: that.data.selectData.quantity,
      //   type: 'buy'
      // })
      //加入购物车
    } else if (that.data.buyType == 'cart') {
      new Cart(function () {
        that.setData({
          showAction: false
        })
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        //更新购物车数量
        new Cart(function (data) {
          that.setData({
            cartCount: data.data
          })
        }).count({
          tenantId: app.globalData.tenantId
        })
      }).add({
        id: that.data.selectData.id,
        quantity: that.data.selectData.quantity
      })
    }

  },


  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: that.data.title,
      path: 'pages/home/productDetails/productDetails?id=' + that.data.id + '&extension=' + app.globalData.memberInfo.username,
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
  },

  //快捷导航点击事件
  openShortcut: function () {
    this.setData({
      showShortcut: !this.data.showShortcut
    })
  },
  toggleshowShortcut: function () {
    this.setData({
      showShortcut: false
    })
  },

  //店铺首页
  goHome: function () {
    util.navigateTo({
      url: '/pages/home/index',
    })
  },
  //收藏
  goFavorite: function () {
    util.navigateTo({
      url: '/pages/member/favorite/favorite',
    })
  },
  //搜索
  goSearch: function () {
    util.navigateTo({
      url: '/pages/home/productList/productList',
    })
  },
  //购物车
  goCart: function () {
    util.navigateTo({
      url: '/pages/cart/index',
    })
  }


}))
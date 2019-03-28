// pages/home/home.js

let swiperAutoHeight = require("../../template/swiper/swiper.js"),
  Product = require("../../service/product.js"),
  Cart = require("../../service/cart.js"),
  Coupon = require("../../service/coupon.js"),
  member = require("../../service/member.js"),
  Tenant = require("../../service/tenant.js"),
  Ad = require("../../service/ad.js"),
  app = getApp(),
  util = require("../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {
  data: {
    imgUrls: [
      'https://www.sincereglobe.com/IMAGE/BANNER1.jpg',
      'https://www.sincereglobe.com/IMAGE/BANNER2.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    winHeight: wx.getSystemInfoSync().windowHeight,
    showIndex: 0,
    isShow: false,
    startTouches: {},
    moveTouches: {},
    limitLength: true
  },
  //邀请
  joinUs: function() {
    new member(function(res) {
      if (res.data.userIsMember == 1) {
        util.navigateTo({
          url: '/pages/member/share/share'
        })
      } else {
        util.navigateTo({
          url: 'join/join'
        })
      }
    }).view()
  },

  //视频
  goVideo: function() {
    util.navigateTo({
      url: '/pages/home/video/video',
    })
  },

  //商品详情
  goProductDeatil: function(e) {
    var id = e.currentTarget.dataset.id;
    util.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.LOGIN_STATUS) {
      this.getData(options)
    } else {
      app.loginOkCallbackList.push(() => {
        this.getData(options)
      })
    }
  },
  // 关闭限时抢购活动
  closeLimit() {
    this.setData({
      limitLength: true
    })
  },
  getData: function(options) {
    var that = this;
    if (options.extension) {
      wx.setStorageSync('extension', options.extension)
    }
    new Product(function(data) {
      that.setData({
        productHotList: data.data.hotGoodsList
      })
      var len = data.data.promotionList.length
      if (len == 0) {
        that.setData({
          limitLength: true
        })
      } else {
        that.setData({
          limitLength: false
        })
      }

      function time1() {
        var limitsell = data.data.promotionList
        for (var i = 0; i < limitsell.length; i++) {
          // 活动是否已经开始
          var totalSecond = limitsell[i].beginDate / 1000 - Date.parse(new Date()) / 1000;
          // 活动是否已经结束
          var endSecond = limitsell[i].endDate / 1000 - Date.parse(new Date()) / 1000;
          // 秒数

          if (totalSecond < 0 && endSecond > 0) {
            var second = endSecond;
          } else {
            var second = totalSecond;
          }

          // 天数位
          var day = Math.floor(second / 3600 / 24);
          var dayStr = day.toString();
          if (dayStr.length == 1) dayStr = '0' + dayStr;

          // 小时位
          var hr = Math.floor((second - day * 3600 * 24) / 3600);
          var hrStr = hr.toString();
          if (hrStr.length == 1) hrStr = '0' + hrStr;

          // 分钟位
          var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
          var minStr = min.toString();
          if (minStr.length == 1) minStr = '0' + minStr;

          // 秒位
          var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = '0' + secStr;
          totalSecond--;
          if (totalSecond < 0 && endSecond > 0) {
            limitsell[i].txt = '马上秒'
            limitsell[i].countDownDay = dayStr
            limitsell[i].countDownHour = hrStr
            limitsell[i].countDownMinute = minStr
            limitsell[i].countDownSecond = secStr
            that.setData({
              limitsell: limitsell
            });
          } else if (totalSecond > 0) {
            limitsell[i].txt = '即将开秒'
            limitsell[i].countDownDay = dayStr
            limitsell[i].countDownHour = hrStr
            limitsell[i].countDownMinute = minStr
            limitsell[i].countDownSecond = secStr

            that.setData({
              limitsell: limitsell
            });
          } else if (totalSecond < 0 && endSecond < 0) {
            clearInterval(time1);
            limitsell[i].txt = '去看看'
            limitsell[i].countDownDay = '00'
            limitsell[i].countDownHour = '00'
            limitsell[i].countDownMinute = '00'
            limitsell[i].countDownSecond = '00'
            that.setData({
              limitsell: limitsell
            });
          }
        }
        that.setData({
          limitsell: limitsell,
        })
      }
      time1();
      var timer = setInterval(time1, 1000);
    }).list()
  },

  wrapScroll(e) {
    if (e.detail.scrollTop >= 95) {
      this.setData({
        isShow: true
      })
    }
  },
  touchStart(e) {
    this.data.startTouches = e.changedTouches[0]
  },
  touchMove(e) {
    this.data.moveTouches = e.changedTouches[0]
  },
  touchEnd(e) {
    // if (!this.data.isShow) return
    // console.log(e)
    let startTouch = this.data.startTouches,
      Y = e.changedTouches[0].pageY - startTouch.pageY,
      X = Math.abs(e.changedTouches[0].pageX - startTouch.pageX)
    this.data.endTouches = e.changedTouches[0]
    if (X > 200) return
    if (Y > 50) {
      if (this.data.showIndex === 0) {
        this.setData({
          isShow: false
        })
        return
      }
      this.setData({
        showIndex: --this.data.showIndex
      })
      // console.log('下拉')
    } else if (Y < -50 && this.data.showIndex < this.data.productHotList.length - 1) {
      this.setData({
        showIndex: ++this.data.showIndex
      })
      // console.log('上拉')
    }
  },
  //分享
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '邀请您加入大王纸尿裤',
      path: 'pages/home/home?extension=' + app.globalData.memberInfo.userId,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
}))
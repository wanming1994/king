let app = getApp(),
  util = require("../../utils/util.js")
Page({
  data: {
    
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  getGoods(){
    util.navigateTo({
      url: 'getGoods/getGoods',
    })
  },
  //个人资料
  toInfo:function(){
    util.navigateTo({
      url: 'info/info',
    })
  },
  //积分兑换
  goExchange:function(){
    util.navigateTo({
      url: 'exchange/exchange',
    })
  },
  //我的影响力
  toMyInfluence:function(){
    util.navigateTo({
      url: 'influence/influence',
    })
  },
  //分享
  goShare:function(){
    util.navigateTo({
      url: 'share/share',
    })
  },
  //绑定手机
  bindPhone:function(){
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
    },
})
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
  toInfo:function(){
    util.navigateTo({
      url: 'info/info',
    })
  },
  toMyInfluence:function(){
    util.navigateTo({
      url: 'influence/influence',
    })
  }
})
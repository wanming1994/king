var app = getApp()
var member = require('../../../service/member.js')
var util = require('../../../utils/util')
var util = require("../../../utils/util.js")

Page({
  data: {
  
  },
  onLoad: function (options) {
    new member(function(){

    }).userRecommend()
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  }
})
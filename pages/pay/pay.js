let app = getApp();
let actionsheet = require("../../template/actionsheet/payactionsheet.js");
let util = require('../../utils/util.js');
let receiver = require('../../service/receiver.js');
let order = require('../../service/order.js');
let product = require('../../service/product.js');
let tenant = require('../../service/tenant.js');
let member = require('../../service/member.js');

Page(Object.assign({}, actionsheet, {
  /**
   * 页面的初始数据
   */
  data: {
    goodsAmount: 1,
    usePoint:true,
    userScoreInput:100
  },


  onLoad: function (options) {
    let that = this;
    let id = options.id;
    this.data.id = id;
    new product((res) => {
      this.setData({
        productData: res.data,
        totalAmount: res.data.info.retail_price
      })
      new member(function (res) {
        that.setData({
          scoreMax: res.data.bonus
        })
        that.calcPointMoney(that.data.totalAmount, res.data.bonus)
      }).view()
      
    }).view({
      id: id
    })

    

  },

//选择是否使用积分
  clickUsePoint:function(){
    this.setData({
      usePoint: !this.data.usePoint
    })
    if (this.data.usePoint) {
      this.calcPointMoney(this.data.totalAmount, this.data.scoreMax)
    }else{
      this.calcPointMoney(this.data.totalAmount, 0)
    }
  },

  //付款输入积分
  userScoreInput(e) {
    let that = this;
    let val = parseInt(e.detail.value)
    this.setData({
      userScoreInput: val > this.data.scoreMax ? this.data.scoreMax : val
    })
    this.calcPointMoney(this.data.totalAmount, val)

  },

  calcPointMoney: function (totalAmount, scoreInput){
    var that=this;
    //获取总积分
    new order(function (data) {
      //抵扣金额大于订单总额
      if (data.data.scoreMoney > totalAmount) {
        new order(function (cdata) {
          that.setData({
            userScoreInput: cdata.data.useBonus,
            trueAmount: 0,
            canTransMoney: totalAmount
          })
        }).moneyConvert({
          useMoney: that.data.totalAmount
        })
      } else {
        that.setData({
          userScoreInput: scoreInput,
          trueAmount: that.data.totalAmount - data.data.scoreMoney,
          canTransMoney: data.data.scoreMoney
        })
      }
    }).calPoint({
      useScore: scoreInput
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
      goodsAmount: goodsAmount,
      totalAmount: goodsAmount * (this.data.productData.info.retail_price)
    })
    if (this.data.usePoint){
      this.calcPointMoney(this.data.totalAmount, this.data.scoreMax)
    }
  },

  toggleMaskPay:function(){
    this.setData({
      showPayDetail: false
    })
  },

  //确认下单提交
  formSubmit: function (e) {
    var that=this;
      //创建订单submit
      new order(function (res) {
        wx.hideLoading();
        that.setData({
          showPayDetail: true
        })
        that.setData({
          orderInfo: res.data.orderInfo
        })
      }).submit({
        goodsId: that.data.id,
        goodsAmount: that.data.goodsAmount,
        orderType: 0,
        userScore: that.data.usePoint ? that.data.userScoreInput:0
      })
  }
}))
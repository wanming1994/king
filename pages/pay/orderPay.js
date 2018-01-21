let app = getApp();
let actionsheet = require("../../template/actionsheet/payactionsheet.js");
let util = require('../../utils/util.js');
let receiver = require('../../service/receiver.js');
let order = require('../../service/order.js');
let member = require('../../service/member.js');
let tenant = require('../../service/tenant.js');
let cart = require('../../service/cart.js');

Page(Object.assign({}, actionsheet, {

  /**
   * 页面的初始数据
   */
  data: {
    memo: '',
    addressIsGet: true,
    usePoint: true,
    getAddressCount: 10
  },
  //收货地址
  chooseAddress: function () {
    var that = this;
    try {
      wx.chooseAddress({
        success: function (res) {
          //获取国家地址码
          new receiver(function (data) {

            //保存地址
            new receiver(function (sd) {
              console.log(sd)
              that.getAddress()
            }).save({
              areaId: data.data,
              consignee: res.userName,
              address: res.detailInfo,
              phone: res.telNumber
            })
          }).getAreaId({
            code: res.nationalCode
          })
        },
        fail: function (err) {
          if (err.errMsg.indexOf('auth deny') > -1) {
            wx.showModal({
              title: '提示',
              content: '未授予地址权限，是否前往设置',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting()
                }
              }
            })
          }
        }
      })
    } catch (e) {
      util.errShow('微信版本过低')
    }
  },

  onLoad: function (options) {
    if (options.shelvesNo) {
      this.setData({
        shelvesNo: options.shelvesNo,
        express: true,
        since: true,
        freight: true,
        showMemo: false,
        isSelfGet: true
      })
    }
    var that = this;
    if (options.payType) {
      this.data.isSelfGet = true
      this.setData({
        isSelfGet: this.data.isSelfGet,
        express: true,
        since: true,
        freight: true
      })
    }
    this.getAddress();
  },

  getAddress(fn) {
    var that = this
    this.data.addressIsGet = false
    new cart(function (data) {
      that.data.addressIsGet = true
      that.setData({
        orderInfo:data.data,
        receiver: data.data.address,
        order: data.data.checkedGoodsList,
        totalAmount: data.data.orderTotalPrice,
        scoreMax: data.data.userBonus
      })
      that.calcPointMoney(that.data.totalAmount, data.data.userBonus)
      // that.calcu()
    }).orderCon({})

  },

  //计算价格方法
  calcu: function () {
    var that = this;
    // new order(function (data) {
    //   that.setData({
    //     calcuPrice: data.data.trades,
    //     amount: data.data.amountPayable,
    //     discount: data.data.discount
    //   })
    // }).calculate({
    //   paymentMethodId: that.data.paymentMethodId,
    //   shippingMethodId: that.data.shippingMethodId,
    //   codes: that.data.codes
    // })
  },


  //买家留言
  inputMemo: function (e) {
    this.setData({
      memo: e.detail.value
    })
  },

  //选择是否使用积分
  clickUsePoint: function () {
    this.setData({
      usePoint: !this.data.usePoint
    })
    if (this.data.usePoint) {
      this.calcPointMoney(this.data.totalAmount, this.data.scoreMax)
    } else {
      this.calcPointMoney(this.data.totalAmount, 0)
    }
  },


  //付款输入积分
  userScoreInput(e) {
    let that = this;
    let val = parseInt(e.detail.value) ? parseInt(e.detail.value) : 0
    console.log(val > this.data.scoreMax)
    if (val > this.data.scoreMax) {
      this.setData({
        userScoreInput: this.data.scoreMax
      })
    } else {
      this.setData({
        userScoreInput: val
      })
    }

    this.calcPointMoney(this.data.totalAmount, this.data.userScoreInput ? this.data.userScoreInput : 0)

  },

  //输入积分，总价格换算
  calcPointMoney: function (totalAmount, scoreInput) {
    console.log(totalAmount + ',' + scoreInput)
    var that = this;
    //获取总积分
    new order(function (data) {
      //抵扣金额大于订单总额
      if (data.data.scoreMoney > totalAmount) {
        new order(function (cdata) {
          that.setData({
            userScoreInput: cdata.data.useBonus,
            trueAmount: 0,
            canTransMoney: totalAmount,
            canusePoint: cdata.data.useBonus
          })
        }).moneyConvert({
          useMoney: that.data.totalAmount
        })
      } else {
        new order(function (bdata) {
          if (bdata.data.useBonus > that.data.scoreMax) {
            that.setData({
              userScoreInput: scoreInput,
              trueAmount: that.data.totalAmount - data.data.scoreMoney,
              canTransMoney: data.data.scoreMoney,
              canusePoint: that.data.scoreMax
            })
          } else {
            that.setData({
              userScoreInput: scoreInput,
              trueAmount: that.data.totalAmount - data.data.scoreMoney,
              canTransMoney: data.data.scoreMoney,
              canusePoint: bdata.data.useBonus
            })
          }
        }).moneyConvert({
          useMoney: that.data.totalAmount
        })

      }
    }).calPoint({
      useScore: scoreInput
    })
  },

  //确认下单提交
  formSubmit: function (e) {
    var formId = e.detail.formId;
    var that = this;
    //同城快递提交订单
    if (!this.data.addressIsGet && this.data.getAddressCount) {
      setTimeout(() => {

        this.formSubmit(e)
        --this.data.getAddressCount
      }, 200)
      return
    }
    if (!this.data.receiver.id) {
      util.errShow('请选择收货地址');
    } else {
      wx.showLoading({
        title: '订单请求中',
        mask: true
      })
      new order(function (data) {
        if (that.data.totalAmount == '0') {
          wx.redirectTo({
            url: '/pages/pay/payZero?sn=' + data.data,
          })
        } else {
          new order(function (a) {
            new order(function (res) {
              wx.hideLoading()
              that.ActionsheetShow(Object.assign({}, res.data, {
                closeJump: '/pages/member/order/order?id=1',
                successJump: '/pages/pay/success'
              }))
            }).paymentView({
              sn: a.data
            })
          }).payment({ sn: data.data, formId: formId })
        }
      }).submit({
        addressId: that.data.orderInfo.address.id,
        userScore: that.data.userScoreInput
      })
    }
  }
}))
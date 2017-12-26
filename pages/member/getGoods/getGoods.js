var app = getApp();
var util = require("../../../utils/util.js");
var order = require('../../../service/order.js');
var cart = require('../../../service/cart.js');
var receiver = require('../../../service/receiver.js');
var getPwd = require('../../../utils/getPassword.js');
var password = require('../../../service/common.js');
// pages/member/getGoods/getGoods.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectData: {
      count: 0,
      name: '',
      num: 0
    },
    selectDataList: [],
    sum: 0,
    data: [],
    specifications: {},
    cartList: [],
    address: {},
    updateCartListFlag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new order(res => {
      this.setData({
        data: res.data.data,
        sum: res.data.sum,
        address: res.data.address
      })
    }).myEcoupons()
    this.getCartList().then(res => {

    })
  },
  //收货地址
  chooseAddress: function () {
    var that = this;
    try {
      wx.chooseAddress({
        success: function (res) {
          console.log(res)
          new receiver(function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
            new order(res => {
              that.setData({
                address: res.data.address
              })
            }).myEcoupons()
          }).save({
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            userName: res.userName,
            telNumber: res.telNumber,
            nationalCode: res.nationalCode,
            postalCode: res.postalCode
          })
        },
        fail: function (err) {
          if (err.errMsg.indexOf('auth') > -1) {
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
  getCartList() {
    return new Promise((resolve, reject) => {
      if (!this.data.updateCartListFlag) {
        resolve(this.data.cartList)
      }
      new cart(res => {
        this.data.updateCartListFlag = false
        wx.hideLoading()
        this.setData({
          cartList: res.cartList
        })
        resolve(res)
      }).list()
    })
  },
  updateCart(cid, count) {
    return new Promise((resolve, reject) => {
      // if (!this.data.address.id) {
      //   reject('未获取到地址信息')
      //   return
      // }
      new cart(res => {
        this.data.updateCartListFlag = true
        resolve(res)
      }).edit({
        id: cid,
        count: count,
        addressId: this.data.address ? this.data.address.id : null
      })
    })
  },
  getSpecifications(ecouponId) {
    return new Promise((resolve, reject) => {
      if (this.data.specifications[ecouponId]) {
        resolve(this.data.specifications[ecouponId])
      } else {
        new order(res => {
          this.data.specifications[ecouponId] = res.data[0].valueList
          this.setData({
            specifications: this.data.specifications
          })
          resolve(res.data[0].valueList)
        }).goodsAttribute({
          ecouponId: ecouponId
        })
      }
    })
  },

  checkout(e) {
    const { id, index } = e.currentTarget.dataset
    const selectData = this.data.selectData
    const cartList = this.data.cartList
    // for (let i = 0; i < cartList.length; i++) {
    //     if (cartList[i].id === id) {
    //
    //         break
    //     }
    // }
  },
  select: function (e) {
    const { id, ecouponsid, ecouponsname, count, name, ecouponstype } = e.currentTarget.dataset
    if (parseInt(count) === 0) {
      util.errShow("该类型暂无可提")
      return
    }
    this.getSpecifications(ecouponsid).then(sList => {
      const localSelect = this.data.cartList.filter(item => {
        return item.goods_specifition_ids == sList[0].id
      })
      this.setData({
        showAction: true,
        selectData: {
          count: count,//该类商品库存
          id: id,
          ecouponsid: ecouponsid,
          name: ecouponsname,
          num: [localSelect.length > 0 ? localSelect[0].number : 0],//已选数量，数组：每种规格的数量，用sSelect获取当前选中index
          ecouponstype: ecouponstype,
          specifications: sList,//规格列表
          specificationsSelect: 0,//当前选中规格
        }
      })
    })
  },

  //弹出框toggle
  toggleMask(e) {
    this.setData({
      showAction: !this.data.showAction,
      buyType: e.currentTarget.dataset.type,
      _swiper: this.data._swiper,
      selectData: {}
    })
  },

  revisenum(e) {
    let result, selectDataList = this.data.selectDataList, sum = 0
    const { btype, ltype, index } = e.currentTarget.dataset
    let { num, count, id, ecouponsid } = ltype ? this.data.selectDataList[index] : this.data.selectData
    for (let i = 0; i < selectDataList.length; i++) {
      if (id == selectDataList[i].id && ecouponsid == selectDataList[i].ecouponsid) {
        sum += parseInt(selectDataList[i].num)
      }
    }
    sum -= num
    count = count - sum
    switch (btype) {
      case 'reduce':
        result = num - 1
        break
      case 'input':
        result = e.detail.value
        break
      case 'add':
        result = num + 1
        break
      default:
        result = 0
    }
    if (result >= 0 && result <= count) {
      if (ltype) {
        this.data.selectDataList[index].num = result
        this.setData({
          selectDataList: this.data.selectDataList
        })
        return
      }
      this.setData({
        'selectData.num': result
      })
      return
    }
    ltype ? this.setData({
      selectDataList: this.data.selectDataList
    }) : this.setData({
      'selectData.num': num
    })
  },
  paySubmit() {

    //加入购物车
    new cart(function () {

    }).add({
      ecouponsType: 1,
      ecouponsId: 2,
      ecouponsCnt: 3,
      specificationId: 7,
      addressId: 16
    })
    // const selectData = this.data.selectData
    // const selectDataList = this.data.selectDataList || []
    // for (let i = 0; i < selectDataList.length; i++) {
    //   if (selectDataList[i].id == selectData.id && selectDataList[i].ecouponsid == selectData.ecouponsid) {
    //     let ssSelect = selectDataList[i].specificationsSelect
    //     let selectssSelect = selectData.specificationsSelect
    //     let sign = true
    //     for (let key in ssSelect) {
    //       if (selectssSelect[key].id != ssSelect[key].id) {
    //         sign = false
    //         break;
    //       }
    //     }
    //     if (sign) {
    //       selectDataList[i] = selectData
    //       this.setData({
    //         selectDataList: selectDataList,
    //         showAction: false
    //       })
    //       return
    //     }
    //   }
    // }
    // selectDataList.push(selectData)
    // this.setData({
    //   selectDataList: selectDataList,
    //   showAction: false
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(() => {
      this.updateCart(160, 10).then(res => {
        console.log(res)
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

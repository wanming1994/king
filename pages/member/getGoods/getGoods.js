var app = getApp();
var util = require("../../../utils/util.js");
var order = require('../../../service/order.js');
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
    specifications: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new order(res => {
      this.setData({
        data: res.data.data,
        sum: res.data.sum
      })
    }).myEcoupons()
  },
  checkout(e) {
    const { id, pid } = e.currentTarget.dataset
    const selectData = this.data.selectData
    const selectSpList = this.data.selectData.specifications
    for (let i = 0; i < selectSpList.length; i++) {
      if (selectSpList[i].specification_id == pid) {
        for (let j = 0; j < selectSpList[i].valueList.length; j++) {
          if (selectSpList[i].valueList[j].id == id) {
            selectData.specificationsSelect[pid] = selectSpList[i].valueList[j]
            this.setData({
              selectData: selectData
            })
            break;
          }
        }
      }
      break;
    }
  },
  select: function (e) {
    const { id, ecouponsid, ecouponsname, count, name, ecouponstype } = e.currentTarget.dataset
    // if (Number(count) === 0) {
    //   util.errShow("该类型暂无可提")
    //   return
    // }
    const localSelect = this.data.selectDataList.filter(item => {
      return item.id == id && item.ecouponsid == ecouponsid
    })
    this.getSpecifications(2).then(res => {
      this.setData({
        showAction: true,
        selectData: {
          count: count,
          id: id,
          ecouponsid: ecouponsid,
          name: ecouponsname,
          num: localSelect.length > 0 ? localSelect[0].num : 0,
          ecouponstype: ecouponstype,
          specifications: res,
          specificationsSelect: {
            [res[0].specification_id]: res[0].valueList[0]
          }
        },

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
    let result
    const { btype, ltype, index } = e.currentTarget.dataset
    let { num, count } = ltype ? this.data.selectDataList[index] : this.data.selectData
    num = Number(num)
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
    const selectData = this.data.selectData
    const selectDataList = this.data.selectDataList || []
    for (let i = 0; i < selectDataList.length; i++) {
      if (selectDataList[i].id == selectData.id && selectDataList[i].ecouponsid == selectData.ecouponsid) {
        let ssSelect = selectDataList[i].specificationsSelect
        let selectssSelect = selectData.specificationsSelect
        let sign = true
        for (let key in ssSelect) {
          if (selectssSelect[key].id != ssSelect[key].id) {
            sign = false
            break;
          }
        }
        if (sign) {
          selectDataList[i] = selectData
          this.setData({
            selectDataList: selectDataList,
            showAction: false
          })
          return
        }
      }
    }
    selectDataList.push(selectData)
    this.setData({
      selectDataList: selectDataList,
      showAction: false
    })
  },
  getSpecifications(ecouponId) {
    return new Promise((resolve, reject) => {
      if (this.data.specifications[ecouponId]) {
        resolve(this.data.specifications[ecouponId])
      } else {
        new order(res => {
          this.data.specifications[ecouponId] = res.data
          this.setData({
            specifications: this.data.specifications
          })
          resolve(res.data)
        }).goodsAttribute({
          ecouponId: ecouponId
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
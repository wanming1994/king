// pages/member/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  
  //收货地址
  chooseAddress: function () {
    try {
      wx.chooseAddress({
        success: function (res) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
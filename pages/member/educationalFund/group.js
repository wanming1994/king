// pages/member/educationalFund/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData: [
      'http://www.sincereglobe.com/IMAGE/pack/a1.png',
      'http://www.sincereglobe.com/IMAGE/pack/a2.png',
      'http://www.sincereglobe.com/IMAGE/pack/a3.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  previewImg(e) {
    var that = this
    var src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: that.data.imgData
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})
// pages/member/educationalFund/trainingCamp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg: false,
    imgData: [
      'http://www.sincereglobe.com/IMAGE/pack/1.png',
      'http://www.sincereglobe.com/IMAGE/pack/2.png',
      'http://www.sincereglobe.com/IMAGE/pack/3.png',
      'http://www.sincereglobe.com/IMAGE/pack/4.png',
      'http://www.sincereglobe.com/IMAGE/pack/5.png',
      'http://www.sincereglobe.com/IMAGE/pack/6.png',
      'http://www.sincereglobe.com/IMAGE/pack/7.png',
      'http://www.sincereglobe.com/IMAGE/pack/8.png',
      'http://www.sincereglobe.com/IMAGE/pack/9.png',
      'http://www.sincereglobe.com/IMAGE/pack/10.png',
      'http://www.sincereglobe.com/IMAGE/pack/11.png',
      'http://www.sincereglobe.com/IMAGE/pack/12.png'
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
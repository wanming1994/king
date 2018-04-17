// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasw: '',
    canvash: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          canvasw: res.windowWidth + 'px',
          canvash: res.windowHeight + 'px'
        })
      }
    })

    wx.downloadFile({
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523943597184&di=5c54b2edc9bcc715e54d38176aed20e9&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1633442614%2C1635146138%26fm%3D214%26gp%3D0.jpg',
      success: function (res) {
        var res3 = res.tempFilePath//小程序码
        console.log(res.tempFilePath, "bbbbbbb")
        wx.downloadFile({
          url: 'http://cdn.tiaohuo.com/upload/image/201707/e75ca5f6-3f14-463d-a8ee-9887f3e02ec9.png@262w_262h_1e_1c_100Q',
          success: function (res) {
            var res2 = res.tempFilePath//商品图片码
            wx.getSystemInfo({
              success: function (res) {
                var w = res.windowWidth;
                var h = res.windowHeight;
                const ctx = wx.createCanvasContext('myCanvas')
                ctx.setFillStyle('rgb(255, 255, 255)')
                ctx.fillRect(0, 0, w, h)
                ctx.drawImage(res2, (w - 180) / 2, 25, 180, 180)//商品图
                ctx.setTextAlign('center')
                ctx.setFillStyle('rgb(43, 43, 43)')
                ctx.setFontSize(18)
                ctx.fillText('测试是是his', w / 2, 230)
                ctx.setFillStyle('rgb(255, 0, 0)')
                ctx.setFontSize(18)
                ctx.fillText('￥85', w / 2, 255)
                ctx.drawImage(res3, (w - 110) / 2, 325, 110, 110)//小程序二维码
                ctx.setFillStyle('rgb(43, 43, 43)')
                ctx.setFontSize(14)
                ctx.fillText('扫码查看详情', w / 2, 450)
                ctx.draw();
              //  setTimeout(function(){
              //    wx.canvasToTempFilePath({
              //      //通过id 指定是哪个canvas
              //      canvasId: 'myCanvas',
              //      success(res) {
              //        //成功之后保存到本地
              //        console.log(res)
              //        wx.saveImageToPhotosAlbum({
              //          filePath: res.tempFilePath,
              //          success: function (res) {
              //            wx.showToast({
              //              title: '保存成功',
              //              icon: 'success',
              //              duration: 2000
              //            })
              //          },
              //          fail: function (res) {
              //            console.log(res)
              //          }
              //        })
              //      }
              //    })
              //  },3000)
              }, fail: function (e) {
                console.log(e)
              }
            })
          }
        })
      }
    });
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
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
            // var res2 = res.tempFilePath//商品图片码
            var res1 = '/resources/images/member/poster_bg.png'
            var res2 = '/resources/images/member/poster_bg2.png'
            wx.getSystemInfo({
              success: function (res) {
                var w = res.windowWidth;
                var h = res.windowHeight;
                const ctx = wx.createCanvasContext('myCanvas')
                ctx.setFillStyle('rgb(255, 255, 255)')
                ctx.fillRect(0, 0, w, h)
                ctx.drawImage(res1, 0, 0, w, h)//背景图大
                // ctx.drawImage(res2, 0.06 * w, 0.07 * h, 0.87 * w, 0.84 * h)//背景白色透明
                // ctx.drawImage(res3, 0.11 * w, 60, 0.77 * w, 0.59 * w)//580x440小图片

                // ctx.setTextAlign('center')
                // ctx.setFontSize(18)
                // ctx.setFillStyle('rgb(0, 0, 0)')
                // ctx.fillText('大王邀请您走向发家致富之路', w / 2, 0.59 * w + 90)

                ctx.save();
                ctx.beginPath()
                ctx.arc(0.12 * w + 0.15 * w / 2, 0.59 * w + 125 + 0.15 * w / 2, 0.15 * w / 2, 0, 2 * Math.PI);
                ctx.setStrokeStyle('#ffffff')
                ctx.clip();
                ctx.drawImage(res3, 0.12 * w, 0.59 * w + 125, 0.15 * w, 0.15 * w)//小程序二维码
                ctx.stroke();
                ctx.closePath();
                ctx.restore();

                ctx.setTextAlign('left')
                ctx.setFillStyle('rgb(43, 43, 43)')
                ctx.setFontSize(14)
                ctx.fillText('我是知晓', (w / 2) - 70, 0.59 * w + 140)
                ctx.setFillStyle('rgb(137, 110, 87)')
                ctx.setFontSize(16)
                ctx.fillText('邀请您加入大王', (w / 2) - 70, (w - 70) * 22 / 29 + 165)

                ctx.drawImage(res3, 0.23 * w, (w - 70) * 22 / 29 + 180, 0.24 * w, 0.24 * w)//小程序二维码
                // ctx.drawImage(res3, 0.54 * w, (w - 70) * 22 / 29 + 190, 0.28 * w, 0.28 * w)//小程序二维码

                ctx.draw();
                // setTimeout(function () {
                //   wx.canvasToTempFilePath({
                //     //通过id 指定是哪个canvas
                //     canvasId: 'myCanvas',
                //     success(res) {
                //       //成功之后保存到本地
                //       console.log(res)
                //       wx.saveImageToPhotosAlbum({
                //         filePath: res.tempFilePath,
                //         success: function (res) {
                //           wx.showToast({
                //             title: '保存成功',
                //             icon: 'success',
                //             duration: 2000
                //           })
                //         },
                //         fail: function (res) {
                //           console.log(res)
                //         }
                //       })
                //     }
                //   })
                // }, 5000)
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
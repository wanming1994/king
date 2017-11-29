

module.exports = {
  _adswiperimageload(e) {
    let screenWidth = wx.getSystemInfoSync().screenWidth
    let name = e.currentTarget.dataset.name
    let imageWidth = e.detail.width
    let imageHeight = e.detail.height
    let height = (screenWidth / imageWidth) * imageHeight
    let _swiper = this.data._swiper ? this.data._swiper : {}
    if (_swiper[name] && _swiper[name].height <= height){
      return 
    }
    _swiper[name] = {}
    _swiper[name].height = height
    this.setData({
      _swiper: _swiper
    })
  }
}
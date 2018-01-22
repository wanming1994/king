let Ajax = require('./ajax.js')

module.exports = class Member extends Ajax {
  /**
   * 登陆接口
   * @param String js_code wx.login获得
   * @param Number cid 1
   */
  login(data) {
    super.post({
      url: 'auth/login_by_weixin',
      hideErrorTip: true,
      data: data
    })
  }

  /**
   * 获取用户基本信息
   */
  view(data) {
    super.get({
      url: 'user/info',
      hideErrorTip: true,
      data: data
    })
  }

  /**
   * 更新用户基本信息
   */
  updateView(data) {
    super.get({
      url: 'user/update',
      hideErrorTip: true,
      data: data
    })
  }

  /**
 * 影响力接口
 */
  userRecommend(data) {
    super.get({
      url: 'user/userRecommend',
      hideErrorTip: true,
      data: data
    })
  }

  /**
   * 兑换订单
   */
  goodsexchange(data) {
    super.get({
      url: 'goodsexchange/list',
      hideErrorTip: true,
      data: data
    })
  }





  /**
   * 绑定手机号发送短信
   * @param:
   * mobile  手机号
   */
  sendMsgToBindPhone(data) {
    super.post({
      url: "user/smscode",
      data: data
    })
  }

  /**
   * 绑定手机号确定
   *  phone  和 smsCode
   */
  bindPhone(data) {
    super.post({
      url: "user/bindMobile",
      data: data
    })
  }


  /**
   * 获取推荐人
   *  recommendUserId
   */
  getUserName(data) {
    super.get({
      url: "user/getUserName",
      data: data
    })
  }

}
let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
  /**
   * 我的订单列表
   * tenantId 商家Id
   * type {unshipped 待发货, unpaid 待支付, unreciver 待签收, unreview 待评价}
   * pageSize 每页记录数
   * pageNumber 页码
   */
  list(data) {
    super.get({
      url: "applet/member/order/list.jhtml",
      data: data
    });
  }

  

  /**
   * 订单提交
   * 数量
   * 商品id
   */
  submit(data) {
    super.post({
      url: "order/submit",
      data: data
    });
  }

  /**
   * 积分价格换算
   * useScore 使用的分数
   */
  calPoint(data) {
    super.post({
      url: "user/bonusConvert",
      data: data
    });
  }

  /**
   * 发起支付
   * orderId, 订单id
   * userScore使用的分数
   */
  goPay(data) {
    super.post({
      url:"pay/pay_prepay",
      data: data
    });
  }

  /**
   * 商品提货
   * 
   */
  myEcoupons(data) {
    super.post({
      url: "ecoupons/myEcoupons",
      data: data
    });
  }


  



  /**
   * 订单明细
   * id 子订单Id
   */
  view(data) {
    super.get({
      url: "applet/member/order/view.jhtml",
      data: data,
      success: this.fn
    });
  }

  /**
   * 取消订单(未发货前)
   * id 子订单Id
   */
  refund(data) {
    super.post({
      url: 'applet/member/order/refund.jhtml?appid=' + config.APPID,
      data: data,
      success: this.fn,
      error: this.errorfn,
    });
  }

  /**
   * 退货
   * id 子订单Id
   */
  return(data) {
      super.post({
      url: 'applet/member/order/return.jhtml?appid='+config.APPID,
      data: data

    });
  }

  /**
   * 签收（买家）
   * id 子订单Id
   */
  confirm(data) {
    super.post({
      url: 'applet/member/order/confirm.jhtml',
      data: data
    });
  }

  /**
   * 提醒卖家发货/退货
   * id 子订单Id
   */
  remind(data) {
    super.post({
      url: 'applet/member/order/remind.jhtml',
      data: data,
      success: this.fn,
      error: this.errorfn,
    })
  }

  /**
   * 发起支付（单个子订单）
   * id 子订单Id
   */
  tradePayment(data) {
    super.post({
      url: '/applet/member/order/payment/' + data.id + '.jhtml?appid='+config.APPID,
      data: data

    });
  }

  /**
   * 提交支付
   * paymentPluginId  支付插件
   * sn 支付单号
   * enPassword
   */
  paymentSubmit(data) {
    super.post({
      url: 'applet/payment/submit.jhtml?appid='+config.APPID,
      data: data
    });
  }

  /**
   * 打开付款单,查看付款详情
   * sn 付款单号
   */
  paymentView(data) {
    super.post({
      url: 'applet/member/order/paymentView.jhtml',
      data: data
    })
  }

  /**
   * 确认订单页
   */
  confirmOrder(data) {
    super.get({
      url: 'applet/member/order/info.jhtml',
      data: data,
      hideErrorTip: true

    });
  }
  /**
   * 计算费用（确认订单页面选择配送方式、支付方式、优惠券后调用）
   * paymentMethodId 支付方式Id
   * shippingMethodId 配送方式Id
   * codes    优惠码（数组）
   */
  calculate(data) {
    super.post({
      url: 'applet/member/order/calculate.jhtml',
      data: data,
      traditional: true,
      success: this.fn
    });
  }
  /**
   * 检测邀请码是否合法
   * code 邀请码
   */
  inviteCode(data) {
    super.get({
      url: 'applet/member/invite_code.jhtml',
      data: data
    });
  }
  /**
   * 确认下单
   * receiverId 收货地址编号
   * paymentMethodId 支付方式编号
   * shippingMethodId 配送方式编号
   * memo 备注
   * extensionId 导购、分享者编号
   * deliveryCenterId 门店Id
   * codes 优惠码（数组）
   * deliveryCount 预计到店人数
   * deliveryDate 预计提货时间
   * name 姓名
   * mobile 手机号
   * captcha 验证码
   */
  create(data) {
    super.post({
      url: 'applet/member/order/create.jhtml',
      data: data
    });
  }

  /**
      * 发起支付--整单合并支付
      * sn 订单号
      */
  payment(data) {
    super.post({
      url: 'applet/member/order/payment.jhtml',
      data: data
    });
  }


  /**
  * 根据快递单号查询快递类型
  * num 快递单号
  */
  getType(data) {
    super.get({
      url: 'https://m.kuaidi100.com/autonumber/auto',
      data: data,
      hideErrorTip: true
    });
  }


  /**
    * 获取快递单号详细物流信息
    * type  快递类型
    * postid 快递单号
    */
  logistics(data) {
    super.get({
      url: 'https://m.kuaidi100.com/query',
      data: data,
      hideErrorTip: true
    });
  }



}
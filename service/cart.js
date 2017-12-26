let Ajax = require('./ajax.js')

module.exports = class Cart extends Ajax {
  /**
   * 购物车列表
   * tenantId 商家Id
   */
  list(data) {
    super.get({
      url: 'cart/getCart',
      data: data
    });
  }
  /**
   * 编辑数量
   * cid 购物项Id
   * count 数量
   * addressId 地址id
   */
  edit(data) {
    super.post({
      url: 'cart/update.jhtml',
      data: data
    });
  }

  /**
   * 添加至购物车
   * ecouponsType 
   * ecouponsId 
   * ecouponsCnt
   * specificationId
   * addreddId
   *
   */
  add(data) {
    super.post({
      url: 'cart/add',
      data: data
    });
  }

  /**
   * 添加至购物车2
   * id 商品Id
   *  数量
   */
  add2(data) {
    super.post({
      url: 'applet/cart/add2.jhtml',
      data: data
    });
  }
  /**
   * 搭配销售-立即购买
   * id 商品Id
   * quantity 数量
   */
  tieinsaleBuy(data) {
    super.post({
      url: 'applet/cart/tieinsale/buy.jhtml',
      data: data
    });
  }
  /**
   * 选择
   * ids 购物项Id(数组)
   * flag 是否选中
   */
  selected(data) {
    super.post({
      url: 'applet/cart/selected.jhtml',
      data: data,
      traditional: true
    });
  }
  /**
   * 删除
   * ids 购物项id(数组)
   */
  delete(data) {
    super.post({
      url: 'applet/cart/delete.jhtml',
      data: data,
      traditional: true
    });
  }
  /**
   * 删除
   * ids 商品id(数组)
   */
  del(data) {
    super.post({
      url: 'applet/cart/del.jhtml',
      data: data,
      traditional: true
    });
  }

  /**
   * 购物车商品数量
   * tenantId 商家Id
   */
  count(data) {
    super.get({
      url: 'applet/cart/count.jhtml',
      data: data
    })
  }
}
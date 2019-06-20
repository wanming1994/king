let Ajax = require('./ajax.js')

module.exports = class Education extends Ajax {
  /**
   * 获取同城广告
   * @param position 广告位Id
   */
  educationCategories() {
    super.get({
      url: "catalog/educationCategories"
    });
  }


}
const app = getApp();
const util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    item: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let item = JSON.parse(options.item);
    that.setData({
      item: item
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  signup: function(e) {
    let openid = wx.getStorageSync('openid');
    let sex='';
    if (app.globalData.userInfo.gender==1){
      sex='男'
    }else{
      sex='女'
    }
    let item = this.data.item
    util.getReq("userOperate/signUp", {
      openid: openid,
      sex: sex,
      itemId: item.itemId,
      version: item.version
    }, function(res) {
      if (res.code == '200') {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})
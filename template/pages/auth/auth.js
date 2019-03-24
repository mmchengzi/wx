const app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.encryptedData = e.detail.encryptedData;
      app.globalData.iv = e.detail.iv;
      let data=[];
      data.push({
        'avatar': app.globalData.userInfo.avatarUrl,
        'username': app.globalData.userInfo.nickName,
        'sex': app.globalData.userInfo.gender,
        'openid': wx.getStorageSync('openid'),
      })
      //保存用户信息
      util.postReq("user/update/", JSON.stringify(data), function (res) {
        that.setData({
          itemList: res.data
        })
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
});

//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const token = wx.getStorageSync('token');
    if (token) {
      wx.checkSession({
        success: function() {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        },
        fail: function() {
          login()
        }
      })
    } else {
      login()
    }

    function login() {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: 'http://masterchengzi.com:8083/travel-server/user/wxlogin',
              data: {
                code: res.code
              },
              success(res) {
                if (res.data.code == "200") {
                  let result = JSON.parse(res.data.data);
                  wx.setStorageSync('token', result.token)
                  wx.setStorageSync('openid', result.openid)
                  wx.redirectTo({
                    url: '/pages/index/index'
                  })
                } else {
                  console.log("获取token失败！")
                  wx.redirectTo({
                    url: '/pages/autu/autu'
                  })
                }

              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null,
    encryptedData: null,
    iv: null,
    bastUrl: 'http://masterchengzi.com:8083/travel-server/'
    //bastUrl: 'http://localhost:8085/'
  } 
})
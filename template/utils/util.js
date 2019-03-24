var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'token': null,
}

function getReq(url,data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  let token = wx.getStorageSync('token');
  if (token == null || token == '') {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
  header.token = wx.getStorageSync("token");
  console.log("header=="),
    console.log(header),
    wx.request({
      url: app.globalData.bastUrl + url,
      method: 'get',
    data: data,
      header: header,
      success: function(res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function() {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  let token = wx.getStorageSync('token');
  if (token == null || token == '') {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
  header.token = wx.getStorageSync("token");
  console.log("header=="),
    console.log(header),
    wx.request({
      url: app.globalData.bastUrl + url,
      header: header,
      data: data,
      method: 'post',
      success: function(res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function() {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
  formatTime: formatTime
}
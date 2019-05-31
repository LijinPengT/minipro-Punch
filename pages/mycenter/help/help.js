// pages/mycenter/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (e) {
    wx.showToast({
      title: '感谢您的建议',
    })
    let content = e.detail.value.textarea;
    wx.cloud.callFunction({
      name: 'submit',
      data: {
        content: content
      }
    }).then(res => {
      console.log(res)
      wx.navigateBack({
        delta: 1
      })
    })
  }
})
// pages/punch/punch-detail/punch-detail.js
Page({

  /**
   * 页面的初始数据
   */

    data: {
      startDate: '2019年5月29日',
      endDate: '2019年7月8日',
      punchDays: 10,
      leaveDays: 4,
      punchTimes: 14,
      leaveTimes: 0,
      dayStyle: [
        { month: 'current', day: new Date().getDate(), color: 'white', background: '#f25458' },
        { month: 'current', day: new Date().getDate(), color: 'white', background: '#f25458' }
      ],
    },
    // 给点击的日期设置一个背景颜色
    dayClick: function (event) {
      let clickDay = event.detail.day;
      console.log(event.detail.day)
      let changeDay = `dayStyle[1].day`;
      let changeBg = `dayStyle[1].background`;
      this.setData({
        [changeDay]: clickDay,
        [changeBg]: "#f25458"
      })
    },

  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
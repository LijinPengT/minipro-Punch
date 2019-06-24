// pages/punch/punch-detail/punch-detail.js
Page({

  /**
   * 页面的初始数据
   */

    data: {
      formData:{
        startDate:'',
        endDate: '',
        punchDays: '',
        leaveDays: '', 
        punchTimes: '',
        leaveTimes: ''
      },
      redDays:[12,23,11],
      dayStyle: [
        { month: 'current', day: 22, color: 'white', background: '#f25458' },
        { month: 'previous', day: 23, color: 'white', background: '#f25458' }
      ],
    },
    // 给点击的日期设置一个背景颜色
    dayClick: function (event) {
      let clickDay = event.detail.day;
      console.log(event.detail)
      console.log(clickDay)
      let changeDay = 'dayStyle[1].day';
      let changeBg = `dayStyle[1].background`;
      this.setData({
        [changeDay]: clickDay,
        [changeBg]: "#f25458"
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curruntMonth = Date().split(" ")[1];

    let dayStyle = [];
    let tag = {};
    let formData = this.data.formData;
    wx.getStorage({
      key: options.type,
      success: (res) => {
        tag = res.data[0];
        console.log(tag)
        //'jun 23',
        tag.punchDay.forEach(item=>{
          let day ={};
          let date = item.split(" ");
          date[0] === curruntMonth ? 
            day.month = 'current':
            day.month = 'previous';
          day.day = date[1];
          day.color = 'white';
          day.background = '#f25458';
          dayStyle.push(day); 
        })
        formData.startDate = tag.staringLine;
        formData.punchDays = tag.num;
        formData.punchTimes = tag.process;
        this.setData({
          formData: formData,
          dayStyle: dayStyle
        })
      },
    })
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
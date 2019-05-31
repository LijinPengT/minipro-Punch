// pages/mycenter/done/done.js
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneList:[
      {
        Day: '30天',
        head: '跑步'},
      {
        Day: '30天',
        head: '跑步'
      },
      {
        Day: '30天',
        head: '跑步'
      }
    ]
    ,
    con_height:0,
    con_width:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化界面
    var that = this;
    wx.getSystemInfo({
      success:function(res){
        console.log(res)
        let width = res.windowWidth;
        let height = res.windowHeight;
        that.setData({
          con_height:height,
          con_width:width
        })
      }
    })
  //获取完成事件
    // db.collection('punchs').doc
  },
  viewBindTap:function(){
    wx.navigateTo({
      url:'../../punch/punch-detail/punch-detail'
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
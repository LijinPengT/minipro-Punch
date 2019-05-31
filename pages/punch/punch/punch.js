// pages/punch/punch/punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIcon:[],
    icon:[{clas:'check',id:0,title:"word",             src:"../../../images/slices/word.png"},
          {clas:'check',id:1,title:"vagetable",              src:"../../../images/slices/vagetable.png"},
          {clas:'check',id:2,title:"shoe",             src:"../../../images/slices/shoe.png"},
          {clas:'check',id:3,title:"water",              src:"../../../images/slices/water.png"}
    ],
    gary:'gary',
    show:true,
    list:[
      { 
        id:0,
        punchImg:"../../../images/slices/punched.png",
        pro: "背单词30个",
        finishsrc: "../../../images/slices/finish.png",
        src:"../../../images/slices/word.png",
        today:'今日已成功打卡',
        num:'30'},

      { 
        id:1,
        punchImg:"../../../images/slices/punched.png",
        pro: "背单词30个",
         finishsrc: "../../../images/slices/finish.png",
         src: "../../../images/slices/word.png",
         today: '今日已成功打卡',
         num: '30' },

      { 
        id:2,
        punchImg:"../../../images/slices/punched.png",
        pro: "背单词30个",
         finishsrc: "../../../images/slices/finish.png",
         src: "../../../images/slices/word.png",
         today: '今日已成功打卡',
         num: '30' }
    ]
  },
  checked:function(e){
    var i = e.target.dataset.id;
    var list = this.data.icon;
    var selectIcon = this.data.selectIcon;
    selectIcon.unshift({src:list[i].src});
    list[i].clas=list[i].clas =="checked"?"check":"checked";
    this.setData({
      selectIcon:selectIcon,
      icon:list
    })

  },
  toShowNew:function(){

    var show = this.data.show;
    var that = this;
    this.setData({
      show:!show
    })
  },
  addNew:function(){
    var list =this.data.list;
    let i = list.length;
    let icon = this.data.selectIcon[0].src;
    list.push({
      id: i++,
      punchImg: "../../../images/slices/punched.png",
      pro: "背单词30个",
      finishsrc: "../../../images/slices/finish.png",
      src: icon,
      today: '今日已成功打卡',
      num: '30'
    })
    this.setData({
      list:list,
      selectIcon:[]
    })
  },
  changeIcon:function(e){
    var i = e.target.dataset.id;
    var srcList = this.data.list;
    var selectIcon = this.data.selectIcon;
    var icon = this.data.icon;
    
    console.log(icon)
    srcList[i].punchImg = srcList[i].finishsrc;
    this.setData({
      list:srcList,
      selectIcon:selectIcon
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goDetails:function(){
    wx.navigateTo({
      url: '/pages/punch/punch-detail/punch-detail',
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
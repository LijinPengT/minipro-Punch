// pages/punch/punch/punch.js
wx.cloud.init({
  env: 'ipunch-test-ya5fo'
})
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    //增加的标题
    days:'30',
    selectIcon:[],

    icon:[{clas:'check',id:0,name:"word",             src:"../../../images/slices/word.png"},
          {clas:'check',id:1,name:"vagetable",              src:"../../../images/slices/vagetable.png"},
          {clas:'check',id:2,name:"shoe",             src:"../../../images/slices/shoe.png"},
          {clas:'check',id:3,name:"water",              src:"../../../images/slices/water.png"},
          { clas: 'check', id: 4, name: "water", src: "../../../images/slices/flower.png" } ,
          { clas: 'check', id: 5, name: "water", src: "../../../images/slices/book.png" },
          { clas: 'check', id: 6, name: "water", src: "../../../images/slices/add.png" }
    ],
    gary:'gary',
    show:true,
    //界面滤镜
    progress:'0',
    //进度条
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
  //选择icon 动态
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
  //弹出框
  toShowNew:function(){
    var show = this.data.show;
    var that = this;
    this.setData({
      show:!show
    })
  },
  //添加 新的打卡   确认
  addNew:function(){
    var list =this.data.list;
    let i = list.length;
    let icon = this.data.selectIcon[0].src;
    list.push({
      id: i++,
      punchImg: "../../../images/slices/punched.png",
      pro: this.data.title,
      finishsrc: "../../../images/slices/finish.png",
      src: icon,
      today: '今日已成功打卡',
      num: this.data.days
    })
    this.setData({
      list:list,
      selectIcon:[]
    })
  },
  // 添加标题
  addtitle:function(e){
    var title = this.data.title;
    console.log(e.detail.value);
    this.setData({
      title:e.detail.value
    })
    console.log(this.data.title)

  },
  //添加天数
  adddays:function(e){
    var days = this.data.days;
    this.setData({
      days:e.detail.value
    })
  },
  //上传 打卡数据
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

  // 添加新的打卡数据到后台
  formSubmit: function(e) {
    let title = e.detail.value.title;
    let aimTims = e.detail.value.punchTims;
    let punchDays = e.detail.value.punchDays;
    let process = 0;
    let done = false;
    let startDate = new Date();
    let endDate = startDate.getDay() + aimTims;
    wx.cloud.callFunction({
      name: 'addPunchs',
      data: {
        title: title,
        aimTiems: aimTims,
        punchDays: punchDays,
        process: process,
        done: done,
        startDate: startDate,
        leftTimes: aimTims
      }
    }).then(res=>{
      console.log('success')
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
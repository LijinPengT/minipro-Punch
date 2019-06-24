// pages/punch/punch/punch.js
wx.cloud.init({
  env: 'ipunch-test-ya5fo'
})
const db = wx.cloud.database();
const util = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //打卡图标
    state: ["../../../images/slices/punched.png","../../../images/slices/finish.png"] ,
    //显示打卡添加
    show:true,
    gray:'gray',//css样式
    //新的打卡数据
    newTag:{
      title:'',
      days:'',
      times:'',
      icons: [
        { id: 0, name: "看书", src: "../../../images/slices/word.png", select: false },
        { id: 1, name: "减肥", src: "../../../images/slices/vagetable.png", select: false },
        { id: 2, name: "跑步", src: "../../../images/slices/shoe.png", select: false },
        { id: 3, name: "喝水", src: "../../../images/slices/water.png", select: false },
        { id: 4, name: "浇花", src: "../../../images/slices/flower.png", select: false },
        { id: 5, name: "日记", src: "../../../images/slices/book.png", select: false },
        { id: 6, name: "自定义", src: "../../../images/slices/add.png", select: false }
      ],
      singleIcon:''
    },
    //渲染打卡列表
    list:[
      
    ]
  },
  //弹出框
  toShowNew:function(){
    var show = this.data.show;
    var that = this;
    this.setData({
      show:!show
    })
  },
  
  //--------------------
  // 添加标题
  addtitle:function(e){
    let tag = this.data.newTag;
    tag.title = e.detail.value;
    this.setData({
      newTag:tag
    })
  },
  //添加天数
  adddays:function(e){
    let tag = this.data.newTag;
    tag.days = e.detail.value
    this.setData({
      newTag:tag
    })
  },
  //选择icon
  checked: function (e) {
    let i = e.target.dataset.id;
    console.log('图标索引' + i);
    let tag = this.data.newTag;
    tag.icons.forEach(item=>{ item.select = false; });
    tag.icons[i].select = true;
    tag.singleIcon = tag.icons[i].src;
    console.log(tag.singleIcon)
    this.setData({
      newTag:tag
    })
  },
  //添加 新的打卡   提交
  addNew: function () {
    let id = wx.getStorageSync('list').length;
    let tag = {
      id: id ? id : 0,
      title: this.data.newTag.title,
      punchImg: "../../../images/slices/punched.png",
      finishsrc: "../../../images/slices/finish.png",
      src: this.data.newTag.singleIcon,
      today: '今日未打卡',
      num: this.data.newTag.days,
      process: 0,
      stamp: "",
      done: false,
      staringLine: Date().split(" ")[2] + " " + Date().split(" ")[1],
      punchDay: []
    }
    util.updateListStorage(tag,null,this);
  },
  //打卡
  changeIcon:function(e){
    let i = e.target.dataset.id,
        list =  this.data.list,
        state = this.data.state;
    //点击后更改的   图标 并且不可以再次点击
    if(list[i].punchImg === state[0]){
       list[i].stamp = Date().split(" ")[2] ;
       list[i].punchImg = list[i].finishsrc ;
       list[i].process ++ ;
       list[i].punchDay.push(Date().split(" ")[1] + " " + Date().split(" ")[2]);
      //如果已完成
      if(list[i].process == list[i].num){
         list[i].today = "已完成";
         list[i].done = true;
      }else{
         list[i].today = "今日已打卡";
      };
      //更新界面
      util.updateListStorage(null,list,this);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let newList = [],
        done = [],
        list = wx.getStorageSync('list'),
        index = 0;
    list.forEach(item=>{
        if(item.done === false){
          newList.push(item);
          item.id = index++;
        }
        if(item.done === true){
          done.push(item);
        };
    })
    util.updateListStorage(null,newList,this)
    util.updateDoneStorage(done,this)
        //确认每一项今天是否可以打卡
        // list.forEach(item =>{
        //   if(item.today === "今日已打卡" &&
        //      item.stamp == Date().split(" ")[2]){
        //       item.punchImg = this.data.state[1];
        //     }else{
        //       item.today = "今日未打卡";
        //       item.punchImg = this.data.state[0] ;
        //   }
        // })
        // 更新界面
  },
  goDetails:function(e){
    let id  = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/punch/punch-detail/punch-detail?id=' + id + '&type=list' ,
    })
  },

  //表单提交事件
  formSubmit: function(e) {

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

  },
})
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
    
    icon:[{clas:'check',id:0,name:"看书",             src:"../../../images/slices/word.png"},
          {clas:'check',id:1,name:"减肥",              src:"../../../images/slices/vagetable.png"},
          {clas:'check',id:2,name:"跑步",             src:"../../../images/slices/shoe.png"},
          {clas:'check',id:3,name:"喝水",              src:"../../../images/slices/water.png"},
          {clas: 'check', id: 4, name: "浇花", src: "../../../images/slices/flower.png" } ,
          {clas: 'check', id: 5, name: "日记", src: "../../../images/slices/book.png" },
          {clas: 'check', id: 6, name: "自定义", src: "../../../images/slices/add.png" }
    ],
    show:true,
    //界面滤镜
    //渲染打卡列表
    list:[
      { 
        id:0,
        punchImg:"../../../images/slices/punched.png",
        pro: "背单词30个",
        finishsrc: "../../../images/slices/finish.png",
        src:"../../../images/slices/word.png",
        today:'今日已成功打卡',
        num:'30'
        }
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
    // var title = this.data.title;
    // console.log(e.detail.value);
    // this.setData({
    //   title:e.detail.value
    // })
  },
  //添加天数
  adddays:function(e){
    // var days = this.data.days;
    // this.setData({
    //   days:e.detail.value
    // })
  },
  //选择icon
  changeIcon:function(e){
    // var i = e.target.dataset.id;
    // var srcList = this.data.list;
    // var selectIcon = this.data.selectIcon;
    // var icon = this.data.icon;
    // console.log(icon)
    // srcList[i].punchImg = srcList[i].finishsrc;
    // this.setData({
    //   list:srcList,
    //   selectIcon:selectIcon
    // })
  },
  //选择icon
  checked: function (e) {
    var i = e.target.dataset.id;
    var list = this.data.icon;
    var selectIcon = this.data.selectIcon;
    selectIcon.unshift({ src: list[i].src });
    list[i].clas = list[i].clas == "checked" ? "check" : "checked";
    this.setData({
      selectIcon: selectIcon,
      icon: list
    })
  },
  //添加 新的打卡   提交
  addNew: function () {
    // var list = this.data.list;
    // let i = list.length;
    // let icon = this.data.selectIcon[0];
    // console.log(icon)
    // list.push({
    //   id: i++,
    //   punchImg: "../../../images/slices/punched.png",
    //   pro: this.data.title,
    //   finishsrc: "../../../images/slices/finish.png",
    //   src: "../../../images/slices/word.png",
    //   today: '今日未打卡',
    //   num: this.data.days
    // })
    // this.setData({
    //   list: list,
    //   selectIcon: []
    // })
  },
  //-----------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'openId',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          openId:res.data//用户标识
        })
        db.collection("punchs").where({
          
        }).get({
          success:(result)=>{
            console.log(result)
            this.setData({
              list:result.data
            })
          }
        })
      },
    });
    console.log(this.data.list)
  },
  goDetails:function(){
    wx.navigateTo({
      url: '/pages/punch/punch-detail/punch-detail',
    })
  },

  // 添加新的打卡数据到本地
  formSubmit: function(e) {
    console.log(e)
    console.log(this.data.title)
    
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
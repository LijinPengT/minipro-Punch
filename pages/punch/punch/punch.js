// pages/punch/punch/punch.js
wx.cloud.init({
  env: 'ipunch-test-ya5fo'
})
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //打卡图标
    state: ["../../../images/slices/punched.png",             "../../../images/slices/finish.png"] ,
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
      
    ],
    touchMove:{
      
    }
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
    console.log(e.detail.value);
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
  changeIcon:function(e){
    let i = e.target.dataset.id,
        list =  this.data.list,//数据模型
        state = "../../../images/slices/punched.png";
    //点击后更改的   图标 并且不可以再次点击
    if(list[i].punchImg === state){
      list[i].stamp = Date().split(" ")[2] ;
      list[i].punchImg = list[i].finishsrc ;
      list[i].process ++ ;
      //如果已完成
      if(list[i].process == list[i].num){
        list[i].today = "已完成";
        list[i].done = true;
      }else{
        list[i].today = "今日已打卡";
      };
      this.setData({//渲染页面
        list : list
      });
      //更改本地存储
      wx.setStorage({
        key: 'list',
        data: list,
      })
    }
    //             进度
    //             今日未打卡 变为 今日已成功打卡
    //             设置时间戳getDate()
    //直接更改本地的process  再重新渲染
    // wx.getStorage({
    //   key: 'list',
    //   success: (res) =>{
    //     res.data[i].process++;
    //     this.setData({
    //       list:res.data
    //     });
    //   },
    // })
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
    let i = e.target.dataset.id;
    console.log('图标索引' + i);
    let tag = this.data.newTag;
    //选中图标---
    tag.icons.forEach(item=>{ item.select = false; });
    tag.icons[i].select = true;
    tag.singleIcon = tag.icons[i].src;
    console.log(tag.singleIcon)
    //选中图标---
    //添加图标
    this.setData({
      newTag:tag
    })
  },
  //添加 新的打卡   提交
  addNew: function () {
    let list = this.data.list;
    let tag = this.data.newTag;

    console.log(list)
    console.log(this.data.list)
    //将新的打卡添加到原有列表
    list.push({
      id: list.length,
      title: tag.title,
      punchImg: "../../../images/slices/punched.png",
      finishsrc: "../../../images/slices/finish.png",
      src: tag.singleIcon,
      today: '今日未打卡',
      num: tag.days,
      process:0,
      stamp:""
    })
    this.setData({
      list:list
    })
    //本地数据
    wx.setStorage({
      key: 'list',
      data: this.data.list,
    })
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
    let index = 0;
    //获取之前的本地打卡
    wx.getStorage({//页面加载时看到已完成添加到done
      key: 'list',
      success: (res)=> {
        // -----
        res.data.forEach(item => {
          if(item.done === true){
            // done.push(item);//已完成添加
            res.data.splice(item.id,1);//删除此项
          }
        })
        // -----
        //确认每一项今天是否可以打卡
        res.data.forEach(item =>{
          item.id = index++;
          if(item.today === "今日已打卡" &&
             item.stamp == Date().split(" ")[2]){
             item.punchImg = this.data.state[1];
          }else{
             item.today = "今日未打卡";
             item.punchImg = this.data.state[0] ;
          }
        })
        // 更新本地
        // wx.setStorage({
        //   key: 'list',
        //   data: res.data,
        // })
        // 更新列表
        this.setData({
          list : res.data
        })
      },
    });
    
    // wx.getStorage({
    //   key: 'openId',
    //   success: (res)=> {
    //     console.log(res.data)
    //     this.setData({
    //       openId:res.data//用户标识
    //     })
    //     db.collection("punchs").where({
          
    //     }).get({
    //       success:(result)=>{
    //         console.log(result)
    //         this.setData({
    //           list:result.data
    //         })
    //       }
    //     })
    //   },
    // });

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
    console.log(this.data.list[0])
    
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
//index.js
//获取应用实例
const app = getApp();
const db = wx.cloud.database()
Page({
  data: {
    i:0,
    show:true,
    pendList: [
      {
        i:0,
        content: '准备每'
      },
      {
        i:1,
        content: '跑步2公里'
      },
      {
        i:2,
        content: '跑步2公里'
      },
      {
        i:3,
        content: '跑步2公里'
      }
    ],
    bgBar: 'bgBar',
    punchedBar: 'punchedBar'
  },
  onLoad: function(){

    let openId = wx.getStorageSync("openId");
    // console.info(openId);
    db.collection('todos').where({
      open_id: openId
    }).get({
      success:res=>{
        console.log(res.data);
        for(let i = 0; i < res.data.length;i++){
          res.data[i].content = res.data[i].things[0].content
          console.log(res.data[i].things[0].content)
        }

        this.setData({
          pendList:res.data
        })
      }
    })
  },
  getContent:function(e){
    console.log(e.detail.value)
  },
  toShow:function(){
    //点击事件
    var List = this.data.pendList;
    List.unshift({content:'未定义',i:0})
    console.log(List)
    this.setData({
      pendList:List
    })
  },
  commitValue:function(e){
    var i = e.target.dataset.id;
    console.log(i)
    var List = this.data.pendList;
    console.log(List)
    // List[i].content = e.detail.value;
    this.setData({
        pendList:List
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'addTodos',
      // 传给云函数的参数
      data: {
        things: this.data.pendList
      },
    })
      .then(res => {
        console.log(this.data.pendList) // 3
      })
      .catch(console.error)
    
  }
})
  


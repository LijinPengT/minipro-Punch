//index.js
//获取应用实例
const app = getApp()

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
  onLoad: function (options) {
    var List = this.data.pendList;
    var i = List.length;
    console.log(i);
    this.setData({
      i:i
    })
  },
  getContent:function(e){
    console.log(e.detail.value)
  },
  toShow:function(){
    var List = this.data.pendList;
    for(let j =0;j<List.length;j++){
      List[j].i = List[j].i+1
      console.log(List[j])
    }
    List.unshift({content:'未定义',i:0})
    console.log(List)
    this.setData({
      pendList:List
    })
  },
  commitValue:function(e){
    var i = e.target.dataset.id;
    var List = this.data.pendList;
    for(let i = 0; i<List.length;i++){
      let j = List[i].i
      List[i].i = j++
    }
    console.log(List)
    console.log(e.detail.value)
    List[i].content=e.detail.value;
    // List[i].content = e.detail.value;
    this.setData({
        pendList:List
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name:"addTodos",
      data:{
        things:e.detail.value
      },
      success:function(res){
        console.log(res.result)
      }
    })
    wx.cloud.callFunction({
      name: "todos",
      // data: {
      //   things: e.detail.value
      // },
      success: function (res) {
        console.log(res.result)
      }
    })
  }
})
  


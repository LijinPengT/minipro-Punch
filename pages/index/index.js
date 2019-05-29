//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show:true,
    pendList: [
      {
        content: '准备每'
      },
      {
        content: '跑步2公里'
      },
      {
        content: '跑步2公里'
      },
      {
        content: '跑步2公里'
      },
      {
        content: '跑步2公里'
        
      },
      {
        content: '跑步2公里'
      }
    ],
    bgBar: 'bgBar',
    punchedBar: 'punchedBar'
  },
  select: function(e) {
    console.log(e)
    this.setData({
    })
  },
  toShow:function(){
    var List = this.data.pendList;
    List.unshift({content:'未定义'})
    this.setData({
      pendList:List
    })
  }
})
  


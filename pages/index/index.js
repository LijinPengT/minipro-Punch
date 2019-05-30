//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    i:0,
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
  select: function(e) {
    console.log(e)
    this.setData({
    })
  },
  toShow:function(){
    var List = this.data.pendList;
    List.unshift({content:'未定义'})
    console.log(List);
    console.log(this.data.pendList);
    this.setData({
      pendList:List
    })
  },
  commitValue:function(event){
    console.log(event.detail.value)
    var List = this.data.pendList;
    List.unshift(
      {content:event.detail.value}
    )
    this.setData({
      pendList:List
    })
  }
})
  


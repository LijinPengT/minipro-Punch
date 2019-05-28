//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pendList: [
      {
        id: 1,
        content: '准备每天跑步',
      },
      {
        id: 2,
        content: '跑步2公里',
      },
      {
        id: 3,
        content: '跑步2公里',
     
      },
      {
        id: 3,
        content: '跑步2公里',
      },
      {
        id: 3,
        content: '跑步2公里',
      },
      {
        id: 3,
        content: '跑步2公里',
      },
      {
        id: 3,
        content: '跑步2公里',
        
      },
      {
        id: 3,
        content: '跑步2公里',
      }
    ],
    bgBar: 'bgBar',
    punchedBar: 'punchedBar'
  },
  select: function(e) {
    console.log(e)
    this.setData({
      
    })
  }
})
  


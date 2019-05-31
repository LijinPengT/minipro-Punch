//index.js
//获取应用实例
const app = getApp();
const db = wx.cloud.database()
Page({
  data: {
    hidden:true,
    newtip:'',
    i:0,
    show:true,
    pendList: [
    ],
    form_value:'',
    bgBar: 'bgBar',
    punchedBar: 'punchedBar'
  },
  onLoad: function(){
    this.findData();
  },
  //提交事件
  // 按钮确认
  submit:function(){
    let value = this.data.newtip;
    if(value !== ''){
      db.collection('todos').add({
        data: {
          things: value,
        },
        success:function(res){
          console.log(res)
        }
      })
      this.setData({
        hidden: true
      })
      this.findData();
    }
  },
  //按钮取消
  cancle:function(){
    this.setData({
      hidden:true,
      newtip:''
    })
    console.log(this.data.newtip)
  },
  //失去焦点
  getContent:function(e){
    let value  = e.detail.value;
    
    this.setData({
      newtip:value
    })
    console.log(this.data.newtip);
  },
  toShow:function(){
    //点击事件
    let hidden = false;
    this.setData({
      hidden:hidden
    })
  },
  findData: function(){
    let openId = wx.getStorageSync("openId");
    // console.info(openId);
    db.collection('todos').where({
      _openid: openId
    }).get({
      success: res => {
        console.log(res.data);
        let reverse = []
        for(let i = 0;i<res.data.length;i++){
          reverse.unshift(res.data[i])
        }
        this.setData({
          pendList: reverse
        })

        // for(let i = 0; i < res.data.length;i++){
        //   res.data[i].content = res.data[i].things[0].content
        // }
        // this.setData({
        //   pendList:res.data
        // })
      }
    });
  },
  //失去焦点
  // commitValue:function(e){
  //   console.info(e);
  //   if(e.detail.value == "")return;
  //   var i = e.target.dataset.id;
  //   console.log(i)
  //   var List = this.data.pendList;
  //   console.log(List)
  //   this.setData({
  //     pendList:List
  //   });
    
  //   db.collection('todos').add({
  //     // data 字段表示需新增的 JSON 数据
  //     data: {
  //       things:e.detail.value
  //     },
  //     success: function (res) {
  //       let data = this.data.pendList;
  //       data.push({
  //         '_id':res._id,
  //         'things':e.detail.value
  //       });
  //       this.setData({
  //         pendList:data
  //       })
  //       // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //       console.log(res)
  //     }
    // });
  // }
  
})
  


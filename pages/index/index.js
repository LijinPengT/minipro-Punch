
//index.js
//获取应用实例
const app = getApp();
const db = wx.cloud.database()
Page({
  data: {
    //删除的数据
    deletId:'',
    //
    hidden:true,
    con_height:500,
    con_width:300,
    //窗口宽高
    hidden:true,
    newtip:'',
    i:0,
    // 实现触摸
    startX:'',//触摸开始的位置
    // 滑动限度
    limitM:'',
    //移动更改样式
    left:'50%',
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
  //获取数据
  findData: function(){
    let openId = wx.getStorageSync("openId");
    // console.info(openId);
    db.collection('todos').where({
      _openid: openId
    }).get({
      success: res => {
        console.log(res.data);
        // for(let j = 0;j<res.data.length;j++){
        //   res.data[j].index = j
        // }

        let reverse = []
        for(let i = 0;i<res.data.length;i++){
          reverse.unshift(res.data[i])
        }
        let i =0;
        reverse.forEach(item=>{
          item.index = i++
        })
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
  // 滑动开始
  touchS:function(e){
    if(e.touches.length == 1){

      this.setData({

        startX: e.touches[0].clientX
        //获取触摸起始位置
      })
    }
  },
  touchM:function(e){
    if (e.touches.length == 1) {
      
      var moveX = e.touches[0].clientX;//滑动到此位置
      var disX = this.data.startX - moveX;//插值判断，小于0则向右
      var left = this.data.left;
      var list = this.data.pendList;
      if(disX > 0){
        left = -disX + 'px';
        console.log(left);
        var i = e.currentTarget.dataset.index;
        console.log(i)
        console.log(list[i])
        let _id = list[i]._id;
        list[i].slide = left;
        this.setData({
          pendList: list,
          deletId:_id
        })
      }
    }
    
  },
  touchE:function(e){
    if (e.changedTouches.length == 1) {
      let id = this.data.deletId;
      //判断位置
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      //获取列表
      let i = e.currentTarget.dataset.index;//查找元素
      console.log(i)
      let list = this.data.pendList;
      //
      if(disX > 100 ){
        list.splice(i,1)
        db.collection('todos').doc(id).remove({
          success:()=>{
            // console.log('suc')
          }
        })
        let index = 0;
        list.forEach(item => {
          item.index = index++
          item.slide='0%'
        })
      }else{
        let index = 0;
        list.forEach(item => {
          item.index = index++
          item.slide = '0%'
        })
        this.setData({
          deletId:''
        })
      }
      this.setData({
        pendList:list
      })
    }
  }
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
  


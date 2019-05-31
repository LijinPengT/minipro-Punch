//index.js
//获取应用实例
const app = getApp();
const db = wx.cloud.database()
Page({
  data: {
    i:0,
    show:true,
    pendList: [
    ],
    bgBar: 'bgBar',
    punchedBar: 'punchedBar'
  },
  onLoad: function(){
    this.findData();
  },
  getContent:function(e){
    console.log(e.detail.value)
  },
  toShow:function(){
    //点击事件
    var List = this.data.pendList;
    List.unshift({
      content:'请输入'
    })
    for(let j = 0; j<List.length;j++){
      List[j].i = j
    }
    this.setData({
      pendList:List
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
        this.setData({
          pendList: res.data
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
  commitValue:function(e){
    console.info(e);
    if(e.detail.value == "")return;
    var i = e.target.dataset.id;
    console.log(i)
    var List = this.data.pendList;
    console.log(List)
    this.setData({
      pendList:List
    });
    
    db.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        things:e.detail.value
      },
      success: function (res) {
        let data = this.data.pendList;
        data.push({
          '_id':res._id,
          'things':e.detail.value
        });
        this.setData({
          pendList:data
        })
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    });
  }
  
})
  


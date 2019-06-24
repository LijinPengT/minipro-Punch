const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//更新仓库--->渲染界面
let updateListStorage = (tag,list,self) => {
  wx.getStorage({
    key: 'list',
    success: (res) =>{
      if(list){ 
        wx.setStorageSync('list',list);
        self.setData({ list:list });
      }
      if(tag){ 
        let newList = res.data;
        newList.push(tag); 
        wx.setStorageSync('list', newList);
        self.setData({ list:newList });
      };
    },
    fail: (res)=> {
      if (res = "getStorage:fail data not found"){
        wx.setStorageSync('list', [tag]);
        self.setData({ list:[tag] });
      };
    }
  })
};
//更新已完成的仓库 ---> 渲染界面
let updateDoneStorage = (done,self)=>{
  wx.getStorage({
    key:'done',
    success:(res)=>{
      console.log(res.data)
      done.forEach(item => {
        res.data.push(item)
      });
      wx.setStorageSync('done',res.data);
    },
    fail:(res)=>{
      if(res = "getStorage:fail data not found"){
        wx.setStorageSync('done',done);
      }
    }
  })
}
module.exports = {
  formatTime: formatTime,
  updateListStorage:updateListStorage,
  updateDoneStorage:updateDoneStorage
}

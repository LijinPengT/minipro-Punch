// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'ipunch-test-ya5fo'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let open_id = wxContext.OPENID;
  let form = db.collection('feedBack');

  return form.add({
    data: {
      open_id: open_id,
      content: event.content
    }
  })
}
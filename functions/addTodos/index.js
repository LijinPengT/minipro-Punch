// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'ipunch-test'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('todos').add({
    data: {
      open_id: wxContext.OPENID,
      things: event.things
    }
  })
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'ipunch-test-ya5fo'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let punchs = db.collection('punchs');
  return await punchs.add({
    data: {
      open_id: wxContext.OPENID,
      title: event.title,
      aimTimes: event.punchTimes,
      punchDays: event.punchDays,
      done: event.done,
      process: event.process,
      startDate: event.startDate,
      endDate: event.endDate

    }
  })
  
}
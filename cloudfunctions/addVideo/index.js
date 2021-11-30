// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid= wxContext.OPENID
  return await db.collection("publish").add({
    data:{
      _openid: openid,
      title:event.title,
      text:event.text,
      time:event.time,
      url:event.fileID,

    }
  })
}
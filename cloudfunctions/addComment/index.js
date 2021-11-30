// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

    return await db.collection("comment").add({
    data:{
      videoid:event.videoid,
      pinglun:event.pinglun,
      _openid:wxContext.OPENID,
      time: event.time,
    }
    })

 
   



}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var count=await db.collection("dianzhan").where({
    _openid:openid,
    videoid:event.videoid
  }).count()
  if(count.total){
    return await db.collection("dianzhan").where({
      _openid:openid,
      videoid:event.videoid
    }).remove()
  }else{
    return await db.collection("dianzhan").add({
      data:{
        videoid:event.videoid,
        _openid:openid
      }
    })
  }


 
}
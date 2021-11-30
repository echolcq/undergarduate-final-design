// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var colist= await db.collection("comment").where({
    videoid:event.videoid
  }).orderBy('time', 'desc').get()

  var task = []
  for (let i = 0; i < colist.data.length; i++) {
    var promise = await db.collection('users').where({
      _openid: colist.data[i]._openid
    }).get()
    task.push(promise)
  }
  var userinfo = (await Promise.all(task)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })


  var count=await db.collection("comment").where({
    videoid:event.videoid
  }).count()
  var num=count.total

  return{
    colist,
    num,
    userinfo
  }


}
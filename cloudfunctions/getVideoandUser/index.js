// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
//const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async(event, context) => {
  const openid=cloud.getWXContext().OPENID
  // 先取出集合记录总数
  //const countResult = await db.collection('publish').count()
  //const total = countResult.total
  // 计算需分几次取
  //const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  var videoinfo = await db.collection('publish').orderBy('time', 'desc').get()
  //const promise = db.collection('publish').orderBy('time', 'desc').get()
  /*const videoinfo = (await Promise.all(promise)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })*/

  const tasks2 = []
  for (let i = 0; i < videoinfo.data.length; i++) {
    const promise2 = await db.collection('users').where({
      _openid: videoinfo.data[i]._openid
    }).get()
    tasks2.push(promise2)

    var count=await db.collection("dianzhan").where({
      _openid:openid,
      videoid:videoinfo.data[i]._id
    }).count()
    var likecount=await db.collection("dianzhan").where({
      videoid:videoinfo.data[i]._id
    }).count()
    videoinfo.data[i].likecount=likecount.total
    if(count.total){
      videoinfo.data[i].isZan=true
    }else{
      videoinfo.data[i].isZan=false
    }

    /*var cocount=await db.collection("comment").where({
      videoid:videoinfo.data[i]._id
    }).count()
    videoinfo.data[i].conum=cocount.total*/
  }

  var userinfo = (await Promise.all(tasks2)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })


  // 等待所有
  return {
    videoinfo,
    userinfo
  }
}
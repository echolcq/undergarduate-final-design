// pages/my/my.js
const db=wx.cloud.database();
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile:function(event){
    //获取userInfo
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res.userInfo)
        console.log(res.userInfo.nickName)
        wx.setStorageSync('userInfo', res.userInfo)        
      }
    })
    var temp=wx.getStorageSync("userInfo")
    //获取openid且存入数据库
    wx.cloud.callFunction({
      name:'login'
    }).then((res)=>{
      console.log(res)
      wx.setStorageSync('openid', res.result.openid)
      db.collection('users').where({
        _openid:res.result.openid
      }).get().then(re=>{
        if(re.data.length>0){
          console.log(re.data.length)
        }else{
          console.log(re.data.length)
          //var temp=wx.getStorageSync("userInfo")
          db.collection('users').add({
            data:{
              //openid:wx.getStorageSync("openid"),
              nickname:temp.nickName,
              url:temp.avatarUrl,
            }
          }).then(respo => {
            console.log(respo)
          })         
        }
      })
    })
    this.setData({
      userinfo:temp,
      hasUserInfo: true,
    })
    app.globalData.userinfo=temp,
    app.globalData.logged=true,
    app.globalData.userId=wx.getStorageSync('openid')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
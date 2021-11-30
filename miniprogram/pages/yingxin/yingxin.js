// pages/yingxin/yingxin.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbanners:[],
    menu:[],
    videoshouye:[]
    //videosrc:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("topbanners").get().then(res=>{
      //console.log(res.data)
      this.setData({
        topbanners:res.data
      })
    })

    db.collection("menu").get().then(res=>{
      //console.log(res.data)
      this.setData({
        menu:res.data
      })
    })

    db.collection("videoshouye").get().then(res=>{      
      this.setData({
        videoshouye:res.data,
      })
      //console.log(this.data.videoshouye)
    }) 
  },

  goTo: function (e) {
    var self = this
    console.log(e)
    var target = e.currentTarget.dataset.index
    console.log(target)
    self.setData({
      animation: target
    })
    wx.navigateTo({
      url: target + '/' + target,
    })
    setTimeout(function() {
      self.setData({
        animation: ''
      })
    }, 1000)
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
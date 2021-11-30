// pages/edit/edit.js
// 输入文字最大的个数
var util=require('../../utils/util.js')
const MAX_WORDS_NUM = 10
const app=getApp()
var fileID=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0,
    footerBottom: 0,
    src:'',
    title:"",
    text:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onInput(event) {
    console.log(event.detail.value)
    let wordsNum = event.detail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum,
      title:event.detail.value,
    })
   
  },
  input(event){

    this.setData({
      text:event.detail.value
    })
  },

  onFocus(event) {
    // 模拟器获取的键盘高度为0
    console.log(event)
    this.setData({
      footerBottom: event.detail.height,
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0,
    })
  },

  chooseVideo:function(event){
    console.log(event)
    wx.chooseVideo({
      sourceType: ['album','camera'],
      //maxDuration: 180,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        wx.cloud.uploadFile({
          cloudPath: 'video/'+ Math.random() * 100 + '.mp4',
          filePath: res.tempFilePath, // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            fileID=res.fileID
          },
          fail: err => {
            console.log(err.errMsg)
          }
        })

      }
    })

  },

  send() {
    // 2、数据 -> 云数据库
    // 数据库：内容、视频、openid、昵称、头像、时间
    // 1、视频 -> 云存储 fileID 云文件ID
    var t=this.data.title

    if (t.trim() === '') {
      wx.showModal({
        title: '请输入标题',
        content: '',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
      mask: true,
    })
    wx.cloud.callFunction({
      name:'addVideo',
      data:{
        
        time:util.formatTime(new Date()),   
        title:this.data.title,
        text:this.data.text,
        fileID:fileID,
      },
      success: function(res) {
        console.log(res) 
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        wx.navigateBack()
      },
      fail: function(res) {
        console.log(res.errMsg)
        wx.hideLoading()
        wx.showToast({
          title: '发布失败',
        })
      }
    })



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
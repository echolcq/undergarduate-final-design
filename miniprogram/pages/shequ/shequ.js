// pages/shequ/shequ.js
var util=require('../../utils/util.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeIndex: 0,
    windowHeight:0,
    videoinfo:{},
    userinfo:{},
    zan1:"../../images/yizan.png",
    zan2:"../../images/weizan.png",
    modalShow:false,
    colist:{},
    pinguser:{},
    pingnum:0



  },
  //划动切换
 slide(e) {
  this.setData({
   changeIndex: e.detail.current,
   modalShow:false,
  })
  console.log(e.detail.current)
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*db.collection("comment").where({
      videoid:"28ee4e3e608bbf8f13d056515a4b1c1a"
    }).orderBy('time', 'desc').get().then(res=>{
      console.log(res)
    })*/
    //console.log(util.formatTime(new Date()))
    console.log(app.globalData.logged)
    console.log(app.globalData.userId)
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowHeight:result.windowHeight
        })
      }
    })

    self = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getVideoandUser',
      data: {},
      success: function(res) {
        wx.hideLoading()
        console.log(res.result)
        self.setData({
          videoinfo: res.result.videoinfo.data,
          userinfo: res.result.userinfo.data,
        })
        //console.log(self.data.videoinfo[self.data.changeIndex])
      },
      fail: function(res) {
        wx.hideLoading()
        console.log(res.errMsg)
      }
    })

    /*if(app.globalData.logged==true){
      wx.cloud.callFunction({
        name: 'isDianZan',
        data: {
          _openid: app.globalData.userId
        },
        success: function(res) {
          console.log(res)
          self.setData({
            isHaveZan: res.result.videoinfo.data,
          })
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
          
      })
    }*/


  },

  dianzan:function(event){
    self=this
    console.log(event)
    if(app.globalData.logged==false){
      wx.switchTab({
        url: '../my/my',
      })
    }else{
      wx.cloud.callFunction({
        name: 'addzan',
        data: {
          videoid:event.currentTarget.dataset.videoid
        },
        success: function(res) {        
          console.log(res) 
          wx.cloud.callFunction({
            name: 'getVideoandUser',
            data: {},
            success: function(res) {
              console.log(res.result)
              self.setData({
                videoinfo: res.result.videoinfo.data,
              })
              //console.log(self.data.videoinfo[self.data.changeIndex])
            },
            fail: function(res) {
              console.log(res.errMsg)
            }
          })       
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    }
  },

  get_comment:function(event){
    self=this
    console.log(event.currentTarget.dataset.videoid)
    if(app.globalData.logged==true){
      console.log(app.globalData.userinfo)
      this.setData({
        modalShow:true
      })
        wx.cloud.callFunction({
        name: 'getComment',
        data: {
          videoid:event.currentTarget.dataset.videoid
        },
        success: function(res) {
          console.log(res.result) 
          self.setData({
            colist: res.result.colist.data,
            pinguser: res.result.userinfo.data,
            pingnum: res.result.num
          })      
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })    
    }else{
      wx.switchTab({
        url: '../my/my',
      })
    }
  },

  onSend:function(event){
    console.log(event)
    var pinglun=event.detail.value.content
    if (pinglun.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: '',
      })
      return
    }
      wx.cloud.callFunction({
        name: 'addComment',
        data: {
          videoid:event.currentTarget.dataset.videoid,
          pinglun:pinglun, 
          time:util.formatTime(new Date()),    
        },
        success: function(res) {
          console.log(res) 
           wx.cloud.callFunction({
            name: 'getComment',
            data: {
              videoid:event.currentTarget.dataset.videoid
            },
            success: function(res) {
              console.log(res.result) 
              self.setData({
                colist: res.result.colist.data,
                pinguser: res.result.userinfo.data,
                pingnum: res.result.num
              })      
            },
            fail: function(res) {
              console.log(res.errMsg)
            }
          })  
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    
  },

  edit:function(event){
   if(app.globalData.logged==true){
    wx.navigateTo({
      url: '../edit/edit',
    })
   } else{
    wx.switchTab({
      url: '../my/my',
    })
   }
 

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
    self = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getVideoandUser',
      data: {},
      success: function(res) {
        wx.hideLoading()
        console.log(res.result)
        self.setData({
          videoinfo: res.result.videoinfo.data,
          userinfo: res.result.userinfo.data,
        })
        //console.log(self.data.videoinfo[self.data.changeIndex])
      },
      fail: function(res) {
        wx.hideLoading()
        console.log(res.errMsg)
      }
    })

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
    if(app.globalData.logged==true){
      wx.onShareAppMessage(()=>{
        return{
          title:'川大江安校园研学旅游系统',
          imageUrl:"cloud://lynn-0gusuue75a3bd1c6.6c79-lynn-0gusuue75a3bd1c6-1305659349/banner1.jpg"
        }
      })
    }else{
      wx.wx.switchTab({
        url: '../my/my',
      })
    }
   

  }
})
const db=wx.cloud.database();
const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['校车站', 'a1'],
      ['乘车卡', 'a2'],
      ['地铁', 'a3'],
      ['出租车', 'a4'],
      ['机票、火车票', 'a5']
    ],
    srcs:[],
    CustomBar: app.globalData.CustomBar
  },
  
  onLoad: function (options) {
    db.collection("number8").get().then(res=>{
      //console.log(res.data)
      this.setData({
        srcs:res.data
      })
     // console.log(this.data.srcs)
    })

  },

  imgpreview(e) {
    //console.log(e.currentTarget)
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },
  modalClick(e) {
    this.setData({
      modalName: null
    }, function () {
      this.setData({
        scrollTo: e.currentTarget.dataset.target
      })
    })

  },
  showModal() {
    this.setData({
      modalName: 'DrawerModal'
    })
  },
  hideModal() {
    this.setData({
      modalName: null
    })
  },
});
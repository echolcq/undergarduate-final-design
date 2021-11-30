const app = getApp();
const db=wx.cloud.database();
Page({
  data: {
    scrollTo: '',
    items: [
      ['校园网', 'a1'],
      ['常用网站', 'a2'],
      ['邮寄', 'a3'],
    ],
    src:[],
    CustomBar: app.globalData.CustomBar

  },
  onLoad: function (options) {
    db.collection("number8").get().then(res=>{
      //console.log(res.data.slice(2,3))
      this.setData({
        src:res.data.slice(2,3)
      })

    })

  },
  imgpreview(e) {
    console.log(e.currentTarget)
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
const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['校医院工作时间', 'a1'],
      ['关于药品', 'a2'],
      ['医疗报销', 'a3']
    ],
    CustomBar: app.globalData.CustomBar

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
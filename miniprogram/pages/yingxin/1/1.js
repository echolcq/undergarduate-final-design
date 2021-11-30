const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [['洗衣裁剪', 'a1'],
      ['运动健身', 'a2'],
      ['校园卡业务', 'a3']],
    CustomBar: app.globalData.CustomBar

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
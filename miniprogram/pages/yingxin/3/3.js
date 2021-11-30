const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['万秀园', 'a1'],
      ['鸿博园', 'a2'],
      ['校内餐厅', 'a3'],
      ['水果店', 'a4'],
      ['咖啡厅', 'a5']
    ],
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
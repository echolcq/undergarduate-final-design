const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['宿舍基本设置', 'a1'],
      ['洗澡', 'a2'],
      ['饮水', 'a3'],
      ['用电', 'a4'],
      ['门禁', 'a5'],
      ['空调暖气', 'a6'],
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
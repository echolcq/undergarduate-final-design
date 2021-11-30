const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['美食', 'a1'],
      ['购物', 'a2'], 
      ['KTV', 'a3'],
      ['电影院', 'a4'],
      ['北京观光景点', 'a5']
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
// component/bottom-modal/bottom-modal.js
Component({
  properties:{
    modalShow:Boolean
  },

  options:{
    styleIsolation:"isolated",
    multipleSlots:true
  },
  methods:{
    onClose(){
      this.setData({
        modalShow:false,
      })
    }
  }
})
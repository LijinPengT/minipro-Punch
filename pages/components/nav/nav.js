const app = getApp()

Component({

  properties: {
    text: {
      type: String,
      value: 'iPunch'
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    }
  },

  data: {

    statusBarHeight: app.statusBarHeight + 'px',
    navigationBarHeight: (app.statusBarHeight + 44) + 'px'
  },

  methods: {
    backHome: function () {
      wx.reLaunch({
        url: '../index/index',
      })
    },
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
//index.js
//获取应用实例
var base = getApp();
Page({
  data: {
    path:base.path.res+"smallexe/index/",
    motto: '你好',
    userInfo: {},
    array: ['上海', '北京', '杭州', '宁波'],
    index: 0,
    imgUrls: [

      {picurl:'https://p3.pstatp.com/large/43700001e49d85d3ab52',},

      {picurl: 'https://p3.pstatp.com/large/39f600038907bf3b9c96',} ,

      { picurl: 'https://p3.pstatp.com/large/31fa0003ed7228adf421', }

    ],
    //是否显示指示点 true 显示 false 不显示
    indicatorDots: true,
    //控制方向
    vertical: false,
    //是否自动切换
    autoplay: true,
    //自动切换时间间隔
    interval: 3000,
    //滑动动画时长
    duration: 1000,
  },
  goCake: function (e) {
    var brand = e.currentTarget.dataset.brand;
    if(brand&&brand==1){
      base.cake.tab=1;
    }
    wx.switchTab({ url: '../cake/cake' });
  },
  goDetail: function (e) {
    var nm = e.currentTarget.dataset.pname;
    var b = e.currentTarget.dataset.brand;
    wx.navigateTo({
      url: '../cakeDetail/cakeDetail?pname=' + nm+"&brand="+(b||0)
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    })

    //wx.navigateTo({
    //url: '../socket/socket'
    //})
  },
  onLoad: function () {
    var that = this
    base.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //网络请求 GET方法
    // wx.request({
    //   url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   //成功后的回调
    //   success: function (res) {
    //     console.log('11111' + res),
    //       that.setData({
    //         images: res.data
    //       })
    //   }
    // })
  },
    //调用应用实例的方法获取全局数据
    //app.getUserInfo(function (userInfo) {
    //更新数据
    //that.setData({
    //userInfo: userInfo
    //})
    //})

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {
    return {
      title: '贝思客（体验版）',
      desc: '',
      path: '/pages/index/index?id=123'
    }
  }
})

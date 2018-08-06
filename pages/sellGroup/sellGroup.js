// pages/sellGroup/sellGroup.js
var base = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: base.path.res + "smallexe/index/",
    imgUrls: [

      {
        picurl: 'https://p3.pstatp.com/large/43700001e49d85d3ab52',
      },

      {
        picurl: 'https://p3.pstatp.com/large/39f600038907bf3b9c96',
      },

      {
        picurl: 'https://p3.pstatp.com/large/31fa0003ed7228adf421',
      }

    ],
    ptArr: [{
        img: base.path.res + "smallexe/index/jd.jpg",
        naturl: "30",
        num: "2",
        cont: "满十送一",
        cheap: "28",
        name: "大米大米"
      },
      {
        img: base.path.res + "smallexe/index/001.jpg",
        naturl: "30",
        num: "3",
        cont: "低至8.5元",
        cheap: "28",
        name: "大米大米"
      }
    ],
    goodSales: [{
        img: base.path.res + "smallexe/index/jd.jpg",
        naturl: "30",
        num: "2",
        cont: "五谷魔方 益源八珍营养早餐五谷杂粮核桃代餐包覆粉",
        cheap: "28",
        name: "大米大米"
      },
      {
        img: base.path.res + "smallexe/index/001.jpg",
        naturl: "30",
        num: "3",
        cont: "五谷魔方 益源八珍营养早餐五谷杂粮核桃代餐包覆粉",
        cheap: "28",
        name: "大米大米"
      },
      {
        img: base.path.res + "smallexe/index/jd.jpg",
        naturl: "30",
        num: "2",
        cont: "五谷魔方 益源八珍营养早餐五谷杂粮核桃代餐包覆粉",
        cheap: "28",
        name: "大米大米"
      },
      {
        img: base.path.res + "smallexe/index/001.jpg",
        naturl: "30",
        num: "3",
        cont: "五谷魔方 益源八珍营养早餐五谷杂粮核桃代餐包覆粉",
        cheap: "28",
        name: "大米大米"
      },
    ],
    topArr: [{
        id: 0,
        name: "今日精选"
      },
      {
        id: 1,
        name: "蜂蜜保健"
      },
      {
        id: 2,
        name: "五谷"
      },
      {
        id: 3,
        name: "坚果"
      },
      {
        id: 4,
        name: "干果"
      },
      {
        id: 5,
        name: "菌类"
      },
    ],
    ptHour: 22, //拼团时间，
    ptMin: 25,
    ptSec: 16,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goGroup: function (e) {
    console.log(111)
    wx.navigateTo({
      url: "../goGroup/goGroup"
    })
  },
  /** 
   * 点击分享 
   */
  onShareAppMessage: function() {
    return {
      title: '装逼小程序',
      path: '/page/user?id=123'
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
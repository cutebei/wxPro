// pages/xiangqing/xiangqing.js

var app = getApp()
var tabs = [{
    name: "商品"
  },
  {
    name: "评价"
  },
  {
    name: "详情"
  },
  {
    name: "推荐"
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chanpin: "您还未选择商品",//选择的产品
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    chckNum:0,//选择的商品数量
    currentTab: 0,
    cartNum:0,//购物车数量
    inventory:10,//剩余库存
    plist: [],//存储选中购物车
    tabs: tabs, //展示的数据
    slideOffset: 0, //指示器每次移动的距离
    activeIndex: 0, //当前展示的Tab项索引
    sliderWidth: 96, //指示器的宽度,计算得到
    contentHeight: 0, //页面除去头部Tabbar后，内容区的总高度，计算得到
    shu: '？',
    dizhi:'xxxxxx',

    s_info: {
      title: '五谷营养五谷营养五谷营养五谷营养五谷营养五谷营养五谷营养',
      money:'80',
      id:1,
      style:"",
      movies: [{
        url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'
      },
      {
        url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'
      },
      {
        url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
      }
      ],
    },
    s_wei:[
      {
      price:'xxxxx 4378g  原味1'
    },
      {
      price:'xxxxx 4378g  原味2'
    },
      {
      price:'xxxxx 4378g  原味3'
    },
      {
      price:'xxxxx 4378g  原味4'
    },
    ]

  },
  xuanze: function(e){
    this.setData({
        chanpin: e.target.dataset.cnvin
    })
    this.setData({
      chckNum: 0
    })
    var that = this;
    if (this.data.currentTab === e.target.dataset.cnvin) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.cnvin
      })
    }
  },
  subNum:function(e){// 数量减少
    if(this.data.chckNum>0){
      this.setData({
        chckNum: this.data.chckNum-1
      })
    }else{
      this.setData({
        chckNum:0
      })
    }
  },
  addNum:function (e) { //数量增加
    if (this.data.chckNum < this.data.inventory) {
      this.setData({
        chckNum: this.data.chckNum + 1
      })
    } else {
      return false;
    }
  },
  addOrder:function(e){//添加购物车
    if (this.data.chanpin =="您还未选择商品"){
        app.modal({
          title: '您还未选择商品',
        showCancel: false
      })
      return false;
    }
    if (this.data.chckNum == 0) {
      app.modal({
        title: '请选择商品数量',
        showCancel: false
      })
      return false;
    }
    var shopCart = wx.getStorageSync("shopCart");
    if (!shopCart){  //没有缓存的时候
      var shopCart=[];
    }
    shopCart.push(e.target.dataset);
    wx.setStorage({  //存储到storage
      key: 'shopCart',
      data: shopCart,
    })
    this.setData({
      cartNum: shopCart.length
    });
    // if (this.data.plist.length > 0 && this.data.chckNum > 0) {
    //   app.modal({
    //     title: '购物车无商品',
    //     showCancel: false
    //   })
    // } else {
    
    // }
  },
  goOrder: function () { //跳转购物车
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68 //计算内容区高度，rpx -> px计算
        });
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        }); 
      }
    });
    //初始化获取购物车数量
    var shopCart = wx.getStorageSync("shopCart");
    this.setData({
      cartNum: shopCart.length
    });
  },
  footerTap: app.footerTap,
  bindChange: function(e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
  },

  navTabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  }
})
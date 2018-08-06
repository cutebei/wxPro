var base = getApp();
var preview=require('../../utils/preview.js');
Page({
    data: {
        plist: [],
        total: 0,
        his: "",
        totalGood:[],
        delBtnWidth: 180//删除按钮宽度单位（rpx）
    },
    onLoad: function (e) {
      this.initEleWidth();
    },
    onShow: function (e) {
      this.setData({
        totalGood: wx.getStorageSync("shopCart")
      })
      //   if (base.cart.ref) {
      //       this.setData({ his: base.cart.ref });
      //       base.cart.ref = "";
      //   }
      //   var l = base.cart.getList();
      //   for (var i = 0; i < l.length; i++) {
      //       l[i].img = base.path.res + 'images/ksk/item/w_127/' + l[i].name + '.jpg';
      //       l[i].index = i;
      //   }
      // this.setData({ totalGood: l });
      //   this.changeTotal();
    },
    goBack: function () {
        var _this = this;
        wx.navigateTo({
            url: _this.data.his
        })
    },
    previewImg: function (e) {
        preview.show(e.currentTarget.dataset.name,e.currentTarget.dataset.brand,e.currentTarget.dataset.index)
    },
    changeTotal: function () {
      var l = this.data.totalGood;
        var t = 0;
        for (var i = 0; i < l.length; i++) {
            if (!l[i].del) {//排除删除选项
                t += l[i].money * l[i].num;
            }
        }
        this.setData({ total: t });
    },
    changeNum: function (e) {
        var t = e.currentTarget.dataset.type;
        var index = e.currentTarget.dataset.index;
      var re = this.data.totalGood[index].num + parseInt(t);
        if (re < 100 && re > 0) {
          var key = "totalGood[" + index + "].num";
            var obj = {}; obj[key] = re;
            this.setData(obj);
            this.changeTotal();
          base.cart.num(this.data.totalGood[index].supplyno, obj[key]);
        }
    },
    del: function (e) {
        var index = e.currentTarget.dataset.index;
      var sno = this.data.totalGood[index].supplyno;
        //var l = this.data.plist;
        // var _l = [];
        //var obj = { total: 0 };
        // for (var i = 0; i < l.length; i++) {
        //     if (i != index) {
        //         // _l.push(l[i]);
        //         obj.total += l[i].price * l[i].num;
        //     }
        // }

      var key1 = "totalGood[" + index + "].del";
        var obj = {};
        obj[key1] = true;



        // var ani = wx.createAnimation({
        //     duration: 300,
        //     timingFunction:"ease"
        // })
        // ani.height(0).step();
        // var key = "plist[" + index + "]._ani";
        // obj[key] = ani.export();

        this.setData(obj);




        this.changeTotal();
        base.cart.remove(sno);
    },

    clearCart: function () {
        var _this = this;
        if (this.data.total > 0) {
            base.modal({
                title: "确认清空所有商品？", confirmText: "清空", success: function (res) {
                    if (res.confirm) {
                      _this.setData({ totalGood: [], total: 0 });
                        // base.cart.clear();
                        wx.removeStorage({
                          key: 'shopCart',
                          success: function(res) {},
                        })

                    }
                }
            })
        }
    },
    goOrder: function () {
     //   this.ing();
      if (this.data.totalGood.length > 0 && this.data.total > 0) {
            wx.navigateTo({
                url: '../order/order?from=cart'
            })
        } else {
            base.modal({
                title: '购物车无商品',
                showCancel: false
            })
        }
    },
    tips: ["尽请期待!", "不用点了、暂时下不了单！", "真de、不骗你！", "不信再试试？！", "没错吧？！", "您可以去其它地方转转了！", "嘿、还挺执着！", "就喜欢你这股子劲！", "但没有任何niao用！", "你已经陷入无限轮回..."],
    //,"......", ".........", "好吧、你赢了！", "你即将获得一份随机奖励！", "just for your 执着！", "不过先声明、我们真的还未开放下单！"],
    tipsN: 0,
    ing: function () {
        if (this.tipsN >= this.tips.length) {
            this.tipsN = 0;
        }

        base.modal({
            title: this.tips[this.tipsN],
            showCancel: false
        });
        this.tipsN += 1;



        // if (this.tipsN < this.tips.length) {
        //     base.modal({
        //         title: this.tips[this.tipsN],
        //         showCancel: false
        //     });
        //     this.tipsN += 1;
        // }
        // else {
        //     base.modal({
        //         title: "恭喜",
        //         content: "您已免费获得价值88元经典系列蛋糕优惠券,限领一次",
        //         cancelText: "放弃机会",
        //         confirmText: "立即领取",
        //         showCancel: true,
        //         success: function (res) {
        //             if (res.confirm) {
        //                 wx.navigateTo({
        //                     url: "../buy/buy?type=0&price=88&&pay=free"
        //                 })
        //             } else {

        //             }
        //         }
        //     })
        // }

    },
    p: {
        currentIndex: -1,
        eventOk: true,
        eventStartOk: true,
        aniOk: true,
        len: 0,//当前位置
        ani: wx.createAnimation(),
        // _ani: wx.createAnimation({
        //     duration: 200,
        //     timingFunction: 'ease-out'//
        // }),
        max: 80,
        size: 40
    },
    moveTo: function (index, x) {
        this.p.eventOk = false;//停止事件
        if (x == 0) {
            this.p.currentIndex = -1;
            if (this.p.len > 0 - this.p.max / 2) {
                if (this.p.len > 0) {
                    this.p.ani.translateX(this.p.size).step({
                        duration: 100,
                        timingFunction: 'ease-out'
                    });

                }
                this.p.ani.translateX(0 - this.p.size).step({
                    duration: 200,
                    timingFunction: 'ease'
                });
            }
        }
        if (x == 0 - this.p.max) {
            this.p.currentIndex = index;
            this.p.ani.translateX(x - this.p.size).step({
                duration: 200,
                timingFunction: 'ease'
            });
        }
        this.p.ani.translateX(x).step({
            duration: 200,
            timingFunction: 'ease-out'
        });
        var obj = {};
      var key = "totalGood[" + index + "].ani";
        obj[key] = this.p.ani.export();
        this.setData(obj);
    },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var totalGood = this.data.totalGood;
      console.log(totalGood[index].txtStyle)
      totalGood[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        totalGood: totalGood
      });
    }
  },
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var totalGood = this.data.totalGood;
      totalGood[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        totalGood: totalGood
      });
    }
  },
    // ptouchsatrt: function (e) {

    //     var index = e.currentTarget.dataset.index;
    //     if (this.p.currentIndex >= 0) {
    //         this.moveTo(this.p.currentIndex, 0);
    //         return;
    //     }
    //     if (this.p.eventStartOk) {
    //         this.p.eventOk = true;
    //         this.p.len = 0;
    //         var pt = e.changedTouches[0];
    //         pt.aaaaaaa = 11111;
    //         this.p.x = pt.pageX;
    //         this.p.y = pt.pageY;
    //         console.log("start")
    //     }
    // },
    // ptouchend: function (e) {
    //     if (this.p.eventOk) {
    //         var pt = e.changedTouches[0];
    //         var len = pt.pageX - this.p.x;//预计目标位置
    //         var ht = pt.pageY - this.p.y;
    //         if (len != 0 && Math.abs(ht) / Math.abs(len) < 0.3) {//滑动倾斜度限制
    //             this.p.len = len;
    //             var index = e.currentTarget.dataset.index;
    //             if (len > 0 - this.p.max / 2) {
    //                 this.moveTo(index, 0);
    //             } else {
    //                 this.moveTo(index, 0 - this.p.max);
    //             }
    //         }
    //     }
    //     this.p.eventOk = false;
    //     this.p.eventStartOk = false;
    //     var _this = this;
    //     if (this.p.tm) {
    //         clearTimeout(this.p.tm);
    //     }
    //     this.p.tm = setTimeout(function () {
    //         _this.p.eventStartOk = true;
    //     }, 300);
    // }
});
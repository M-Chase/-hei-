// pages/upload/upload.js
const app = getApp()
var request = require("../../utils/request.js")
var util = require("../../utils/util.js")

var form_data;
var psw_vaule = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    publish_info: '',//发布的信息
    description: '',//文本
    value: '',
    tempFilePaths: [],
    img_url: [],
    openid: '123',
    timestamp: '',
    buy_sell: '出售',
    comment2: '',
    color: '#DCDCDC',
    disabled: true,
    price: '',
    price_warning: '',
    title: '',
    pos: '',
    lost_date_time:'',
    type:false,
    pub_count:0,
    //cWidth: 0,
    //cHeight : 0
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布', //导航栏 中间的标题
    },
 
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20 ,
    publish_info_my:0,
    isChecked: false,
    publish_time: ''
  },
  changeSwitch: function (e) {
    console.log(e)
    this.setData({
      type : e.detail.value
    })
  },
  to_otherpage:function(url)
  {
    if (app.globalData.userInfo!='') {

      wx.navigateTo({
        url: url
      })
    }
    else {
      this.setData({canIUse:false})

    }
  },
  publish_purchase:function(event) {
    if(event.detail=='0')
    {
      this.to_otherpage('../upload/upload')
    //this.to_otherpage('../publish_category/publish_category')

    }
    else if(event.detail=='1')
    {
      this.to_otherpage('../my_info/my_info')

    }
    else
    {
      this.to_otherpage('../my/my')

    }
  },
  //获取价格
  get_price: function (e) {
    var price = e.detail.value;
    var price_warning = '请输入合法金额';

    if (price.match(/^\d+(\.\d{1,2})?$/) || (price.length > 1) && (price[price.length - 1] == '.') && (price[price.length - 2] != '.')) {
      price_warning = ''
    }
    else {
      if (price.length != 0)
        price = this.data.price;
    }
    this.setData({
      price: price,
      price_warning: price_warning
    })
  },

  //发布类别备注
  buy_sell: function (e) {
    console.log(e)
    this.setData({
      buy_sell: e.detail.value,
    })
  },

  //物品类别备注
  comment2: function (e) {
    this.setData({
      comment2: e.detail.value,
    })
  },

  disabled_pub: function () {
    var title = this.data.title;
    var color = '#DCDCDC';
    var disabled = true;
    if (title.length != 0) {
      color = "black",
        disabled = false
    }
    this.setData({
      color: color,
      disabled: disabled
    })
  },

  get_describe(event) {
    // event.detail 为当前输入的值
    this.setData({
      description: event.detail.value
    });
    
    this.data.pub_count = 0;
  },

  get_title: function (e) {
    var title = e.detail.value;
    title = e.detail.value.replace(/\s+/g, '');
    this.setData({
      title: title,
    })
    this.disabled_pub();
    this.data.pub_count = 0;
  },
  get_pos: function (e) {
    var pos = e.detail.value;
    pos = e.detail.value.replace(/\s+/g, '');
    this.setData({
      pos: pos,
    })
    this.disabled_pub();
    this.data.pub_count = 0;
  },
  get_time: function (e) {
    var lost_date_time = e.detail.value;
    lost_date_time = e.detail.value.replace(/\s+/g, '');
    this.setData({
      lost_date_time: lost_date_time
    })
    this.disabled_pub();
    this.data.pub_count = 0;
  },

  //上传图片到服务器 
  submit: function () {
    if (this.data.pub_count>0)
    {
      console.log("已经发布了")
      return ''
    }
    this.data.pub_count+=1

    if (!this.data.title) {
      util.is_valid(this.data.title, '标题不能为空！')
    }
    else {
      var that = this
      var img_url = that.data.img_url;
      var description = that.data.description;
      var lost_date_time = that.data.lost_date_time;
      var pos = that.data.pos;
      var openid = app.globalData.openid;
      var publish_time = Date.parse(new Date());
      publish_time = parseInt(publish_time / 1000);
      var type = that.data.type;
     // var buy_sell = that.data.buy_sell;
      /*
      var price = that.data.price;
      if (price[price.legnth - 1] == '.') {
        price += '00'
      }
      if (price == '')
        price = '-1'
      */
      var title = that.data.title;
      console.log('fffffffffffffffff')
   //   console.log(price)
      var formData = {
        title: title,
        description: description,
        type: type,
      //  buy_sell: buy_sell,
        pos: pos,
        openid: openid,
        lost_date_time: lost_date_time,
        publish_time: publish_time
      }
      if (img_url.length != 0)
        that.uploadfile_img(formData, img_url)
      else
        that.uploadfile(formData, '')


    }

  },

  uploadfile_img: function (formData, filePaths) {

  
    var that = this
    return new Promise(function (resolve, reject) {
      for (var i =0 ; i < filePaths.length; i++) {
        formData["img_pos"] = i
        console.log(formData)
  
        wx.uploadFile({
          url: 'https://www.yunluheishi.cn:443/wx_Code/addLostThing',  //填写实际接口   
          header: {
            "Content-Type": "application/json"
          },
          filePath: filePaths[i],
          name: 'file',
          formData:formData,
          success: function (res) {
            // if (res) {
            //   wx.showToast({
            //     title: '已提交发布！',
            //     duration: 3000
            //   });
            // }
    
            console.log('lllllllllllllllllllllllllllll')
            console.log(res.data)
            if(res.data=='1')
            {
              wx.showModal({
                content: "您的发布内容可能包括政治，色情，违反等有害信息,请去除后重新发布",
                showCancel: false,
              })
            }
            else
            {
              console.log(i,filePaths.length)
              if(i==filePaths.length)
                {
                  that.upload_data(JSON.parse(res.data))
                }
            }
          },
    
        })

    }
    })

  },


  uploadfile: function (formData, img_url) {
    var that = this
    formData['img_url'] = img_url
    console.log(formData)
    request.request('https://www.yunluheishi.cn:443/wx_Code/addLostThing', 'POST', formData).then(function (res) {
      console.log('jjjjjjjjjjjjjjjjkkkkk')
      console.log(res)
      if (res['result'] == '1') {
        wx.showModal({
          content: "您的发布内容可能包括政治，色情，违反等有害信息,请去除后重新发布",
          showCancel: false,
        })
      }
      else
      {
        that.upload_data(res)
      }

    })

  },

  to_index: function (publish_info) {
    var pagesArr = getCurrentPages();

    wx.navigateBack({
      delta: 1,   //回退前 delta 页面
    });
  },

  upload_data: function (data) {
    var publish_idpos = data
    console.log(data)
    var that = this
    // var publish_idpos = JSON.parse(data)
    that.setData({
      publish_info: publish_idpos['publish']
    }),
      app.globalData.id_pos = publish_idpos['id_pos']
    wx.setStorage({
      key: "publish_info",
      data: publish_idpos['publish']
    })
    console.log(app.globalData.publish_info)
    that.to_index(publish_idpos['publish'])

  },
  //从本地获取照片 
  upimg: function () {
    var that = this;
    var img_url = that.data.img_url;
    const imgnum = Object.keys(img_url).length;
    if (imgnum<9){
      wx.chooseImage({
        count: 9-imgnum,        //一次性上传到小程序的数量     
        sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          const tempFilePaths = res.tempFilePaths
          console.log(res.tempFilePaths)
          var size = res.tempFiles[0].size
          console.log("jjjjjjjjjjjjjjjj")
          console.log(size)
   //   that.compressImage(res.tempFilePaths,0, res.tempFiles.length)
      
      if(size<=3000000) 
      { 
        that.setData({ 
        //  img_url: img_url.concat(res.tempFilePaths), 
            img_url: img_url.concat(res.tempFilePaths), 
        }) 
      } 
      else 
      { 
        wx.showModal({ 
          content: "上传图片不能大于3M!", 
          showCancel: false, 
        })  
           
         wx.showModal({ 
           content: "上传图片不能大于3M!", 
           showCancel: false, 
         })  
      }
          this.disabled_pub();
          this.data.pub_count = 0;
  
        }
      });
    }

  },
//   压缩图片
	compressImage:function(imgUrls,nowNum,endNum){
		var that=this;
		var img_url = that.data.img_url;
		console.log("111")
		if (nowNum<=endNum){
      if(/\.gif/gi.test(imgUrls[nowNum])){
        console.log("是我没错了~")
        img_url.push(imgUrls[nowNum])
        nowNum += 1;
        that.setData({
          img_url: img_url,
        })
        that.compressImage(imgUrls, nowNum, endNum)
      }else{
        wx.compressImage({
          src: imgUrls[nowNum],
          quality: 60,
          success: res => {
            nowNum += 1;
            console.log("压缩成功")
            console.log(res)
            img_url.push(res.tempFilePath)
            console.log(imgUrls)
            that.setData({
              img_url: img_url,
            })
            that.compressImage(imgUrls, nowNum, endNum)
            // return res.tempFilePath
            // console.log(that.data.img_url)
          }
        })
      }
			//that.compressImage(imgUrls, nowNum, endNum)
		}
		
	},

  //删除照片功能与预览照片功能 
  deleteImg: function (e) {
    var that = this;
    var img_url = that.data.img_url;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          img_url.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_url: img_url
        });
        console.log(img_url)
        that.disabled_pub();

      }
    })

  },
  //预览图片
  previewImg: function (e) {
    console.log(e)
    var img_url = this.data.img_url
    console.log(img_url)
    wx.previewImage({
      current: img_url[e.currentTarget.dataset.imgid],
      urls: img_url
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "发布",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   // app.globalData.near = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // app.globalData.near = true
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
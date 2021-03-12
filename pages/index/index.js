//index.js
//获取应用实例
const app = getApp()
var request = require("../../utils/request.js")
var util = require("../../utils/util.js")
 
Page({
  data: {
    treat_server: "none",
    publish_info:[],//所有的发布信息
    //canIUse: false,//判断用户是否授权
    canIUse: true,//判断用户是否授权
    hasInfo: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    publish_info_my:0,//二手交易，校园生活，消息，我的，分别对应0，1，2，3
    keyword:'',
    info_unreadnum:"",
    scrollHeight:0,
    title_text:'',
    active:0,
    isblack:false,
    img_height: 400,
    tmp:0,
    imgSrc:"../image/slient_night2.jpg",
    imgSrc1:"../image/history.jpg",
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '云麓hei市', //导航栏 中间的标题
    },
   
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,


      value1: undefined,
      value2: '',
      option1: [
        { text: '全部商品', value: '全部' },
        { text: '出售', value: '出售' },
        { text: '求购', value: '求购' },
      ],
      option2: [
        { text: '全部信息', value: 'a' },
        { text: '失物招领', value: 'b' },
        { text: '信息交流', value: 'c' },
      ],
      option3: [
        { text: '全部商品',value: 3},
        { text: '出售',value: 4},
        { text: '求购',value: 5},
      ],
      option4: [
        { text: '全部信息 ', value: 'd'},
        { text: '失物招领 ', value: 'e'},
        { text: '信息交流 ', value: 'f'},
      ],
      first: false,
      left: 6.5,
     // history_info: [
     //   {title:'收到货公交卡还是该接口还是框架和高科技上过课世界观和思考'},
     //   {title:'还是客家话关键时刻火锅鸡收购价开始高考结束高考结束贵阳嘎与人工费怀'}
    //  ]
      history_info: [],
      title1: '',
      title2: '',
      scrollTop: 0,
      lastone: 0
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  
  onPageScroll (e) { 
    let scrolltop = e.scrollTop;
    if(scrolltop<160){
      this.setData({
        tmp : scrolltop
      }) 
    }else{
      this.setData({
        tmp : 151.2
      }) 
    }
  },
  
slient_details:function(){
  var timestamp = Date.parse(new Date());
      timestamp = parseInt(timestamp / 1000);
  var data = {
    openid: app.globalData.openid,
    timestamp: timestamp,
    category: '历史上的今天'
  }
  console.log(data)
  // var that = this
  request.request('https://www.yunluheishi.cn:443/wx_Code/updateFestivalClicks', 'GET', data).then(function (res) {
    console.log("bbbbbbbbbbbbbbbbbbb")
    console.log(res)
  })
  
   wx.navigateTo({
          url: '../slient_details/slient_details'
   })
},
  uploadInfo:function(){
    wx.navigateTo({
      url: '../upload/upload',
    })
  },
  //点击发布/求购执行的函数
  publish_purchase:function(event) {
    if(event.detail=='0')
    {
      var pages=getCurrentPages()
      console.log(pages[0].route)
      if (pages[0].route !="pages/index/index"){
        this.to_otherpage('../index/index')
      }
      
    //  this.to_otherpage('../upload_server/upload_server')
    //this.to_otherpage('../publish_category/publish_category')

    }
    else if(event.detail=='1')
    {
      this.to_otherpage('../compus/compus')

    }
    else if(event.detail=='2')
    {
      this.to_otherpage('../my_info/my_info')

    }
    else {
      this.to_otherpage('../my/my')

    }
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
      if(e.detail.userInfo)
      {
        app.globalData.userInfo = e.detail.userInfo;
        request.save_userinfo();
      }
        this.setData({
          canIUse: true,
        //  canIUse: false,
          userInfo: app.globalData.userInfo,
          info_unreadnum: 1
          
      })  
  },


  //用户详细信息
  detail_info:function(e)
  {
    //设置浏览次数
    var publish_info = this.data.publish_info;
    var cur_id = e.currentTarget.id;
    var pub_id = publish_info[parseInt(cur_id)].id;

    publish_info[cur_id]['page_view']+=1

    var product_info = publish_info[cur_id];

    app.globalData.product_info = product_info
    wx.setStorage({
      key: "product_info",
      data: product_info
    })
    wx.setStorage({
      key: "publish_info",
      data: publish_info
    })

    var data = { product_id: pub_id}
    request.request('https://www.yunluheishi.cn:443/wx_Code/update_pageView', 'GET', data).then(function (res) {
    })


    //是否跳转页面，主要判断用户是否登录过
    this.to_otherpage("../details/details")
  },

 //用户刷新后，获取最新信息
  onPullDownRefresh:function()
  {
    //刷新消息页面

    wx.showLoading({
      title: '玩命加载中',
    })
    this.get_unreadnum()
    this.clear();
    this.refresh('全部')
    var event = {"currentTarget":{"dataset":{"index":0}}}
    if (this.selectComponent("#van-tabs")!=null)
    {
      this.selectComponent("#van-tabs").onTap(event)
    }
    wx.hideLoading(); 

  },

 clear:function()
 {
   this.setData({
     keyword:''
   })
 },
 //获取发布信息
  onLoad: function (options) {
    app.globalData.share = false
    console.log("lllllllllllllllllllllllllllllllll")
    console.log(options)
    var that = this
    this.setData({isblack:app.globalData.isblack})
    wx.navigateBack({
      delta: -1
    })
    console.log(app.globalData.userInfo)


    //判断用户是否已授权
    if (app.globalData.userInfo != '') {
      console.log('怎么回事')
      that.setData({
        canIUse: true,
        userInfo: app.globalData.userInfo
       // canIUse: false
      })
    }  
    else {
      console.log('延迟')
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo,'发生什么了') 
        if(res.userInfo){
          console.log('成功') 
          that.setData({
            canIUse: true, 
            userInfo: app.globalData.userInfo
           // canIUse: false
          })
        }else{
          console.log('失败') 
          that.setData({
            canIUse: false
          })
        }
        
      }

    }
    setTimeout(()=>{
      console.log('定时器')
      
    },1000)
    
    //设置滚动值
    that.get_titletext()

    wx.getSystemInfo({
      success: function (res) {
        that.setData({ scrollHeight: res.windowHeight })
      },
    })
    this.get_publishinfo1()
    //this.get_history()

  },

  onShow:function()
  {
    this.get_unreadnum()
    this.get_publishinfo()
    this.setData({ keyword:''})
    // this.get_publishinfo()
   // this.get_history()
   this.setData({
     history_info : app.globalData.history_info
   })
   console.log(this.data.history_info)
   var data = {}
   var that = this
    request.request('https://www.yunluheishi.cn/history', 'GET', data).then(function (res) {
      that.setData({
        title1: res.data[0].title,
        title2: res.data[1].title
      })
    })
   
  },

  // 获取历史消息
  get_history:function(){
    var data = {}
    request.request('https://www.yunluheishi.cn/history', 'GET', data).then(function (res) {
      console.log(res)
      app.globalData.history_info = res.data
    })
  },

    //获取发布信息
  get_publishinfo:function()
  {

    var that = this
    wx.getStorage({
      key: "publish_info",
      success: function (res) {
        console.log("222222222222222222222")

        console.log('publish_info ')
        var publish_info = res.data
        //console.log(publish_info[0].imgUrl)
        //console.log(publish_info.length)
        publish_info = util.span_time(publish_info)
        
        that.setData({
          publish_info: publish_info
        })
        
      }
    });

  },

  get_publishinfo1: function () {
    //用户登录后，即可获取发布信息
    var that = this
    var data = { 'all_sell_buy': '全部' }
    request.request('https://www.yunluheishi.cn:443/wx_Code/agian', 'POST', data).then(function (res) {
      console.log(res)
      var publish_info = res['publish']
      wx.setStorage({
        key: "publish_info",
        data: publish_info
      })

      publish_info = util.span_time(publish_info)
      console.log("publish-publish-publist")
      console.log(publish_info)
      that.setData({publish_info:publish_info})
      app.globalData.id_pos = res['id_pos']
    }).catch(err => {
      console.log("1111111111111111111111111111111111111111")
      console.log(err)
  })



  },

  get_unreadnum: function () {
    var that = this
    if(app.globalData.openid=='')
    {
      wx.getStorage({
        key: "openid",
        success: function (res) {
          that.get_unread(res.data)
        }
      });
    }
    else
    {
      that.get_unread(app.globalData.openid)
    }



  },

  get_unread:function(openid)
  {
    var that = this
    var data = { openid: openid }
    request.request('https://www.yunluheishi.cn:443/wx_Code/get_unreadnum', 'GET', data).then(function (res) {

      var unread_num = res
      console.log(unread_num)
      if (unread_num == 0)
        unread_num = ''
      that.setData({ info_unreadnum: unread_num })
    }
    )
  },
  to_otherpage:function(url)
  {
    if (app.globalData.userInfo!='') {

      wx.navigateTo({
        url: url
      })
    }
    else {
      this.setData({
       // canIUse:false
       canIUse: true
      })
    }
  },
  all_sell_buy:function(e)
  {
    console.log(e)
    this.refresh(e.detail.title)
  },

  refresh:function(sellbuy)
  {
    var data = { 'all_sell_buy': sellbuy }
    var that = this
    request.request('https://www.yunluheishi.cn:443/wx_Code/agian', 'POST', data).then(function (res) {
      console.log(res)
      var publish_info = util.span_time(res['publish'])
      that.setData({ 'publish_info': publish_info })
      if (data['all_sell_buy'] == '全部') {
        app.globalData.id_pos = res['id_pos']
        wx.setStorage({
          key: "publish_info",
          data: res['publish']
        })
        // 隐藏加载框
      }
    })
  },

  onSearch:function(e)
  {
    var that= this
    var keyword = this.data.keyword.replace(/\s+/g, '');
    console.log("keyword is "+keyword)
    if(!keyword)
    {
      return ''
      util.is_valid(keyword, "搜索不能为空")

    }
    else
    {
      var data = { 'keyword': keyword }
      wx.pageScrollTo({
        scrollTop: 0
      })
      
      request.request('https://www.yunluheishi.cn:443/wx_Code/search', 'GET', data).then(function (res) {
        console.log(res)
        // that.setData({
        //   publish_info: util.span_time(res),
        // })
        var event = { "currentTarget": { "dataset": { "index": 0 } } }
        that.selectComponent("#van-tabs").onTap(event)


        var search_info = util.span_time(res)
        app.globalData.search_info = search_info
        wx.navigateTo({
          url: '../search_show/search_show'
        })

      })
    }

  },

  keyword:function(e)
  {
    this.setData({keyword:e.detail})
  },

get_titletext:function()
{
  var that = this
  wx.getStorage({
    key: "title_text",
    success: function (res) {
      that.setData({
        title_text: res.data
      })
    }
  });
},
  onShareAppMessage: function () {
    return {
      title: '云麓hei市',
      desc: '云麓hei市',
      path: '/pages/index/index' // 路径，传递参数到指定页面。
    }
  },

  // 导航栏二级菜单部分
  all_messages: function () {
    this.setData({
      treat_server: 'none',
      left: 6.5
    })
    var data = { 'all_sell_buy': '全部' }
    var that = this
    request.request('https://www.yunluheishi.cn:443/wx_Code/agian', 'POST', data).then(function (res) {
      console.log(res)
      var publish_info = util.span_time(res['publish'])
      that.setData({ 'publish_info': publish_info })
      /*
      if (data['all_sell_buy'] == '全部') {
        app.globalData.id_pos = res['id_pos']
        wx.setStorage({
          key: "publish_info",
          data: res['publish']
        })
        // 隐藏加载框
      }*/
    })
  },

  valueChange: function (e){
    console.log(e)
  //  console.log(typeof(e.detail))
    if(e.currentTarget.id == 'treat'){
      
      this.setData({
        
        option2: [
          { text: '全部信息'},
          { text: '失物招领'},
          { text: '信息交流'},
        ]
      })
    }else{
      this.setData({
        option1: [
          { text: '全部商品'},
          { text: '出售'},
          { text: '求购'},
        ],
        option1: [
          { text: '全部商品', value: 0 },
          { text: '出售', value: 1 },
          { text: '求购', value: 2 },
        ],
      })
    }
    
  },
  valueChange1: function (e){
    console.log(e)
    var temp = e.detail
    if(e.detail == 3){
      temp = '全部'
    }else if(temp == 4){
      temp = '出售'
    }else if(temp == 5){
      temp = '求购'
    }

    this.treat_refresh(temp)

    this.setData({
      treat_server: 'treat',
      left: 40
    })
    if(e.detail==3){
      this.setData({
        value1 : '全部'
      })
    }else if(e.detail==4){
      this.setData({
        value1 : '出售'
      })
    }else if(e.detail==5){
      this.setData({
        value1 : '求购'
      })
    }
  },
  valueChange2: function (e){
    console.log(e)
    this.setData({
      treat_server: 'server',
      left: 75
    })
    if(e.detail=='d'){
      this.setData({
        value2 : 'a'
      })
    }else if(e.detail=='e'){
      this.setData({
        value2 : 'b'
      })
    }else if(e.detail=='f'){
      this.setData({
        value2 : 'c'
      })
    }
    
   // this.data.value2 = 'a'
  },

  treat_refresh:function(sellbuy)
  {
    var data = { 'all_sell_buy': sellbuy }
    var that = this
    request.request('https://www.yunluheishi.cn:443/wx_Code/agian', 'POST', data).then(function (res) {
      console.log(res)
      var publish_info = util.span_time(res['publish'])
      that.setData({ 'publish_info': publish_info })
      if (data['all_sell_buy'] == '全部') {
        app.globalData.id_pos = res['id_pos']
        wx.setStorage({
          key: "publish_info",
          data: res['publish']
        })
        // 隐藏加载框
      }
    })
  }
})

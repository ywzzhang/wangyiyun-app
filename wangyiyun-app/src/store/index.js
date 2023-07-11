import { createStore } from 'vuex'
import {getMusicLyric} from '@/request/api/item.js'

export default createStore({
  state: {
    //此处定义全局变量
    playList: [{ //播放列表
      al: {  //歌曲专辑信息
        id: 38591207,  //专辑的id
        pic: 109951162860912270,
        picUrl: "https://p2.music.126.net/Q5nMKc5AqIj9m9PsP18gLA==/109951162860912276.jpg",
        pic_str: "109951162860912276",
      },
      id: 450048216,  //歌曲id
      name: "只道寻常", //歌曲名字（不是专辑名字）
      ar:[{  //数组保存作者名字（可能有多个作者）
        name: "谢春花"
      }]
    }],
    playListIndex: 0, //列表playList的索引
     
    //暂停按钮的显示(true表示此时音乐在暂停状态，对应应该显示播放icon)
    isbtnShow: true,

    detailShow: false, // 歌曲详情页这个弹出层的显示

    lyricList:{}, //歌词

    currentTime: 0, //当前播放时间

    duration: 0, //歌曲总时长

    isLogin: false, //记录是否已登录

    isFooterMusic: true, //是否显示底部播放组件
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state, value){
      state.isbtnShow = value
    },
    updatePlayList:function(state, value){
      state.playList = value
    },
    updatePlayListIndex:function(state, value){
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state, value){
      state.lyricList = value
    },
    updateCurrentTime:function(state, value){
      state.currentTime = value
    },
    updateDuration:function(state, value){
      state.duration = value
    },
    pushPlayList:function(state, value){
      state.playList.push(value)
    },
    updateIsLogin:function(state, value){
      state.isLogin = value
    },
  },
  actions: {
    getLyric:async function(context, value){
      let res = await getMusicLyric(value)
      context.commit("updateLyricList", res.data.lrc)
    }
  },
  modules: {
  }
})

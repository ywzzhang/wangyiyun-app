<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="footerText">
                <p class="footerName">{{ playList[playListIndex].name }}</p>
                <p class="fixText">横滑可以切换上下首哦</p>
            </div>
        </div>

        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>

        <audio 
            ref="audio" 
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
        ></audio>

        <van-popup
            v-model:show="detailShow"
            position="right"
            v-if="detailShow"
            :style="{ width: '100%', height: '100%' }"
        >
        <!-- 这里选择从这里传play和isbtnShow是为了保证FooterMusic和MusicDetail这两个组件的这两个参数保持一致，而不是用State传全局变量 -->
        <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
        </van-popup>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import MusicDetail from '@/components/item/MusicDetail.vue'
    export default {
        data(){
            return{
                interVal:0  //定时器，用于在播放时每过一秒就定时更改当前播放时间这个参数
            }
        },
        computed:{
            ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
        },
        mounted(){
            this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        },
        updated(){
            this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
            this.addDuration()
            // console.log(this.$refs.audio.duration);
        },
        methods:{
            play:function(){
                //点击播放或暂停按钮，切换播放状态
                if(this.$refs.audio.paused){
                    this.$refs.audio.play()
                    this.updateIsbtnShow(false)
                    this.updateTime()  //播放状态，开启定时器定时更新当前播放时间这个参数
                }else{
                    this.$refs.audio.pause()
                    this.updateIsbtnShow(true)
                    clearInterval(this.interVal)  //暂停状态，释放定时器
                }  
            },
            addDuration:function(){
                // 更新歌曲总时长
                //FooterMusic在所有页面全程都在，因此就是初始会挂载，切换歌曲也不会重新挂载
                //MusicDetail只有点开歌曲详情页才会挂载，而且换歌之后又重新挂载
                //FooterMusic在mounted和updated调用这个函数，更新歌曲总时长
                //MusicDetail只在mounted调用这个函数
                this.updateDuration(this.$refs.audio.duration)
            },
            updateTime:function(){
                this.interVal = setInterval(() => {
                    this.updateCurrentTime(this.$refs.audio.currentTime)
                }, 1);
            },
            ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
        },
        watch:{
            // 如果换歌，换了以后需要自动播放，且要将icon改为暂停icon
            //换歌曲列表中的不同歌
            playListIndex:function(){
                this.$refs.audio.autoplay=true
                if(this.$refs.audio.paused){
                    this.updateIsbtnShow(false)
                    this.updateTime()
                }
            },
            playList:function(){
                //换歌曲列表
                this.$refs.audio.autoplay=true
                if(this.$refs.audio.paused){
                    this.updateIsbtnShow(false)
                    this.updateTime()
                }
            }
        },
        components: {
            MusicDetail
        }
    }
</script>

<style lang="less" scoped>
    .FooterMusic{
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        justify-content: space-between;
        padding: .2rem;
        .footerLeft{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            .footerName{
                font-weight: 900;
            }
            .fixText{
                color: #d0d3db;
            }
        }
        .footerRight{
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: .6rem;
                height: .6rem;
            }
        }
    }
    
</style>
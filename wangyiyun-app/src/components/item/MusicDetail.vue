<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
                <span v-for="(item, i) in musicList.ar" :key="item">
                    {{ item.name }}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>

    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" class="img_al" @click="isLyricShow=true" :class="isbtnShow ? 'img_al_paused' : 'img_al_active'">
    </div>

    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
        <p v-for="item in lyric" :key="item" :class="{active:(currentTime >= item.time && currentTime < item.next)}">
            {{ item.text }}
        </p>
    </div>

    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-changpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun-"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weimingmingwenjianjia_xunhuan"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.005">
        </div>  
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon_bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg class="icon_bofang" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    import { Vue3Marquee } from 'vue3-marquee'
    import 'vue3-marquee/dist/style.css'
    import { mapMutations, mapState } from 'vuex';
    export default {
        data(){
            return{
                isLyricShow: false
            }
        },
        computed:{
            ...mapState(["lyricList", 'currentTime', 'playListIndex', 'playList', 'duration']),
            lyric:function(){
                let arr;
                let res = [];
                if (this.lyricList.lyric) {
                    arr = this.lyricList.lyric.split("\n");
                    for (let i = 0; i < arr.length; i++){
                        let item = arr[i];
                        item = item.split("]");
                        let text = item[item.length - 1];
                        for (let j = 0; j < item.length - 1; j++){
                            let time = item[j];
                            time = time.slice(1, time.length);
                            time = time.split(":");
                            time = time[0] * 60 + time[1] * 1;
                            time = time.toFixed(3);
                            let obj = {time, text};
                            if (obj.text.length > 0){
                                res.push(obj);
                            }
                        }
                    }
                    res.sort(function(a, b){return a.time-b.time});

                    //给每句歌词添加下一首歌词的开始时间点
                    res.forEach((item, i) => {
                        if (i===res.length - 1){
                            item.next = 20000000
                        }else{
                            item.next = res[i + 1].time
                        }
                    });
                }
                // console.log(res);
                return res
            }
        },
        props:['musicList', 'play', 'isbtnShow', 'addDuration'],
        methods:{
            backHome:function(){
                this.updateDetailShow()
                this.isLyricShow = false
            },
            goPlay:function(num){
                let index = this.playListIndex + num
                if (index < 0){
                    index = this.playList.length - 1
                }else if (index > this.playList.length - 1){
                    index = 0
                }
                this.updatePlayListIndex(index)
            },
            ...mapMutations(['updateDetailShow', 'updatePlayListIndex'])
        },
        mounted() {
            // console.log(this.lyricList);
            this.addDuration()
            // console.log(this.duration);
        },
        watch:{
            currentTime:function(value){
                let p = document.querySelector("p.active")
                // console.dir(p);
                if (p.offsetTop > 300) {
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 300
                }

                if (value === this.duration){
                    this.goPlay(1)
                    this.play()
                    this.$refs.musicLyric.scrollTop = 0
                }
                // console.log(this.currentTime);
                // console.log([this.$refs.musicLyric]);
            }
        },
        components: {
            Vue3Marquee,
        },  
}
</script>

<style lang="less" scoped>
    .bgimg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(1.4rem);
    }
    
    .detailTop{
        width: 100%;
        height: 1rem;
        display: flex;
        padding: .2rem;
        justify-content: space-between;
        align-items: center;
        fill: #fff;
        .detailTopLeft{
            display: flex;
            align-items: center;
            .leftMarquee{
                width: 3rem;
                height: 100%;
                margin-left: .4rem;
                color: #999;
                .icon{
                    width: .4rem;
                    height: .4rem;
                    fill: #999;
                    position: relative;
                    top: .1rem;
                    left: .1rem;
                }
            }
        }
    }

    .detailContent{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .img_needle{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-10deg);
            transition: all 2s;
        }
        .img_needle_active{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(5deg);
            transition: all 2s;
        }
        .img_cd{
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            position: absolute;
            bottom: 1.8rem;
            z-index: -1;
        }
        .img_al{
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 2.7rem;
            animation: rotate_ar 10s linear infinite;
        }
        .img_al_active{
            animation-play-state: running;
        }
        .img_al_paused{
            animation-play-state: paused;
        }
        @keyframes rotate_ar {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }
        }
    }
    .musicLyric{
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .5rem;
        overflow: scroll;
        p{
            color: rgb(110, 107, 107);
            margin-bottom: .4rem;
        }
        .active{
            color: #fff;
            font-size: .5rem;
        }
    }
    .detailFooter{
        width: 100%;
        height: 2.8rem;
        position: absolute;
        bottom: .3rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .footerTop{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon {
                width: .6rem;
                height: .6rem;
                fill: rgb(245, 234, 234);
            }
        }
        .range{
            width: 100%;
            height: .06rem;
        }
        .footer{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon {
                width: .6rem;
                height: .6rem;
                fill: rgb(245, 234, 234);
            }
            .icon_bofang{
                width: 1.1rem;
                height: 1.1rem;
                fill: rgb(245, 234, 234);
            }
        }
        
    }
</style>
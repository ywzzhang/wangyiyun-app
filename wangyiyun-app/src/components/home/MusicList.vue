<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>

        <div class="musicContent">
            <van-swipe 
                :loop="false" 
                :width="130" 
                class="my-swpie" 
                :show-indicators="false"
            >
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <router-link :to="{
                        path: '/itemMusic',
                        query:{
                            id: item.id,
                        }
                    }">
                        <img :src="item.picUrl" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bofang"></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link> 
                </van-swipe-item>
            </van-swipe>  
        </div>
    </div>
</template>

<script>
    import {getMusicList} from '@/request/api/home.js'
    import {reactive, onMounted} from 'vue'
    export default {
    setup() {
        const state = reactive({
            musicList:[
        ]});
        function changeCount(num){
            if (num >= 100000000){
                return (num / 100000000).toFixed(1) + "亿"
            }else if (num >= 10000){
                return (num / 10000).toFixed(1) + "万"
            }
        }
        // 实例挂载到DOM后运行axios去后端获得轮播图片地址,并将图片地址赋值给images
        onMounted(async ()=>{
            let res = await getMusicList();
            state.musicList = res.data.result
        })
        return { state,  changeCount};
    },
    };
</script>


<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
        .musicTop{
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title{
                font-size: 0.4rem;
                font-weight: 900;
            }
            .more{
                // 加入边框
                border: 1px solid #ccc;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
        .musicContent{
            width: 100%;
            // 轮播整体区域高度
            height: 3.2rem;
            .my-swpie{
                // 轮播的每块区域高度，即图片加文字
                height: 100%;
                img{
                    width: 95%;
                    height: 2.47rem;
                    border-radius: 0.2rem;
                }
                .playCount{
                    color: aliceblue;
                    position: absolute;
                    left: .9rem;
                    font-size: small;
                    .icon{
                        position: relative;
                        top: .1rem;
                        left: .1rem;
                        fill: #fff;
                    }
                }
                .name{
                    width: 2.47rem;
                    display: flex;
                    justify-content: space-between;
                    font-size: small;
                }
            }
        }
    }
</style>
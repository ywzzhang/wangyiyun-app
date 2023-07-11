<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>


<script>
// import axios from 'axios'
import {getBanner} from '@/request/api/home.js'
import {reactive, onMounted} from 'vue'
export default {
  setup() {
    const state = reactive({
        images:[
    ]});

    // 实例挂载到DOM后运行axios去后端获得轮播图片地址,并将图片地址赋值给images
    onMounted(async ()=>{
    let res = await getBanner();
    state.images = res.data.banners;
    })
    return { state };
  },
};
</script>

<style lang="less">
#swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;
        .van-swipe-item {
            padding: 0 0.2rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }
        .van-swipe__indicator--active {
            background-color: rgb(219, 130, 130);
        }
    }
}
</style>
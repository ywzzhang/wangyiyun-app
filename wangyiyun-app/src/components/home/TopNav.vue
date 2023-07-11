<!-- 头部导航组件 -->
<template>
    <div class="topNav">
        <!-- 头部导航组件的左边：汉堡包图标 -->
        <!-- 使用指定class的div包起来，方便布局 -->
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        

        <!-- 头部导航组件的中间：我的、发现、云村、视频这几个文字 -->
        <!-- 使用span标签：span标签是区域形态，对特定文字做特定排版，只占用自己本身一块空间，不会像div标签那样占用整行空间。 -->
        <div class="topContent">
            <span @click="$router.push('/InfoUser')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
    
        <!-- 头部导航组件的右边：搜索图标 -->
        <div class="topright">
            <svg class="icon" aria-hidden="true" @click="$router.push('/Search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>        
        </div>

    </div>
</template>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // topNav中的topContent
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            // align-items: center;
            font-size: .36rem;
            .active{
                font-weight: 900;
            }
        }
    }
</style>
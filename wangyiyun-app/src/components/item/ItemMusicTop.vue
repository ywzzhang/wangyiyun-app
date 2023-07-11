<template>
    <div>
        <div class="itemMusicTop">
            <img :src="playlist.coverImgUrl" alt="" class="bgimg">
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>

        <div class="itemTopContent">
            <div class="itemTopLeft">
                <img :src="playlist.coverImgUrl" alt="" class="leftimg">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    {{ changeCount(playlist.playCount) }}
                </span>
            </div>

            <div class="itemTopRight">
                <p class="rightP_one">{{ playlist.name }}</p>
                <div class="rightP_two">
                    <img :src="playlist.creator.avatarUrl" alt="" class="rightimg">
                    <span class="username">{{ playlist.creator.nickname }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <div class="rightP_three">
                    <p class="description">{{ playlist.description }}</p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
        </div>

        <div class="itemTopFoot">
            <span class="footItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun-"></use>
                </svg>
                <span>{{ playlist.commentCount }}</span>
            </span>
            <span class="footItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{ playlist.shareCount }}</span>
            </span>
            <span class="footItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                </svg>
                <span>下载</span>
            </span>
            <span class="footItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
                </svg>
                <span>多选</span>
            </span>
        </div>   
    </div>
</template>


<script>
export default {
    setup(props){
        //如果props拿不到数据，就在sessionStorage中读取数据
        // 写代码过程中发现就是creator拿不到数据，应该是层数太深导致的
        if((props.playlist.creator="")){
            props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
        }
        function changeCount(num){
            if (num >= 100000000){
                return (num / 100000000).toFixed(1) + "亿"
            }else if (num >= 10000){
                return (num / 10000).toFixed(1) + "万"
            }
        }
        return {changeCount}
    },
    props:['playlist']
}
</script>


<style lang="less" scoped>
    .itemMusicTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .itemLeft, .itemRight{
            width: 25%;
            height:.64rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 .2rem;
            span{
                font-size: .4rem;
                color: #fff;
            }
            .icon{
                fill: #fff;
            }
        }
        .bgimg{
            width: 100%;
            height: 13rem;
            position: fixed;
            z-index: -1;
            filter: blur(30px);
        }
    }
    .itemTopContent{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        padding: .2rem .2rem;
        .itemTopLeft{
            width: 38%;
            height: 100%;
            color: #fff;
            .leftimg{
                width: 100%;
                border-radius: .2rem;
            }
            .playCount{
                position: absolute;
                left: 1rem;
                .icon{
                    position: relative;
                    top: .1rem;
                    left: .1rem;
                    fill: #fff;
                }
            }
        }
        .itemTopRight{
            width: 58%;
            .rightP_one{
                width: 100%;
                font-weight: 900;
                color: #fff;
                text-align: left;
            }
            .rightP_two{
                width: 100%;
                height: 1rem;
                
                .rightimg{
                    width: 15%;
                    height: .6388rem;
                    border-radius: 100%;
                    position: relative;
                    top:.2rem
                }
                .username{
                    font-size: large;
                    color:#d0d3db;
                    position: relative;
                    top: .05rem;
                    left: .15rem;
                }
                .icon{
                    position: relative;
                    top: .15rem;
                    left: .05rem;
                    fill: #d0d3db;
                }
            }
            .rightP_three{
                height: .7rem;
                display: flex;
                justify-content: space-between;
                .description{
                    width: 85%;
                    overflow: scroll;
                    color: #d0d3db;
                }
                .icon{
                    fill: #d0d3db;
                }
                
            }
        }
    }
    .itemTopFoot{
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: space-around;
        padding-top: .2rem;
        .footItem{
            width: 10%;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            .icon{
                fill: #fff;
            }
        }
    }
</style>
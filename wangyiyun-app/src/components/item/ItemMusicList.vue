<template>
    <div class="itemMusicList">
        <div class="musicListTop">
            <div class="musicListTopLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span class="numberSum">
                    <span class="numberSub">播放全部</span>
                    <span class="number">(共{{ itemlist.length }}首)</span>
                </span>
                
            </div>

            <div class="musicListTopRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span class="subscribedCount">收藏({{ changeCount(subscribedCount) }})</span> 
            </div>
        </div>

        <div class="musicList">
            <div class="musicListItem" v-for="(item1, index1) in itemlist" :key="index1">
                <div class="itemLeft" @click="playMusic(index1)">
                    <span class="leftIdx">{{ index1 + 1 }}</span>
                    <div class="itemName">
                        <span class="musicName">{{ item1.name }}</span>
                        <span class="arName">
                            <span class="arNameItem" v-for="(item2, index2) in item1.ar" :key="index2">
                                {{ item2.name }}
                            </span>
                        </span>
                    </div>  
                </div>

                <span class="itemRight">
                    <svg class="icon_zhibo" aria-hidden="true" v-if="item1.mv != 0">
                        <use xlink:href="#icon-zhibo1"></use>
                    </svg>
                    <svg class="icon_liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    setup(props){
        function changeCount(num){
            if (num >= 100000000){
                return (num / 100000000).toFixed(1) + "亿"
            }else if (num >= 10000){
                return (num / 10000).toFixed(1) + "万"
            }
        }
        return {changeCount}
    },
    props:['itemlist', 'subscribedCount'],
    methods:{
        //更新播放列表和正在播放的歌在播放列表中的位置
        playMusic:function(index){
            this.updatePlayList(this.itemlist)
            this.updatePlayListIndex(index)
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    }
}
</script>

<style lang="less" scoped>
    .itemMusicList{
        width: 100%;
        height: 32rem;
        border-top-left-radius:.4rem;
        border-top-right-radius: .4rem;
        background-color: #fff;
        .musicListTop{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .musicListTopLeft{
                width: 3.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .2rem 0 0 .2rem;
                .numberSum{
                    width: 80%;
                    .numberSub{
                        font-weight: 900
                    }
                    .number{
                        font-size: small;
                        color: #d0d3db;
                    }
                }
            }
            .musicListTopRight{
                width: 2.42rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .15rem 0 .15rem .1rem;
                margin: 0 .1rem 0 0;
                background-color: red;
                color: #d0d3db;
                border-radius: .4rem;
                .icon{
                    fill: #d0d3db;
                }
                .subscribedCount{
                    position: relative;
                    left: -.15rem;
                }
            }
        }
        .musicList{
            width: 100%;
            padding: .2rem .1rem 0 .2rem;
            .musicListItem{
                width: 100%;
                height: 1.47rem;
                padding: .45rem 0 0 0;
                display: flex;
                justify-content: space-between;
                .itemLeft{
                    width: 5.5rem;
                    display: flex;
                    justify-content: space-between;
                    .leftIdx{
                        color: #d0d3db;
                    }
                    .itemName{
                        width: 5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        position: relative;
                        top: -.3rem;
                        .musicName{
                            font-weight: 900;
                        }
                        .arName{
                            display: flex;
                            flex-direction: row;
                            color: #d0d3db;
                            .arNameItem{
                                padding-right: .2rem;
                            }
                        }
                    }
                }
                .itemRight{
                    padding-right: .1rem;
                    .icon_zhibo{
                        width: .55rem;
                        height: .55rem;
                        fill: #d0d3db;
                        margin-right: .2rem;
                    }
                    .icon_liebiao{
                        width: .55rem;
                        height: .55rem;
                        fill: #d0d3db;
                    }
                }
            }
        }
    }
</style>
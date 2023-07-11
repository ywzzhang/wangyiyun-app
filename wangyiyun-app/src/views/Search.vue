<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>

        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
    </div>

    <div class="searchHistory">
        <span class="searchSpan">历史</span>

        <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{ item }}
        </span>

        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>

    <div class="musicList">
        <div class="musicListItem" v-for="(item1, index1) in searchList" :key="index1">
            <div class="itemLeft" @click="updateOneMusic(item1)">
                <span class="leftIdx">{{ index1 + 1 }}</span>
                <div class="itemName">
                    <span class="musicName">{{ item1.name }}</span>
                    <span class="arName">
                        <span class="arNameItem" v-for="(item2, index2) in item1.artists" :key="index2">
                            {{ item2.name }}
                        </span>
                    </span>
                </div>  
            </div>

            <span class="itemRight">
                <svg class="icon_zhibo" aria-hidden="true" v-if="item1.mvid != 0">
                    <use xlink:href="#icon-zhibo1"></use>
                </svg>
                <svg class="icon_liebiao" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
    import {getSearchMusic} from "@/request/api/home.js"
    export default {
        data(){
            return{
                keyWordList: [], //存历史搜索记录
                searchKey: "", //当前搜索内容
                searchList: [], //搜索结果
            }
        },
        mounted(){
            this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
        },
        methods:{
            enterKey:async function(){
                if (this.searchKey !== "") {
                    this.keyWordList.unshift(this.searchKey)
                    this.keyWordList = [...new Set(this.keyWordList)]
                    if (this.keyWordList.length > 10){
                        // this.keyWordList.splice(this.keyWordList.length - 1)
                        this.keyWordList.pop()
                    }
                    localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList))
                    let res = await getSearchMusic(this.searchKey)
                    this.searchList = res.data.result.songs
                    this.searchKey = ""
                }
            },
            delHistory:function(){
                localStorage.removeItem("keyWordList")
                this.keyWordList = []
            },
            searchHistory:async function(item){
                let res = await getSearchMusic(item)
                this.searchList = res.data.result.songs
            },
            updateOneMusic: function(item){
                this.$store.commit("pushPlayList", item) // 将歌曲放入播放列表中
                this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1) //播放列表中最后一首歌，即新增加的这首歌
            },
        },
    }
</script>

<style lang="less" scoped>
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        input{
            margin-left: .2rem;
            border: none;
            border-bottom: 1px solid #999;
            width: 90%;
            padding: .1rem;
        }
    }

    .searchHistory{
        width: 100%;
        padding: .2rem;
        position: relative;
        .searchSpan{
            font-weight: 700;
        }
        .spanKey{
            background-color: rgb(185, 169, 169);
            padding: .1rem .2rem;
            border-radius: .4rem;
            margin: .1rem .2rem;
            display: inline-block;
        }
        .icon{
            width: .4rem;
            height: .4rem;
            position: absolute;
            right: .2rem;
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
</style>
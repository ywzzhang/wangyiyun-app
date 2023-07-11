<template>
    <ItemMusicTop :playlist="state.playlist"/>
    <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"/>
</template>
<script>
    import {useRoute} from 'vue-router'
    import { getMusicItemList, getMusicList } from '@/request/api/item';
    import {reactive, onMounted} from 'vue'
    import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
    import ItemMusicList from '@/components/item/ItemMusicList.vue'
    export default {
    setup() {
        const state = reactive({
            playlist:{},//歌单详情
            itemlist:{},//歌单所有歌曲
        });
        
        // 实例挂载到DOM后运行axios请求
        onMounted(async ()=>{
            let id = useRoute().query.id
            let res = await getMusicItemList(id)
            state.playlist = res.data.playlist
            let result = await getMusicList(id)
            state.itemlist = result.data.songs

            // 页面在歌单详情页刷新时，数据会丢失
            // 只有在首页点进歌单里才能通过props传数据给组件ItemMusicTop.vue
            // 为了在歌单详情页刷新时数据不丢失，需要将数据保存到sessionStorage
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })
        return { state };
    },

    components: {
        ItemMusicTop,
        ItemMusicList,
    }
    };
</script>
// 歌单详情获取后端数据

// 获取歌单详情数据，根据此数据渲染歌单详情页头部
// 歌单详情数据只有10首歌，歌单详情页下半部分的歌曲列表需要所有歌曲，需要获取歌单所有歌曲
import service from "..";
export function getMusicItemList(id){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${id}`,
    })
}

// 获取歌单所有歌曲
export function getMusicList(id){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${id}&limit=20`,
    })
}

// 获取歌曲的歌词
export function getMusicLyric(id){
    return service({
        method:"GET",
        url:`/lyric?id=${id}`,
    })
}
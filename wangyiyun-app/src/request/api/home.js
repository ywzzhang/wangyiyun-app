// 首页获取后端数据

// 获取轮播图数据
import service from "..";
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}

// 获取发现好歌单数据
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10",
    })
}

// 搜索歌曲
export function getSearchMusic(keyword){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${keyword}`,
    })
}

// 二维码登录（二维码key生成）
export function getLoginKey(){
    return service({
        method:"GET",
        url:`/login/qr/key?timestamp=${Date.now()}`,
    })
}

// 二维码登录（二维码图片的base64生成）
export function getLoginImage(key){
    return service({
        method:"GET",
        url:`/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    })
}

// 二维码登录（二维码检测扫码状态）
export function getLoginCheck(key){
    return service({
        method:"GET",
        url:`/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    })
}

// 获取登录状态
export function getLoginStatus(cookie = ''){
    return service({
        method:"POST",
        url:`/login/status?timestamp=${Date.now()}`,
        data: {
            cookie,
        },
    })
}

// 获取登录状态(返回数据不止cookie，还需用户id)
export function getLoginID(cookie = ''){
    return service({
        method:"POST",
        url:`/login/status?timestamp=${Date.now()}&cookie=${cookie}`,
    })
}

// 获取用户详情
export function getLoginUser(id){
    return service({
        method:"POST",
        url:`/user/detail?uid=${id}`,
    })
}
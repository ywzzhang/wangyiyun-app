// 使用数组加函数的方式循环的全局注册vant组件
import { Swipe, SwipeItem, Popup } from 'vant'

let plugins= [
    Swipe, SwipeItem, Popup
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}
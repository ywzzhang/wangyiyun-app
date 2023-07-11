<template>
    <div class="login">
        <div class="loginTop">
            <div class="welcome">
                <span>欢迎登录</span>
            </div>
            <svg class="icon" aria-hidden="true" @click="getLoginCheckin">
                <use xlink:href="#icon-weimingmingwenjianjia_xunhuan"></use>
            </svg>
        </div>
        

        <div class="qrLoginImg">
            <img class="qrimg" alt="">
        </div>
        
        <div class="suggest">
            <span>请使用网易云app扫码登录</span>
        </div>

    </div>
</template>

<script>
    import { getLoginKey } from '@/request/api/home.js';
    import { getLoginImage } from '@/request/api/home.js';
    import { getLoginCheck } from '@/request/api/home.js';
    import { getLoginStatus } from '@/request/api/home.js';
    export default {
        data(){
            return {
                key:"",
            }
        },

        mounted(){
            this.getLoginCheckin() 
        },

        methods:{
            getKey:async function(){
                let res = await getLoginKey()
                this.key = res.data.data.unikey
            },
            
            getImage:async function(){
                await this.getKey()
                let res = await getLoginImage(this.key)
                document.querySelector('.qrimg').src = res.data.data.qrimg
            },

            getLoginCheckin:async function(){
                await this.getImage()
                let interVal = setInterval(async () => {
                    let res = await getLoginCheck(this.key)
                    let statusRes = res.data
                    console.log(res);
                    if (statusRes.code === 800) {
                        alert('二维码已过期,请重新获取')
                        clearInterval(interVal)
                    }
                    if (statusRes.code === 803) {
                        // 这一步会返回cookie
                        clearInterval(interVal)
                        alert('授权登录成功')
                        const cookie = localStorage.getItem('cookie')
                        await getLoginStatus(statusRes.cookie)
                        localStorage.setItem('cookie', statusRes.cookie)
                        this.$store.commit('updateIsLogin', true)
                        this.$router.push('/InfoUser')
                    }
                }, 3000)
            },
        },
    }
</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding-top: 1.0rem;
        .loginTop{
            width: 30%;
            display: flex;
            justify-content: space-between;
            margin: auto;
        }
        .qrLoginImg{
            margin: auto;
        }
        .suggest{
            margin: auto;
        }
    }
</style>
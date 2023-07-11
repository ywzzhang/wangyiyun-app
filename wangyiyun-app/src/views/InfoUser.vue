<template>
    <div class="imfoTop">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>

        <div class="imfoUser">
            <img :src="userImg" alt="" class="userImg">
            <div class="name">{{ userName }}</div>
        </div>
    </div>
    
</template>

<script>
    import { getLoginID } from '@/request/api/home.js';
    import { getLoginUser } from '@/request/api/home.js';
    export default {
        data(){
            return {
                cookie:"",
                userImg:"",
                userName:"",
            }
        },

        mounted(){
            this.cookie = localStorage.getItem('cookie')
            this.getLoginStatusID()
            
        },
        methods:{
            getLoginStatusID:async function(){
                let res = await getLoginID(this.cookie)
                let res1 = await getLoginUser(res.data.data.account.id)
                this.userImg = res1.data.profile.avatarUrl
                this.userName = res1.data.profile.nickname
            },
        },
        
    }
</script>

<style lang="less" scoped>
    .imfoTop{
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .icon{
            width: 5%;
        }
        .imfoUser{
            width: 95%;
            height: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .userImg{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            .name{
                font-weight: 700;
                font-size: .4rem;
            }
        }
    }
</style>
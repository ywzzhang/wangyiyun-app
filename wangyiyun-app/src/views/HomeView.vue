<template>
  <div>
    <!-- 使用组件 -->
    <TopNav/>
    <SwpierTop/>
    <IconList/>
    <MusicList/>
  </div>
</template>


<script>
// @ is an alias to /src
//引入组件
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: 'HomeView',
  // 注册组件
  components: {
    TopNav,
    SwpierTop,
    IconList,
    MusicList,
  }
}
</script>

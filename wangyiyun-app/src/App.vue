<template>
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"/>
</template>

<script>
  import FooterMusic from '@/components/item/FooterMusic.vue';
  export default {
    components:{
      FooterMusic
    }
  }
</script>

<style lang="less">
  //整体布局设计（通配符）
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; //边框和内边距的宽度包含在设定的元素宽度内，设定内边距不会撑大box
  }

  //设置icon图标大小
  .icon {
    width: .5rem;
    height: .5rem;
  }
  a{
    color: black;
  }
</style>

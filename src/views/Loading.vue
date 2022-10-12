<template>
  <div class="loading-wrapper">
    <div class="icon">
      <img :src="logoSvg" alt="logo">
      <el-progress :stroke-width="8" :show-text="false" color="#c2c2c2" :percentage="loadingStep"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {iconfontClassify} from '@/database';
import logoSvg from '@/assets/icon/orange.svg';
import {useRouter} from 'vue-router';
// 路由
const router = useRouter();

// 加载进度
let loadingStep = ref<number>(0)
watch(
  () => loadingStep.value,
  (step) => {
    if (step === 100) {
      router.replace({
        path: '/home'
      })
    }
  }
)

// import {keyDownListener} from "@/event/keyEvent";
// keyDownListener();


setInterval(() => {
  loadingStep.value += 10;
}, 200)



</script>

<style lang="less" scoped>
@import "@/styles/dark.less";
.loading-wrapper {
  width: 100%;
  height: 100%;
  background-color: @aside-bg-color;
  
  display: flex;
  justify-content: center;
  padding-top: 35vh;
  
  > .icon {
    display: flex;
    flex-direction: column;
    
    img{
      width: 200px;
    }
  }
}
</style>
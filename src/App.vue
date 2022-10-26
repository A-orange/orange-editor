<template>
  <router-view/>
  <div id="full-screen-content"></div>
</template>

<script setup lang="ts">
</script>


<style lang="less" scoped>
#full-screen-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  
  &:empty {
    display: none;
  }
}
</style>

<template>
  <div class="orange-editor-wrap">
    <el-container>
      <el-aside :width="showAside ? '240px': '0'">Aside</el-aside>
      <el-container>
        <el-header>
          <el-tooltip :content="(showAside ? '关闭侧边栏': '展开侧边栏') + ' Ctrl + M'" placement="right" effect="light">
            <el-button icon="Notebook" size="small" text circle/>
          </el-tooltip>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="page in breadcrumb"
              :key="page.path"
              :to="{ path: page.path }"
            >
              {{ page.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {intersection} from 'lodash'

// 侧边栏展示隐藏
import {keyDownCode, keyDownListener} from "@/event/keyEvent";
keyDownListener();
const showAside = ref<boolean>(true);
watch(
  () => keyDownCode.value,
  (keyCode) => {
    const nCode = intersection(['Control', 'm'], keyCode);
    if (nCode.length === 2) {
      showAside.value = !showAside.value;
    }
  },
  {
    deep: true
  }
)

// 面包屑
type Breadcrumb = {
  path: string,
  name: string,
}
const breadcrumb = ref<Array<Breadcrumb>>([{path: '/', name: '工作台'}]);



</script>

<style lang="less" scoped>
@import "@/styles/dark.less";
.orange-editor-wrap {
  width: 100%;
  height: 100%;
  background-color: @main-bg-color;
  
  > .el-container {
    height: 100%;
    padding: 0;
    
    > .el-aside {
      background-color: @aside-bg-color;
    }
    
    > .el-container {
      > .el-header {
        padding: 10px 6px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
      }
      
      > .el-main {
        padding: 0;
      }
    }
  }
}
</style>
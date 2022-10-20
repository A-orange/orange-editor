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
        <el-main>
          <auto-complete @createControl="createControl"/>
          <title-control v-model:value="titleControlText" :level="1"/>
          <title-control v-model:value="titleControlText" :level="2"/>
          <title-control v-model:value="titleControlText" :level="3"/>
          <title-control v-model:value="titleControlText" :level="4"/>
          <todo-control v-model:value="todo.finish" :task="todo.task"/>
          <code-editor config="{}"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {intersection} from 'lodash'

import AutoComplete from "@/components/auto-complete/AutoComplete.vue";
import CodeEditor from "@/components/code-editor/CodeEditor.vue";
import TitleControl from "@/components/title/Title.vue";
import TodoControl from "@/components/todo/Todo.vue";

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

// 生成控件
const createControl = ({control, config}: any) => {
  viewLayout.value.push({key: Date.now(), component: CodeEditor, options: {language: config.codeType}})
}
const viewLayout = ref<any>([]);
const titleControlText = ref()
const todo = reactive({
  finish: false,
  task: '任务'
})
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
        padding: 10px;
      }
    }
  }
}
</style>
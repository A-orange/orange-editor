<template>
  <div class="orange-editor-wrap">
    <el-container>
      <el-aside :width="showAside ? '240px': '0'">Aside</el-aside>
      <el-container>
        <el-header>
          <el-tooltip :content="(showAside ? '关闭侧边栏': '展开侧边栏') + ' Ctrl + M'" placement="right"
                      effect="light">
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
          
          <template
            v-for="layout in pageLayout"
            :key="layout.id"
          >
            <CustomWidget
              v-if="!layout.chain"
              v-model:value="layout.value"
              :widget="layout.control"
              :controlId="layout.id"
              :config="layout.config"
            />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {intersection} from 'lodash';
import {useStore} from "vuex";

import AutoComplete from "@/components/AutoComplete/AutoComplete.vue";
import CustomWidget from "@/components/CustomWidget/CustomWidget.vue"
import {widgetComponent} from "@/widget";
// 侧边栏展示隐藏
import {keyDownCode, keyDownListener} from "@/event/keyEvent";
import type {LayoutItem} from "@/store/page";

keyDownListener();
const showAside = ref<boolean>(false);
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
const createControl = ({control, value, config}: any) => {
  viewLayout.value.push({
    key: Date.now(),
    control: control,
    value: value,
    config: {language: config.codeType}
  })
}

const viewLayout = ref<any>([]);

const store = useStore();
const pageLayout = computed<Array<LayoutItem>>(() => store.state.page.layout);

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
        padding: 10px 50px;
        
      }
    }
  }
}
</style>
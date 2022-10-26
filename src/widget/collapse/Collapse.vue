<template>
  <div class="orange-collapse-control">
    <div class="orange-collapse-header">
      <div class="orange-collapse-icon" @click="changeConfig('shrink', null)">
        <icon :size="10" :color="value.length ? '#c2c2c2': '#3c3c3c'" :style="{transform: shrink ? 'rotate(90deg)' : 'rotate(180deg)'}">
          <svg><path d="M512 6.4C505.6 0 492.8 0 480 0s-25.6 0-32 6.4c-12.8 6.4-19.2 19.2-25.6 25.6L6.4 761.6c-12.8 19.2-12.8 44.8 0 64 6.4 12.8 12.8 12.8 25.6 19.2s19.2 6.4 32 6.4h819.2c12.8 0 25.6 0 32-6.4 12.8-6.4 19.2-12.8 25.6-19.2 12.8-19.2 12.8-44.8 0-64L537.6 32C531.2 25.6 524.8 12.8 512 6.4z"></path></svg>
        </icon>
      </div>
      <div
        v-html="title"
        class=" orange-collapse-title"
        contenteditable="true"
        data-placeholder="折叠列表"
        @blur="changeConfig('title', $event)"
        @keydown.delete="deleteControl($event)"
      ></div>
    </div>
    <div v-show="!shrink" :class="['orange-collapse-body', {'orange-collapse-line': value.length && line}]">
      <div v-if="value.length === 0" class="orange-collapse-empty"></div>
      <template
        v-for="(chain, idx) in value"
        :key="typeOf(chain) === 'object' ? chain.id : idx"
      >
        <CustomWidget
          v-if="typeOf(chain) === 'object'"
          v-model:value="chainLayout(chain).value"
          :widget="chainLayout(chain).control"
          :controlId="chainLayout(chain).id"
          :config="chainLayout(chain).config"
          @delete="deleteItem(idx, true)"
        />
        <div
          v-if="typeOf(chain) === 'string'"
          v-html="chain"
          class="orange-collapse-item"
          contenteditable="true"
          data-placeholder="折叠列表项"
          @blur="changeValue($event, idx)"
          @keydown.delete="deleteItem(idx, !$event.target.innerText)"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "vuex";
import CustomWidget from "@/components/CustomWidget/CustomWidget.vue";
import {typeOf} from "@/utils/object";

import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Array,
    default: []
  },
  shrink: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  line: {
    type: Boolean,
    default: true
  },
  controlId: String
})
const emits = defineEmits(['update:value', 'delete'])

const store = useStore();
const chainLayout = computed(() => (args: any) => store.getters.getLayout(args.id));

// 更改配置项
const changeConfig = (type: string, event: any) => {
  switch (type) {
    case 'shrink': {
      store.commit('setLayoutConfig', {
        id: props.controlId,
        key: type,
        value: !props.shrink
      })
    }break;
    case 'title': {
      store.commit('setLayoutConfig', {
        id: props.controlId,
        key: type,
        value: event.target.innerText
      })
    }break;
  }
}
// 更改 value 值
const changeValue = (event: any, index: number) => {
  if (event.target.innerText) {
    props.value[index] = event.target.innerText;
    emits("update:value", props.value);
  }
}

// 删除列表项
const deleteItem = (index: number, isEmpty: boolean) => {
  if (isEmpty) {
    props.value?.splice(index, 1);
    emits("update:value", props.value);
  }
}

// 删除控件
const deleteControl = (event: any) => {
  if (!event.target.innerText) {
    emits('delete');
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";
.orange-collapse-control {
  width: 100%;
  
  > .orange-collapse-header {
    width: 100%;
    display: flex;
    gap: 2px;
  
    > .orange-collapse-icon {
      width: 26px;
      flex-shrink: 0;
      aspect-ratio: 1 / 1;
      cursor: pointer;
    }
    
    > .orange-collapse-title {
      width: 100%;
      flex-shrink: 1;
      line-height: 26px;
    }
  }
  
  > .orange-collapse-body {
    width: calc(100% - 30px);
    margin-left: 30px;
    
    > div {
      padding: 2px;
    }
    
    > .orange-collapse-empty {
      width: 100%;
      padding: 8px 0;
      cursor: pointer;
      &:hover {
        background-color: rgba(55,53,47,.04);
      }
      
      &:after {
        content: '点击创建内容';
        font-size: 16px;
        color: @main-font-placeholder-color;
      }
    }
    
    > .orange-collapse-item {
      line-height: 26px;
      color: @main-font-color;
    }
  }
  
  > .orange-collapse-line {
    position: relative;
    
    &:before {
      content: '';
      display: flex;
      width: 2px;
      height: 100%;
      position: absolute;
      left: -17px;
      background-color: fadeout(#fff, 85%);
    }
  }
}
</style>
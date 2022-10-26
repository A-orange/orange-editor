<template>
  <div
    :class="['orange-ol-control', {'orange-li--control-line': tier && line}]"
    :style="{
        marginLeft: tier ? '30px' : 0
      }"
  >
    <template
      v-for="(li, idx) in value"
      :key="idx"
    >
      <OlWidget
        v-if="typeOf(li) === 'array'"
        v-model:value="value[idx]"
        :index="idx"
        :tier="tier + 1"
        :controlId="controlId"
        :line="line"
        :dot="dot"
      />
      <CustomWidget
        v-if="typeOf(li) === 'object'"
        v-model:value="customLayout(li).value"
        :widget="customLayout(li).control"
        :controlId="customLayout(li).id"
        :config="customLayout(li).config"
      />
      <div
        v-if="typeOf(li) === 'string'"
        class="orange-li-control"
      >
        <div v-if="dot" class="orange-ol-icon">
          {{ countNum(idx) }}
        </div>
        <div class="orange-ol-editable">
          <div
            v-if="typeOf(li) === 'string'"
            class="orange-ol-editor"
            contenteditable="true"
            v-html="li"
            data-placeholder="数字列表"
            @blur="changeEditable($event, idx)"
            @keydown.delete="deleteListItem($event, idx)"
            @keydown.enter.prevent="addListItem(idx)"
            @keydown.tab.prevent="raiseTheHierarchy(idx)"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {computed, defineEmits} from "vue";
import {useStore} from "vuex";

import {typeOf} from "@/utils/object";

const props = defineProps({
  value: {
    type: Array as PropType<Array<any>>,
    default: []
  },
  tier: {
    type: Number,
    default: 0
  },
  line: {
    type: Boolean,
    default: true
  },
  dot: {
    type: Boolean,
    default: true
  },
  index: {
    type: Number,
    default: -1
  },
  controlId: String
})
const emits = defineEmits(['update:value', 'delete']);
const store = useStore();
const isArray = (args: any) => Array.isArray(args);

const customLayout = computed(() => (args: any) => store.getters.getLayout(args.id));

// 更改列表项
const changeEditable = ({target}: any, idx: number) => {
  if (target.innerText) {
    props.value[idx] = target.innerText;
  }
}

const countNum = (idx: number) => {
  let count = 1;
  for (let i = 0; i < idx; i++) {
    if (!Array.isArray(props.value[i])) {
      count++;
    }
  }
  return count;
}

// 删除列表项
const deleteListItem = ({target}: any, idx: number) => {
  if (!target.innerText) {
    props.value[idx] = null;
    emits('update:value', props.value?.filter(Boolean));
    store.commit('filterUlNull', props.controlId);
    emits('delete');
  }
}

// 新增列表项
const addListItem = (idx: number) => {
  props.value?.splice(idx + 1, 0, '');
  emits('update:value', props.value);
}

// 提升层级
const raiseTheHierarchy = (idx: number) => {
  if (Array.isArray(props.value[idx + 1])) {
    props.value?.splice(idx, 1);
    props.value[idx].unshift('');
  } else {
    props.value[idx] = [props.value[idx]];
  }
  emits('update:value', props.value);
}

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'OlWidget'
})
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";

.orange-ol-control {
  > .orange-li-control {
    width: 100%;
    display: flex;
    gap: 2px;
    
    > .orange-ol-icon {
      width: 24px;
      flex-shrink: 0;
      padding: 1px;
      aspect-ratio: 1 / 1;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: @main-font-color;
      
      &:after {
        content: '.';
      }
    }
    
    > .orange-ol-editable {
      width: 100%;
      flex-shrink: 1;
      
      > .orange-ol-editor {
        width: 100%;
        line-height: 26px;
        color: @main-font-color;
        word-break: break-all;
      }
    }
  }
}

.orange-li--control-line {
  position: relative;
  
  &:before {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    left: calc(12px - 30px);
    background-color: fadeout(@main-font-color, 70%);
  }
}
</style>
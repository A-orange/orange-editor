<template>
  <div :class="['orange-todo-control', {'orange-todo-control-finish': [2,3].includes(value)}]">
    <div class="orange-todo-icon" @click="changeState">
      <!-- 未开始 -->
      <icon v-if="step === 0" color="#c2c2c2" :size="24" rule="evenodd">
        <template v-slot>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18.3a6.3 6.3 0 100-12.6 6.3 6.3 0 000 12.6zm0 1.2a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"></path>
          </svg>
        </template>
      </icon>
      <!-- 进行中 -->
      <icon v-if="step === 1" color="#c2c2c2" :size="24" rule="evenodd">
        <template v-slot>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.5 12a1 1 0 11-2 0 1 1 0 012 0zM13 12a1 1 0 11-2 0 1 1 0 012 0zM15.5 13a1 1 0 100-2 1 1 0 000 2z"></path>
            <path
              d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-1.2 0a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"></path>
          </svg>
        </template>
      </icon>
      <!-- 完成 -->
      <icon v-if="step === 2" color="#3a3a38" :size="24" rule="evenodd">
        <template v-slot>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.075 9.398a.7.7 0 00-1.15-.796l-3.977 5.743-1.91-2.293a.7.7 0 10-1.076.896l2.5 3a.7.7 0 001.113-.05l4.5-6.5z"></path>
            <path
              d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-1.2 0a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"></path>
          </svg>
        </template>
      </icon>
      <!-- 关闭 -->
      <icon v-if="step === 3" color="#3a3a38" :size="24" rule="evenodd">
        <template v-slot>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.182 8.818a.7.7 0 00-.99 0l-2.191 2.192-2.192-2.192a.7.7 0 10-.99.99L11.01 12l-2.192 2.192a.7.7 0 00.99.99l2.193-2.192 2.192 2.192a.7.7 0 00.99-.99L12.99 12l2.192-2.192a.7.7 0 000-.99z"></path>
            <path d="M12 19.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0-1.2a6.3 6.3 0 100-12.6 6.3 6.3 0 000 12.6z"></path>
          </svg>
        </template>
      </icon>
    </div>
    <div
      class="orange-todo-task"
      contenteditable="true"
      data-placeholder="代办列表"
      v-html="task"
      @blur="changeTask($event)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useStore} from "vuex";
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  task: {
    type: String,
  },
  controlId: String
})

const emits = defineEmits(['update:value', 'update:config'])
const store = useStore();

const step = ref<number>(props.value);
watch(
  () => props.value,
  (value) => {
    step.value = value;
  },
  {immediate: true}
)

// 更改任务状态
const changeState = () => {
  step.value++;
  if (step.value > 3) {
    step.value = 0;
  }
  emits('update:value', step.value);
}
// 更改任务内容
const changeTask = ({target}: any) => {
  store.commit('setLayoutConfig', {
    id: props.controlId,
    key: 'task',
    value: target.innerText
  })
}
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";

.orange-todo-control {
  height: 32px;
  padding: 3px 2px;
  display: flex;
  gap: 3px;
  
  > .orange-todo-icon {
    height: 100%;
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  > .orange-todo-task {
    width: 100%;
    height: 100%;
    line-height: 26px;
    font-size: 16px;
    flex-shrink: 1;
    cursor: text;
    color: @main-font-color;
    
    &[contenteditable=true] {
      user-modify: read-write-plaintext-only;
      
      &:empty:before {
        content: attr(data-placeholder);
        color: rgb(110, 110, 110);
      }
    }
    
    &:focus-visible {
      outline: none;
    }
  }
}

.orange-todo-control-finish {
  > .orange-todo-task {
    text-decoration: line-through;
    color: fadeout(@main-font-color, 70%);
  }
}
</style>
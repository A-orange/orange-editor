<template>
  <div :class="['orange-todo-control', {'orange-todo-control-finish': value}]">
    <div class="orange-todo-icon" @click="emits('update:value', !value)">
      <icon v-if="value" color="#3a3a38" :size="20">
        <template v-slot>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M833.28 96l-640 0C140.35456 96 97.28 139.07456 97.28 192l0 640c0 52.93056 43.07456 96 96 96l640 0c52.93056 0 96-43.06944 96-96l0-640C929.28 139.07456 886.21056 96 833.28 96zM736.15872 389.79072l-256.22528 259.00544c-0.09728 0.06656-0.18944 0.09728-0.256 0.18944-0.09728 0.06656-0.128 0.19456-0.19456 0.26112-2.048 2.01728-4.54144 3.2-6.94272 4.54144-1.18272 0.64-2.14528 1.664-3.39456 2.18112-3.84 1.536-7.90528 2.33472-11.96544 2.33472-4.096 0-8.22272-0.79872-12.09856-2.40128-1.28-0.51712-2.27328-1.63328-3.52256-2.304-2.36544-1.34656-4.864-2.56-6.88128-4.54656-0.06144-0.06656-0.09728-0.18944-0.15872-0.256-0.06144-0.09728-0.19456-0.09728-0.256-0.18944l-126.01856-129.50528c-12.31872-12.64128-12.032-32.93184 0.64-45.25056 12.64128-12.288 32.896-12.06272 45.25056 0.64L457.40544 580.608 690.688 344.80128c12.416-12.57472 32.70144-12.70272 45.24544-0.256C748.48256 356.992 748.61056 377.24672 736.15872 389.79072z"></path>
          </svg>
        </template>
      </icon>
      <icon v-else color="#c2c2c2" :size="20">
        <template v-slot>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M832 928l-640 0c-52.92544 0-96-43.06944-96-96l0-640c0-52.92544 43.07456-96 96-96l640 0c52.93056 0 96 43.07456 96 96l0 640C928 884.93056 884.93056 928 832 928zM192 160c-17.63328 0-32 14.36672-32 32l0 640c0 17.664 14.36672 32 32 32l640 0c17.664 0 32-14.336 32-32l0-640c0-17.63328-14.336-32-32-32L192 160z"></path>
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
      @keydown.delete="deleteControl($event)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: true
  },
  task: {
    type: String,
  },
  controlId: String
})

const emits = defineEmits(['update:value', 'delete'])

const store = useStore();
const changeTask = ({target}: any) => {
  store.commit('setLayoutConfig', {
    id: props.controlId,
    key: 'task',
    value: target.innerText
  })
}

const deleteControl = (event: any) => {
  if (!event.target.innerText) {
    emits('delete');
  }
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
<template>
  <div class="orange-todo-control">
    <div class="orange-todo-icon" @click="emits('update:value', !value)">
      <icon v-if="value" color="#c2c2c2" :size="10">
        <template v-slot>
          <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M3.955 10c-.35 0-.618-.16-.896-.509L.247 5.938A1.09 1.09 0 010 5.27c0-.487.381-.87.834-.87.289 0 .536.107.762.425l2.317 3.054L8.393.488C8.59.159 8.857 0 9.125 0c.453 0 .875.308.875.806 0 .233-.113.477-.247.69L4.799 9.48c-.216.35-.504.52-.844.52z"></path></svg>
        </template>
      </icon>
       <icon v-else color="#c2c2c2" :size="24">
         <template v-slot>
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill-rule: evenodd;"><path clip-rule="evenodd" d="M16.6 6.2H7.4a1.2 1.2 0 00-1.2 1.2v9.2a1.2 1.2 0 001.2 1.2h9.2a1.2 1.2 0 001.2-1.2V7.4a1.2 1.2 0 00-1.2-1.2zM7.4 5A2.4 2.4 0 005 7.4v9.2A2.4 2.4 0 007.4 19h9.2a2.4 2.4 0 002.4-2.4V7.4A2.4 2.4 0 0016.6 5H7.4z"></path></svg>
         </template>
      </icon>
    </div>
    <div
      class="orange-todo-task"
      contenteditable="true"
      data-placeholder="代办列表"
      v-html="task"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: true
  },
  task: {
    type: String,
  }
})

const emits = defineEmits(['update:value'])
</script>

<style lang="less" scoped>
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
</style>
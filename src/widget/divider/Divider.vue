<template>
  <div
    :class="['orange-divider-control', {'orange-divider-control-empty': !value}]"
    :style="{height: value ? '26px' : '13px'}"
  >
    <div
      class="orange-divider-editor"
      contenteditable="true"
      v-html="value"
      @focus="changeValue($event, true)"
      @blur="changeValue($event, false)"
      @keydown.delete="deleteControl($event)"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  controlId: String
})
const emits = defineEmits(['update:value', 'delete'])

// 更改分割线标题
const changeValue = (event: any, isFocus: boolean) => {
  if (!event.target.innerText && isFocus) {
    event.target.innerText = '分割线'
  }
  emits('update:value', event.target.innerText);
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

.orange-divider-control {
  position: relative;
  width: 100%;
  overflow: hidden;
  
  > .orange-divider-editor {
    min-width: 60px;
    width: auto !important;
    position: absolute;
    left: 20%;
    text-align: center;
    padding: 0 5px;
    
    &:after {
      content: '';
      display: block;
      width: 1920px;
      height: 1px;
      position: absolute;
      left: 100%;
      top: 50%;
      background-color: fadeout(@main-font-color, 70%);
    }
  }
  
  &:before {
    content: '';
    display: block;
    width: 20%;
    height: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: fadeout(@main-font-color, 70%);
    z-index: 10;
  }
}

.orange-divider-control-empty {
  &:before {
    width: 100% !important;
  }
}
</style>
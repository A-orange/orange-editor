<template>
  <div
    :class="['orange-title-control', {'orange-title-control-empty': !isEmpty}]"
    :data-placeholder="titleFontSize[level].label"
    v-html="value"
    contenteditable="true"
    :style="{fontSize: titleFontSize[level].size}"
    @blur="updateValue($event)"
    @input="isEmpty = !!$event.target.innerText"
    @keydown.delete="deleteControl($event)"
  ></div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  level: {
    type: [String, Number],
    default: 1
  }
})
const emits = defineEmits(['update:value', 'delete']);

const titleFontSize = {
  1: {
    size: '28px',
    label: '主标题'
  },
  2: {
    size: '24px',
    label: '大标题'
  },
  3: {
    size: '21px',
    label: '中标题'
  },
  4: {
    size: '18px',
    label: '小标题'
  },
}
const isEmpty = ref(!!props.value);

const updateValue = (event: any) => {
  emits('update:value', event.target.innerText);
}

const deleteControl = (event: any) => {
  if (!event.target.innerText) {
    emits('delete');
  }
}
</script>

<style lang="less" scoped>
.orange-title-control {
  min-height: 1.5em;
  line-height: 1.5em;
  cursor: text;
  font-weight: bolder;
  
  &[contenteditable=true] {
    user-modify: read-write-plaintext-only;
  }
  
  &:focus-visible {
    outline: none;
  }
}

.orange-title-control-empty:before {
  content: attr(data-placeholder);
  font-weight: bolder;
  color: rgb(110, 110, 110);
  cursor: text;
}
</style>
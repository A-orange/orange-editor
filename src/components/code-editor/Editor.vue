<template>
  <div class="orange-editor"
       ref="editorRef"
       v-html="innerText"
       :contenteditable="canEdit"
       @focus="isLocked = true"
       @blur="isLocked = false"
       @input="changeText">
  </div>
</template>
<script setup lang="ts">
import {defineEmits, ref, watch} from "vue";

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  canEdit: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:value'])

const editorRef = ref();
const innerText = ref();
const isLocked = ref(false);

watch(
  () => props.value,
  () => {
    if (!isLocked.value || !innerText.value) {
      innerText.value = props.value;
    }
  },
  {immediate: true}
)

const changeText = () => {
  emit('update:value', editorRef.value.innerHTML);
}
</script>
<style lang="less" scoped>
.orange-editor {
  width: 100%;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  
  &[contenteditable=true] {
    user-modify: read-write-plaintext-only;
    
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>

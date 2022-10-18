<template>
  <div class="orange-code-editor">
    <div class="line-number">
      <div
        class="number"
        v-for="idx in 20"
      >{{ idx }}</div>
    </div>
    <div class="code-view">
    
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CodeEditor"
})
</script>

<style lang="less" scoped>
@import "styles.less";
.orange-code-editor {
  width: 100%;
  padding: 15px 10px;
  border-radius: 3px;
  background-color: @orange-code-editor-bg-color;
  display: flex;
  gap: 20px;
  
  > .line-number {
    width: 20px;
    
    > .number {
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      text-align: right;
    }
  }
}
</style>
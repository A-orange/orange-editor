<template>
  <div class="orange-code-editor-wrap">
    <el-scrollbar :noresize="false" always>
      <div class="orange-code-editor">
        <div class="orange-code-editor-header">
          <span class="language">{{ codeEditor.language }}</span>
        </div>
        <div v-if="codeEditor.showLineNumber" class="line-number">
          <div
              class="number"
              :style="lineNumberStyle"
              v-for="idx in 20"
          >{{ idx }}
          </div>
        </div>
        <div
            class="code-view"
            contenteditable="true"
            :style="codeEditorStyle"
            @input="codeEditor.html=$event.target.innerHTML"
        ></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {editorFonts} from "./fonts/font";
const codeEditor = reactive({
  fontSize: 14,
  showLineNumber: true,
  language: 'Vue',
  wordBreak: true, // 换行
  ligatures: true, // 连字
  fontFamily: 'JetBrains Mono ExtraLight', // 默认字体
  html: ''
})
// 行号样式
const lineNumberStyle = computed(() => {
  return {
    fontSize: codeEditor.fontSize + 'px',
    lineHeight: codeEditor.fontSize * 1.5 + 'px'
  };
})
// 代码编辑器样式
const codeEditorStyle = computed(() => {
  const fontFamily = editorFonts.find(font => {
    return font.label === codeEditor.fontFamily && font.ligatures === codeEditor.ligatures;
  })?.fontFamily;
  return {
    ...lineNumberStyle.value,
    wordBreak: codeEditor.wordBreak ? 'break-all' : 'keep-all',
    fontFamily
  }
})
watch(
    () => codeEditor.html,
    (html) => {
      // const reg = /<div( class=".*?")?>(.*?)<\/div>/gm;
      console.log(html)
    }
)

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CodeEditor"
})
</script>

<style lang="less" scoped>
@import "styles.less";

.orange-code-editor-wrap {
  width: 100%;

  :deep(.orange-code-editor) {
    width: fit-content;
    min-width: 100%;
    padding: 30px 10px 20px;
    border-radius: 3px;
    background-color: @orange-code-editor-bg-color;
    display: flex;
    gap: 20px;
    position: relative;

    > .orange-code-editor-header {
      position: absolute;
      height: 26px;
      top: 0;
      left: 0;
      right: 0;
      padding: 6px 8px 0;
      display: flex;
      justify-content: flex-end;

      > .language {
        font-size: 12px;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 3px;
        color: @orange-code-editor-language-color;
        cursor: pointer;

        &:hover {
          background-color: @orange-code-editor-language-color-hover;
        }
      }
    }

    > .line-number {
      width: 20px;
      flex-shrink: 0;

      > .number {
        font-size: 12px;
        text-align: right;
        color: @orange-code-editor-no-color;
      }
    }

    > .code-view {
      flex-shrink: 1;
      flex-grow: 1;

      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
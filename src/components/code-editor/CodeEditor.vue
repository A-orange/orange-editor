<template>
  <div class="orange-code-editor-wrap">
    <el-scrollbar :noresize="false" always>
      <div class="orange-code-editor">
        <div class="orange-code-editor-header">
          <span class="header-tip">
            <el-autocomplete
                class="code-language"
                v-model="codeEditor.language"
                :fetch-suggestions="fetchLanguage"
                :trigger-on-focus="false"
                size="small"
                popper-class="code-language-popper"
            />
          </span>
          <span class="header-tip" @click="codeEditor.lock = !codeEditor.lock">
            <el-icon v-if="!codeEditor.lock" :size="15" color="#c2c2c2"><Unlock/></el-icon>
            <el-icon v-else :size="15" color="#c2c2c2"><Lock/></el-icon>
          </span>
        </div>
        <div v-if="codeEditor.showLineNumber" class="line-number">
          <div
              class="number"
              :style="lineNumberStyle"
              v-for="idx in lineNumber"
          >{{ idx }}
          </div>
        </div>
        <div
            v-html="codeEditor.lock ? codeEditor.html : codeEditor.code"
            class="code-view"
            :style="codeEditorStyle"
            :contenteditable="!codeEditor.lock"
            @blur="codeEditor.code=$event.target.innerText"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, watch} from "vue";
import {editorFonts} from "./fonts/font";
import {Prism} from "./prism.js";

const codeEditor = reactive({
  fontSize: 14,
  showLineNumber: true,
  language: 'js',
  wordBreak: true, // 换行
  ligatures: true, // 连字
  lock: true, // 锁
  fontFamily: 'JetBrains Mono ExtraLight', // 默认字体
  html: '',
  code: ''
})
// 行数
const lineNumber = computed(() => {
  return codeEditor.code ? codeEditor.code.split('\n').length : 1;
})
// 语言
const languages = computed(() => {
  return Object.keys(Prism.languages).map(key => {
    return {value: key, label: key}
  })
})
// 过滤语言
const fetchLanguage = (query: string, cb: any) => {
  const filterOptions = languages.value.filter(one => {
    return one.value.toLowerCase().indexOf(query.toLowerCase()) === 0;
  })
  cb(filterOptions)
}

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
    () => codeEditor.code,
    (code) => {
      codeEditor.html = Prism.highlight(code, Prism.languages[codeEditor.language]);
    },
    {immediate: true}
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
@import "./themes/code-styles.less";

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

      > .header-tip {
        font-size: 12px;
        line-height: 20px;
        padding: 0 8px;
        border-radius: 3px;
        color: @orange-code-editor-language-color;
        cursor: pointer;
        margin: 0 5px;
        display: flex;
        align-items: center;

        &:hover {
          background-color: @orange-code-editor-language-color-hover;
        }

        > .code-language {
          width: 80px;

          > .el-input > .el-input__wrapper {
            box-shadow: 0 0;

            > .el-input__inner {
              text-align: center;
            }
          }
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
      height: auto;
      flex-shrink: 1;
      flex-grow: 1;
      user-select: text;
      white-space: pre-wrap;
      text-align: left;

      .js();

      &[contenteditable=true] {
        user-modify: read-write-plaintext-only;

        &:empty:before {
          content: attr(placeholder);
          display: block;
          color: #ccc;
        }
      }

      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>

<style lang="less">
@import "../../styles/dark.less";

.code-language-popper {
  background-color: @auto-complete-popper !important;
  opacity: 1 !important;
  margin-top: -10px !important;

  .el-autocomplete-suggestion__wrap {
    padding: 0;
  }

  > .el-popper__arrow:before {
    background-color: @auto-complete-popper !important;
  }
}
</style>
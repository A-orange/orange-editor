<template>
  <div :class="['orange-code-editor-wrap', {'orange-code-editor-wrap-active': !codeEditor.lock}]">
    <el-scrollbar :noresize="false" always>
      <div class="orange-code-editor">
        <div class="orange-code-editor-header">
          <!-- 字体 -->
          <span class="header-tip">
            <drop-menu
              v-model:value="codeEditor.fontFamily"
              :options="codeFamily"
            />
          </span>
          <!-- 语言 -->
          <span class="header-tip">
            <drop-menu
              v-model:value="codeEditor.language"
              :options="languages"
            />
          </span>
          <!-- 源码 -->
          <span class="header-tip" v-show="!codeEditor.lock">
            <icon :size="15">
              <template v-slot>
                <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13063"><path
                  d="M305.6 225.6c-17.6-17.6-43.2-17.6-59.2 0L19.2 460.8c-25.6 30.4-25.6 72 0 97.6l225.6 235.2c8 8 20.8 12.8 30.4 12.8s20.8-4.8 30.4-12.8c17.6-17.6 17.6-43.2 0-59.2L88 512l217.6-225.6c17.6-17.6 17.6-43.2 0-60.8zM1001.6 460.8L774.4 225.6c-17.6-17.6-43.2-17.6-59.2 0s-17.6 43.2 0 59.2L932.8 512 715.2 737.6c-17.6 17.6-17.6 43.2 0 59.2 8 8 17.6 12.8 30.4 12.8 12.8 0 20.8-4.8 30.4-12.8l225.6-235.2c28.8-28.8 28.8-70.4 0-100.8zM612.8 230.4c-20.8-8-46.4 4.8-56 25.6L382.4 742.4c-8 20.8 4.8 46.4 25.6 56 4.8 0 8 4.8 12.8 4.8 17.6 0 33.6-12.8 38.4-30.4l179.2-491.2c8-20.8-4.8-46.4-25.6-51.2z"></path></svg>
              </template>
            </icon>
          </span>
          <!-- 行号 -->
          <span class="header-tip" @click="codeEditor.showNo = !codeEditor.showNo">
            <icon :size="14" :color="codeEditor.showNo? '#c2c2c2': '#333333'">
              <template v-slot>
                <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg"><path
                  d="M217.714286 925.714286q0 45.714286-31.142857 72T109.142857 1024q-60.571429 0-98.285714-37.714286l32.571428-50.285714q28 25.714286 60.571429 25.714286 16.571429 0 28.857143-8.285715T145.142857 929.142857q0-36.571429-60-32l-14.857143-32q4.571429-5.714286 18.571429-24.857143t24.285714-30.857143 21.142857-22v-0.571428q-9.142857 0-27.714285 0.571428t-27.714286 0.571429v30.285714H18.285714v-86.857143h190.285715v50.285715l-54.285715 65.714285q29.142857 6.857143 46.285715 28t17.142857 50.285715z m1.142857-358.285715v90.857143H12q-3.428571-20.571429-3.428571-30.857143 0-29.142857 13.428571-53.142857T54.285714 535.428571t37.714286-27.142857 32.285714-24.857143 13.428572-25.714285q0-14.285714-8.285715-22T106.857143 428q-26.285714 0-46.285714 33.142857l-48.571429-33.714286q13.714286-29.142857 40.857143-45.428571T113.142857 365.714286q41.714286 0 70.285714 23.714285T212 453.714286q0 28.571429-19.428571 52.285714T149.714286 542.857143t-43.142857 28.857143T86.285714 601.714286h72.571429v-34.285715h60z m805.142857 182.285715v109.714285q0 7.428571-5.428571 12.857143t-12.857143 5.428572H310.857143q-7.428571 0-12.857143-5.428572T292.571429 859.428571v-109.714285q0-8 5.142857-13.142857t13.142857-5.142858h694.857143q7.428571 0 12.857143 5.428572t5.428571 12.857143zM219.428571 236v56.571429H28v-56.571429h61.142857q0-23.428571 0.285714-69.714286t0.285715-69.142857v-6.857143h-1.142857q-4.571429 9.714286-28.571429 30.857143l-40.571429-43.428571L97.142857 5.142857h60.571429v230.857143h61.714285z m804.571429 221.142857v109.714286q0 7.428571-5.428571 12.857143t-12.857143 5.428571H310.857143q-7.428571 0-12.857143-5.428571T292.571429 566.857143V457.142857q0-8 5.142857-13.142857t13.142857-5.142857h694.857143q7.428571 0 12.857143 5.428571t5.428571 12.857143z m0-292.571428v109.714285q0 7.428571-5.428571 12.857143T1005.714286 292.571429H310.857143q-7.428571 0-12.857143-5.428572T292.571429 274.285714V164.571429q0-7.428571 5.428571-12.857143T310.857143 146.285714h694.857143q7.428571 0 12.857143 5.428572t5.428571 12.857143z"></path></svg>
              </template>
            </icon>
          </span>
          <!-- 换行 -->
          <span class="header-tip" @click="codeEditor.wordBreak = !codeEditor.wordBreak">
            <icon :size="14" :color="codeEditor.wordBreak? '#c2c2c2': '#333333'">
              <template v-slot>
                <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16462"><path
                  d="M64 64h704v192H64zM62.72 764.416H960V960H62.72z" p-id="16463"></path><path
                  d="M895.872 64v403.904H320.128V399.488L191.872 501.504 320.128 608V535.168h639.744V64z"></path></svg>
              </template>
            </icon>
          </span>
          <!-- 复制 -->
          <span class="header-tip" @click="copyCode">
            <icon :size="14" color="#c2c2c2">
              <template v-slot>
                <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17386"><path
                  d="M768 384h-128V241.92A114.346667 114.346667 0 0 0 526.08 128H241.92A114.346667 114.346667 0 0 0 128 241.92v284.16A114.346667 114.346667 0 0 0 241.92 640H384v128a128 128 0 0 0 128 128h256a128 128 0 0 0 128-128v-256a128 128 0 0 0-128-128z m-384 128v42.666667H241.92a28.586667 28.586667 0 0 1-28.586667-28.586667V241.92A28.586667 28.586667 0 0 1 241.92 213.333333h284.16a28.586667 28.586667 0 0 1 28.586667 28.586667V384h-42.666667a128 128 0 0 0-128 128z"></path></svg>
              </template>
            </icon>
          </span>
        </div>
        <div v-if="codeEditor.showNo" class="line-number">
          <div
            class="number"
            :style="lineNumberStyle"
            v-for="idx in lineNumber"
          >{{ idx }}
          </div>
        </div>
        <div
          ref="codeEditorRef"
          v-html="codeEditor.lock ? codeEditor.html : codeEditor.code"
          class="code-view"
          :style="codeEditorStyle"
          :contenteditable="!codeEditor.lock"
          @blur="editorBlur($event)"
          @click="codeEditor.lock = false"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, reactive, ref, watch} from "vue";
import {editorFonts} from "./themes/fonts/font";
// @ts-ignore
import {Prism} from "./prism.js";
import DropMenu from "@/components/DropMenu/DropMenu.vue";
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  config: {
    type: Object,
    required: true,
    default: {
      showNo: true,
      language: 'json',
      wordBreak: true,
      fontFamily: 'JetBrains Mono ExtraLight'
    }
  }
})

const emits = defineEmits(['update:value', 'update:config'])

const codeEditorRef = ref();
// 文本编辑器 属性
const codeEditor = reactive({
  fontSize: 14,
  showNo: props.config?.showNo || true,
  language: props.config?.language || 'json',
  wordBreak: props.config?.wordBreak || true, // 换行
  lock: false, // 锁
  fontFamily: props.config?.fontFamily || 'JetBrains Mono ExtraLight', // 默认字体
  html: '',
  code: props.value
})
const codeFamily = editorFonts.map(font => {
  return {
    key: font.fontFamily,
    label: font.label
  }
})
//*************************** 行数 **********************************//
const lineNumber = computed(() => {
  return codeEditor.code ? codeEditor.code.split('\n').length : 1;
})

//*************************** 语言 **********************************//
const languages = computed(() => {
  // 添加 vue 语言支持
  Prism.languages['Vue'] = Prism.languages.js;
  return Object.keys(Prism.languages).map(key => {
    return {key: key, label: key}
  })
})

//*************************** 样式 **********************************//
// 行号
const lineNumberStyle = computed(() => {
  const fontFamily = editorFonts.find(font => {
    return font.fontFamily === codeEditor.fontFamily;
  })?.fontFamily;
  return {
    fontSize: codeEditor.fontSize + 'px',
    lineHeight: codeEditor.fontSize * 1.5 + 'px',
    fontFamily: fontFamily
  };
})
// 代码编辑器
const codeEditorStyle = computed(() => {
  return {
    ...lineNumberStyle.value,
    wordBreak: codeEditor.wordBreak ? 'break-all' : 'keep-all',
  }
})


// 编辑器失焦
const editorBlur = (event: any) => {
  codeEditor.code = event.target.innerText;
  codeEditor.lock = true;
}

// 代码文本更改 重新生成 html
watch(
  () => [codeEditor.code, codeEditor.language],
  () => {
    const language = codeEditor.language;
    if (language) {
      codeEditor.html = Prism.highlight(
        codeEditor.code,
        Prism.languages[language],
        language
      );
    }
    emits('update:value', codeEditor.code);
  },
  {immediate: true}
)

watch(
  () => [codeEditor.showNo , codeEditor.language, codeEditor.wordBreak, codeEditor.fontFamily],
  () => {
    emits('update:config', {
      showNo: codeEditor.showNo,
      language: codeEditor.language,
      wordBreak: codeEditor.wordBreak,
      fontFamily: codeEditor.fontFamily
    })
  }
)

// copy 源码
const copyCode = () => {
  const copyInput = document.createElement('textarea');
  copyInput.value = codeEditor.code;
  document.body.appendChild(copyInput);
  copyInput.select();
  document.execCommand('copy');
  document.body.removeChild(copyInput);
}

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CodeEditor"
})
</script>

<style lang="less" scoped>
@import "./themes/styles.less";
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
    font-family: 'JetBrains Mono Light', serif;
    
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
        margin: 0;
        visibility: visible;
        display: flex;
        align-items: center;
        
        &:hover {
          background-color: @orange-code-editor-language-color-hover;
        }
      }
      
      > .language {
        display: block;
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

//.orange-code-editor-wrap-active {
//  :deep(.orange-code-editor) > .orange-code-editor-header > .header-tip {
//    visibility: visible;
//  }
//}
</style>
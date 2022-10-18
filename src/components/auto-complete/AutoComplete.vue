<template>
  <div class="orange-auto-complete">
    <el-input
      v-if="!showAutoComplete"
      ref="inputRef"
      v-model="inputValue"
      placeholder="键入文字或 '/' 选择"
      @keydown.enter="createTextControl"
    />
    <el-autocomplete
      v-else
      ref="autoCompleteRef"
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      popper-class="orange-auto-complete-popper"
      @select="createControlConfig"
    >
      <template v-slot="{ item }">
        <div class="select-option-item">
          <span class="icon">{{ item.icon }}</span>
          <span class="label">{{ item.label }}</span>
          <span class="code">{{ item.code }}</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, ref, watch} from "vue";
import type {ControlItem} from './controls';
import {controls} from "./controls";

const emit = defineEmits(['createControl'])

const inputRef = ref<HTMLElement>();
const autoCompleteRef = ref<HTMLElement>();
const inputValue = ref<string>('');

// 显示 input 或 下拉选组件
const showAutoComplete = computed(() => {
  return inputValue.value?.startsWith('/');
})
// 过滤下拉选
const querySearch = (query: string, cb: any) => {
  const filterOptions = controls.filter(one => {
    return one.code.toLowerCase().indexOf(query.toLowerCase()) === 0;
  })
  cb(filterOptions)
}
watch(
  () => inputValue.value,
  (value) => {
    if (!showAutoComplete.value && value?.endsWith(' ')) {
      createControl(value);
    }
  }
)
// 通过输入 标签 + 空格 生成控件
const createControl = (value: string) => {
  let control: ControlItem | null = null;
  outer:
    for (let i = 0; i < controls.length; i++) {
      const {keyType, keyCode, ...args} = controls[i];
      switch (keyType) {
        case "string": {
          if (keyCode?.includes(value.trim())) {
            control = args;
            break outer;
          }
        }
          break;
        case "regExp": {
          const match = keyCode?.some(regStr => new RegExp(regStr).test(value.trim()));
          if (match) {
            control = args;
            break outer;
          }
        }
          break;
        default:
      }
    }
  control && createControlConfig(control);
}

// 生成控件参数
const createControlConfig = (control: ControlItem) => {
  const {type} = control;
  const config: Record<string, any> = {};
  switch (type) {
    case 'code': {
      config['codeType'] = inputValue.value.trim().slice(3);
    }break;
    case 'ol': {
      config['startWidth'] = inputValue.value.trim().slice(0,-1);
    }break;
    default: {
      config['text'] = inputValue.value;
    }
  }
  emit('createControl', {control, config})
}


// 普通输入 创建 文本控件
const createTextControl = () => {
  emit('createControl', {
    control: controls[0],
    config: {
      text: inputValue.value
    }
  })
}

// 获取焦点
watch(
  () => showAutoComplete.value,
  (showComplete) => {
    nextTick(() => {
      if (showComplete) {
        autoCompleteRef.value?.focus();
      } else {
        inputRef.value?.focus();
      }
    })
  }
)
</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "AutoComplete"
})
</script>

<style lang="less" scoped>
.orange-auto-complete {
  width: 100%;
  
  > :deep(.el-input) {
    > .el-input__wrapper {
      padding: 0;
      box-shadow: 0 0;
    }
  }
  
  > :deep(.el-autocomplete) {
    width: 100%;
    
    > .el-input {
      width: 305px;
      
      > .el-input__wrapper {
        padding: 0;
        box-shadow: 0 0;
      }
    }
  }
}
</style>

<style lang="less">
@import "../../styles/dark.less";

.orange-auto-complete-popper {
  background-color: @auto-complete-popper !important;
  
  > .el-autocomplete-suggestion > .el-scrollbar > .el-autocomplete-suggestion__wrap > .el-autocomplete-suggestion__list {
    padding: 0 6px !important;
    
    > li {
      padding: 0 5px;
      border-radius: 3px;
      
      > .select-option-item {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        
        > .icon {
          width: 20px;
          flex-shrink: 0;
        }
        
        > .label {
          flex-grow: 1;
          flex-shrink: 1;
        }
        
        > .code {
          flex-shrink: 0;
        }
      }
      
      &:hover {
        background-color: @auto-complete-popper-hover;
      }
    }
  }
  
  > .el-popper__arrow {
    display: none;
  }
}
</style>
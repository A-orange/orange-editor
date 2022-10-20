<template>
  <el-dropdown
    :max-height="0"
    popper-class="orange-drop-down-popper"
    @command="chooseMenu"
  >
    <span class="orange-drop-down-label">
      {{ dropShowLabel }}
    </span>
    <template #dropdown>
      <div class="orange-drop-down-popper-content">
        <div class="orange-drop-down-popper-search">
          <el-input v-model="search" size="default" placeholder="键入关键字搜索"/>
        </div>
        <div class="orange-drop-down-popper-menu">
          <el-scrollbar :max-height="250">
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in filterOptions"
                :key="item.key"
                :command="item.key"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-scrollbar>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {computed, defineEmits, defineProps, ref, watch} from "vue";

type DropOptionItem = {
  key: string,
  label: string,
  disabled?: boolean
}
const props = defineProps({
  options: {
    type: Array as PropType<Array<DropOptionItem>>,
    default: []
  },
  value: {
    type: String,
  }
})
const emits = defineEmits(['update:value']);

const filterOptions = ref<Array<DropOptionItem>>([]);
const optionMap = ref<Record<string, any>>({});
const search = ref<string>('');
watch(
  () => props.options,
  (options) => {
    options?.forEach(({key, label}) => {
      optionMap.value![key] = label;
    })
  },
  {deep: true, immediate: true}
)
watch(
  () => search.value,
  (search) => {
    filterOptions.value = props.options?.filter(one => {
      return one.label.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
  },
  {immediate: true}
)
const dropShowLabel = computed(() => {
  return props.value ? optionMap.value[props.value] : "未指定";
})

const chooseMenu = (key: string) => {
  emits('update:value', key);
}
</script>

<style lang="less">
@import "../../styles/dark.less";

.orange-drop-down-popper {
  background-color: @auto-complete-popper !important;
  border: 0 !important;
  
  .orange-drop-down-popper-content {
    min-width: 210px;
    padding: 10px 0;
    
    > .orange-drop-down-popper-search {
      padding: 0 10px;
      
      .el-input__wrapper {
        box-shadow: 0 0 0 1px @modal-aside-border-color inset !important;
      }
    }
    
    > .orange-drop-down-popper-menu {
      padding-top: 10px;
      
      .el-dropdown-menu {
        background-color: transparent !important;
        
        .el-dropdown-menu__item:not(.is-disabled):focus {
          background-color: @auto-complete-popper-hover !important;
          color: @main-font-color !important;
        }
      }
    }
  }
  
  > .el-popper__arrow:before {
    background-color: @auto-complete-popper !important;
    border: 0 !important;
  }
}
</style>
<template>
  <div class="orange-custom-widget">
    <div class="orange-custom-widget-tool" @click="chooseWidget" v-click-outside:[]="clearActive">
      <icon :size="24" color="#BCB3B3" viewBox="0 0 24 24">
        <svg><path d="M8.389 13.824c1.026 0 1.809.786 1.809 1.8 0 .979-.818 1.8-1.81 1.8a1.81 1.81 0 01-1.79-1.8c0-.996.808-1.8 1.79-1.8zm7.2 0c1.026 0 1.809.786 1.809 1.8 0 .979-.818 1.8-1.81 1.8a1.81 1.81 0 01-1.79-1.8c0-.996.808-1.8 1.79-1.8zm0-7.2c1.026 0 1.809.786 1.809 1.8 0 .979-.818 1.8-1.81 1.8a1.81 1.81 0 01-1.79-1.8c0-.996.808-1.8 1.79-1.8zm-7.2 0c1.026 0 1.809.786 1.809 1.8 0 .979-.818 1.8-1.81 1.8a1.81 1.81 0 01-1.79-1.8c0-.996.808-1.8 1.79-1.8z" fill="#BCB3B3" fill-rule="nonzero"></path></svg>
      </icon>
    </div>
    <div :class="['orange-custom-widget-content', {'orange-custom-widget-content-active': active}]">
      <component
        :is="widgetComponent[widget]"
        v-model:value="value"
        :controlId="controlId"
        v-bind="config"
        @delete="$emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Icon from "@/components/Icon/Icon.vue";
import {widgetComponent} from "@/widget";

const props = defineProps({
  value: {
    type: [Number, String, Array, Object],
    default: ''
  },
  widget: String,
  config: Object,
  controlId: String
})

const emits = defineEmits(['update:value', 'delete'])

const active = ref(false);
const chooseWidget = () => {
  active.value = true;
}
const clearActive = () => {
  active.value = false;
}
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";
.orange-custom-widget {
  width: 100%;
  position: relative;
  
  &:hover {
    > .orange-custom-widget-tool {
      display: block;
    }
  }
  
  > .orange-custom-widget-tool {
    display: none;
    height: 32px;
    width: 32px;
    padding: 4px;
    position: absolute;
    transform: translateX(-100%);
    cursor: pointer;
    z-index: 10000;
    
    &:hover {
      background-color: #242424;
      background-clip: content-box;
    }
  }
  
  > .orange-custom-widget-content {
    width: 100%;
    color: @main-font-color;
  }
  
  > .orange-custom-widget-content-active {
    border-radius: 3px;
    background-color: fadeout(#ff0000, 85%);
    background-clip: content-box;
  }
}
</style>
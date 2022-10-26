<template>
  <span ref="iconRef" class="orange-icon">
    <slot />
  </span>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
const props = defineProps({
  size: {
    type: Number,
    default: 14
  },
  color: {
    type: String,
    default: 'currentcolor'
  },
  rule: {
    type: String,
    default: 'nonzero'
  },
  viewBox: {
    type: String,
    default: '0 0 1024 1024'
  }
})

const iconRef = ref<HTMLElement>();

watch(
  () => {
    return [props.color, props.size];
  },
  () => {
    nextTick(() => redraw());
  },
  {immediate: true}
)

const redraw = () => {
  const svg = iconRef.value?.querySelector('svg');
  if (svg) {
    svg.style.width = props.size + 'px';
    svg.style.height = props.size + 'px';
    svg.style.verticalAlign = 'middle';
    svg.style.overflow = 'hidden';
    svg.style.fillRule = props.rule;
    svg.style.fill = props.color;
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', props.viewBox);
  }
}
</script>

<style lang="less" scoped>
.orange-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
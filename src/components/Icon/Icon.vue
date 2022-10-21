<template>
  <span ref="iconRef" class="orange-icon">
    <slot />
  </span>
</template>

<script setup lang="ts">
import {defineProps, nextTick, ref, watch} from "vue";
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
  }
}
</script>

<style scoped>

</style>
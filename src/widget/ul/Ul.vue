<template>
  <div class="orange-ul-control">
    <template
      v-for="(li, idx) in value"
      :key="idx"
    >
      <div v-if="typeof li === 'string'" class="orange-li-control">
        <div class="orange-ul-icon">
          <icon :size="24">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path></svg>
          </icon>
        </div>
        <div
          class="orange-ul-editable"
          contenteditable="true"
        >
    
        </div>
      </div>
      <ul-control v-if="typeof li === 'object'" :value="li"/>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";
import type {PropType} from "vue";
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Array as PropType<Array<string>>,
    default: []
  },
  controlId: String
})
const emits = defineEmits(['update:value']);

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'UlControl'
})
</script>

<style lang="less" scoped>
.orange-ul-control {
  > .orange-li-control {
    width: 100%;
    display: flex;
    gap: 2px;
    
    > .orange-ul-icon {
      width: 24px;
      flex-shrink: 0;
      padding: 1px;
      aspect-ratio: 1 / 1;
    }
  
    > .orange-ul-editable {
      width: 100%;
      flex-shrink: 1;
      line-height: 26px;
      word-break: break-all;
    }
  }
}
</style>
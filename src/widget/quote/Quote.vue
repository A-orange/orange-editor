<template>
  <div class="orange-quote-control">
    <div
      v-if="typeOf(value) === 'string'"
      class="orange-quote-editor"
      contenteditable="true"
      data-placeholder="引述文字"
      v-html="value"
      @keydown.delete="deleteControl(!$event.target.innerText)"
      @blur="changeValue($event)"
    ></div>
    <CustomWidget
      v-if="typeOf(value) === 'object'"
      v-model:value="customLayout(value).value"
      :widget="customLayout(value).control"
      :controlId="customLayout(value).id"
      :config="customLayout(value).config"
      @delete="deleteControl(true)"
    />
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "vuex";
import {typeOf} from "@/utils/object";

const props = defineProps({
  value: {
    type: [String, Object],
    default: ""
  },
  controlId: String
})
const emits = defineEmits(['update:value', 'delete'])

const store = useStore();
const customLayout = computed(() => (args: any) => store.getters.getLayout(args.id));

// 更改内容
const changeValue = (event: any) => {
  emits('update:value', event.target.innerText);
}

// 删除控件
const deleteControl = (isEmpty: boolean) => {
  if (isEmpty) {
    emits('delete');
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";
.orange-quote-control {
  min-height: 42px;
  padding: 8px 2px 8px 20px;
  position: relative;
  
  &:before {
    content: '';
    display: block;
    width: 4px;
    height: (100% - 32px);
    position: absolute;
    left: 2px;
    top: 8px;
    border-radius: 2px;
    background-color: fadeout(@main-font-color, 70%);
  }
}
</style>
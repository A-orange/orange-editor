<template>
  <div
    :class="['orange-ul-control', {'orange-li--control-line': tier && line}]"
    :style="{
        marginLeft: tier ? '30px' : 0
      }"
  >
    <template
      v-for="(li, idx) in value"
      :key="idx"
    >
      <UlWidget
        v-if="typeOf(li) === 'array'"
        v-model:value="value[idx]"
        :index="idx"
        :tier="tier + 1"
        :controlId="controlId"
        :line="line"
        :dot="dot"
      />
      <CustomWidget
        v-if="typeOf(li) === 'object'"
        v-model:value="customLayout(li).value"
        :widget="customLayout(li).control"
        :controlId="customLayout(li).id"
        :config="customLayout(li).config"
      />
      <div
        v-if="typeOf(li) === 'string'"
        class="orange-li-control"
      >
        <div v-if="dot" class="orange-ul-icon">
          <icon v-if="tier % 3 === 0" :size="24" color="#c2c2c2" viewBox="0 0 24 24">
            <svg>
              <path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
            </svg>
          </icon>
          <icon v-if="tier % 3 === 1" :size="8" color="#ffffff">
            <svg>
              <path
                d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"></path>
            </svg>
          </icon>
          <icon v-if="tier % 3 === 2" :size="6" color="#c2c2c2">
            <svg>
              <path
                d="M830.464 63.488q26.624 0 50.176 12.288t41.472 31.232 28.672 43.008 10.752 46.592l0 635.904q0 23.552-11.264 46.592t-30.208 41.472-43.008 30.208-48.64 11.776l-641.024 0q-22.528 0-44.544-10.752t-39.424-28.16-28.16-40.96-10.752-50.176l0-633.856q0-25.6 10.752-50.176t29.696-43.52 43.52-30.208 52.224-11.264l629.76 0z"></path>
            </svg>
          </icon>
        </div>
        <div
          class="orange-ul-editable"
          contenteditable="true"
          v-html="li"
          data-placeholder="列表"
          @blur="changeEditable($event, idx)"
          @keydown.delete="deleteListItem($event, idx)"
          @keydown.enter.prevent="addListItem(idx)"
          @keydown.tab.prevent="raiseTheHierarchy(idx)"
        ></div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {computed} from "vue";
import {useStore} from "vuex";

import {typeOf} from "@/utils/object";
import Icon from "@/components/Icon/Icon.vue";

const props = defineProps({
  value: {
    type: Array as PropType<Array<any>>,
    default: []
  },
  tier: {
    type: Number,
    default: 0
  },
  line: {
    type: Boolean,
    default: true
  },
  dot: {
    type: Boolean,
    default: true
  },
  index: {
    type: Number,
    default: -1
  },
  controlId: String
})
const emits = defineEmits(['update:value', 'delete']);

const store = useStore();
const isArray = (args: any) => Array.isArray(args);

const customLayout = computed(() => (args: any) => store.getters.getLayout(args.id));

// 更改列表项
const changeEditable = ({target}: any, idx: number) => {
  if (target.innerText) {
    props.value[idx] = target.innerText;
  }
}

// 删除列表项
const deleteListItem = ({target}: any, idx: number) => {
  if (!target.innerText) {
    props.value[idx] = null;
    emits('update:value', props.value?.filter(Boolean));
    store.commit('filterUlNull', props.controlId);
    emits('delete');
  }
}

// 新增列表项
const addListItem = (idx: number) => {
  props.value?.splice(idx + 1, 0, '');
  emits('update:value', props.value);
}

// 提升层级
const raiseTheHierarchy = (idx: number) => {
  if (Array.isArray(props.value[idx + 1])) {
    props.value?.splice(idx, 1);
    props.value[idx].unshift('');
  } else {
    props.value[idx] = [props.value[idx]];
  }
  emits('update:value', props.value);
}

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'UlWidget'
})
</script>

<style lang="less" scoped>
@import "../../styles/dark.less";

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
      color: @main-font-color;
      word-break: break-all;
    }
  }
}

.orange-li--control-line {
  position: relative;
  
  &:before {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    left: calc(12px - 30px);
    background-color: fadeout(@main-font-color, 70%);
  }
}
</style>
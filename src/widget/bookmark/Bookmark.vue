<template>
  <div
      class="orange-bookmark-control"
      v-loading="urlData.loading"
      element-loading-background="rgba(122, 122, 122, 0.4)"
      :style="{borderColor: urlData.theme}"
  >
    <div class="orange-bookmark-text">
      <div class="orange-bookmark-header">
        <div class="orange-bookmark_ico">
          <img :src="urlData.icon" :alt="urlData.title">
        </div>
        <div
            class="orange-bookmark_title orange-ellipsis"
            contenteditable="true"
            :style="{color: urlData.theme}"
            @keydown.enter.prevent="(ev) => changeConfig('title', ev.target)"
            @blur="(ev) => changeConfig('title', ev.target)"
        >
          {{ urlData.title }}
        </div>
      </div>
      <div
          class="orange-bookmark_description orange-ellipsis"
          contenteditable="true"
          @keydown.enter.prevent="(ev) => changeConfig('description', ev.target)"
          @blur="(ev) => changeConfig('description', ev.target)"
      >
        {{ urlData.description }}
      </div>
      <div
          class="orange-bookmark_url"
      >
        <a
            class="orange-ellipsis"
            :href="urlData.url"
            target="_blank"
            :contenteditable="urlData.edit"
            @keydown.enter.prevent="(ev) => changeConfig('url', ev.target)"
            @blur="(ev) => changeConfig('url', ev.target)"
        >
          {{ urlData.url }}
        </a>
        <el-icon><CopyDocument @click="copyToClipboard(urlData.url)"/></el-icon>
        <el-icon @click="urlData.edit = true"><EditPen /></el-icon>
      </div>
    </div>
    <div class="orange-bookmark-images"></div>
  </div>
</template>

<script lang="ts" setup>
import {getUrlData} from "@/api/request";
import {reactive, watch} from "vue";
import {copyToClipboard} from "@/utils/object";

const props = defineProps({
  value: {
    type: String,
    default: []
  },
  controlId: String,
  config: {
    type: Object,
    default: {
      title: '',
    }
  }
})
const emits = defineEmits(['update:value']);

// 网址数据
const urlData = reactive({
  title: '',
  url: '',
  description: '',
  theme: '',
  icon: '',
  images: <Array<string>>[],
  loading: false,
  edit: false
})

// 获取网址数据
const getUrlInformation = (url: string) => {
  urlData.loading = true;
  getUrlData({url}).then((res: any) => {
    urlData.loading = false;
    const {
      links: {icon} = {icon: {}},
      meta
    } = res.data || {};
    urlData.title = meta.title || props.config.title;
    urlData.url = meta.canonical || props.value;
    urlData.theme = meta['theme-color'];
    urlData.description = meta.description;
    if (Array.isArray(icon) && icon.length) {
      urlData.icon = icon.splice(0, 1)[0].href;
      urlData.images = icon.map(o => o.href);
    }
  }).catch(() => urlData.loading = false);
}

watch(
    () => props.value,
    (url) => {
      if (url) {
        getUrlInformation(url)
      }
    },
    {immediate: true}
)

// 更改配置项
const changeConfig = (type: string, el: HTMLElement) => {
  switch (type) {
    case 'title': {
      urlData.title = el.innerText;
    }
      break;
    case 'description': {
      urlData.description = el.innerText;
    }
      break;
    case 'url': {
      urlData.url = el.innerText;
      urlData.edit = false;
    }
      break;
  }
}

</script>

<style lang="less" scoped>
@import "../../styles/dark.less";

.orange-bookmark-control {
  width: 100%;
  padding: 16px;
  border: 1px solid @modal-bookmark-border-color;
  border-radius: 4px;
  background-color: @auto-complete-popper;
  display: flex;
  cursor: pointer;

  > .orange-bookmark-text {
    width: 100%;
    flex-shrink: 1;

    > .orange-bookmark-header {
      font-size: 16px;
      color: @main-title-color;
      font-weight: bolder;
      display: flex;
      align-items: center;
      gap: 10px;

      > .orange-bookmark_ico {
        width: 24px;
        height: 24px;

        > img {
          height: 100%;
        }
      }
    }

    > .orange-bookmark_description {
      font-size: 12px;
      color: @main-description-color;
    }

    > .orange-bookmark_url {
      position: relative;
      line-height: 20px;
      display: flex;
      gap: 10px;
      align-items: center;

      > a {
        font-size: 12px;
        color: @main-title-color;

        &:hover {
          color: @main-font-color;
          text-decoration: underline;
        }
      }

      .el-icon {
        display: none;
      }

      &:hover .el-icon{
        display: block;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  > .orange-bookmark-images {
    flex-shrink: 0;
  }
}
</style>
// 当前编辑页面

import {rnd} from "@/utils/string";

export type LayoutItem = {
  id: string,
  control: string,
  value: string | boolean | number,
  config: {
    [key in string]: any
  }
}

export const page = {
  state: () => ({
    layout: <Array<LayoutItem>>[// 代办列表
      {
        id: rnd(),
        control: 'todo',
        value: true,
        config: {
          task: '代办列表',
        }
      },
      {
        id: rnd(),
        control: 'todoPro',
        value: 0,
        config: {
          task: '高级代办列表',
        }
      },
      // 主标题
      {
        id: rnd(),
        control: 'title',
        value: '主标题控件',
        config: {
          level: 1,
        }
      },
      {
        id: rnd(),
        control: 'title',
        value: '大标题控件',
        config: {
          level: 2,
        }
      },
      {
        id: rnd(),
        control: 'title',
        value: '中标题控件',
        config: {
          level: 3,
        }
      },
      {
        id: rnd(),
        control: 'title',
        value: '小标题控件',
        config: {
          level: 4,
        }
      },
      // 代码编辑器
      {
        id: rnd(),
        control: 'codeEditor',
        value: "const pageLayout = computed(() => store.state.page.layout);",
        config: {
          showNo: true,
          language: 'vue',
          wordBreak: true,
          fontFamily: 'JetBrains Mono ExtraLight'
        }
      }
    ]
  }),
  getters: {
    getLayout: (state: any) => (id: string) => getLayout(state.layout, id),
  },
  mutations: {
    setLayoutValue: (state: any, {id, value}: { id: string, value: any }) => getLayout(state.layout, id).value = value,
    setLayoutConfig: (state: any, {id, key, value}: { id: string, key: string, value: any }) => getLayout(state.layout, id).config[key] = value,
  }
}

function getLayout(layout: Array<LayoutItem>, id: string): LayoutItem {
  const idx = layout.findIndex((layout: LayoutItem) => layout.id === id);
  return (idx === -1 ? {} : layout[idx]) as LayoutItem;
}
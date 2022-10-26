// 当前编辑页面
import {rnd} from "@/utils/string";
import type {Edge} from "@vue-flow/core"

export type LayoutItem = {
  id: string,
  control: string,
  value: string | boolean | number,
  chain?: boolean,
  config: {
    [key in string]: any
  }
}

export const page = {
  state: () => ({
    layout: <Array<LayoutItem>>[
      // 代办列表
      /*
      {
        id: rnd(),
        control: 'todo',
        chain: false,
        value: true,
        config: {
          task: '代办列表',
        }
      },
      {
        id: rnd(),
        control: 'todoPro',
        chain: false,
        value: 0,
        config: {
          task: '高级代办列表',
        }
      },
      // 主标题
      {
        id: rnd(),
        control: 'title',
        chain: false,
        value: '主标题控件',
        config: {
          level: 1,
        }
      },
      {
        id: rnd(),
        control: 'title',
        chain: false,
        value: '大标题控件',
        config: {
          level: 2,
        }
      },
      {
        id: rnd(),
        control: 'title',
        chain: false,
        value: '中标题控件',
        config: {
          level: 3,
        }
      },
      {
        id: rnd(),
        control: 'title',
        chain: false,
        value: '小标题控件',
        config: {
          level: 4,
        }
      },
      // 代码编辑器
      {
        id: rnd(),
        control: 'codeEditor',
        chain: false,
        value: "const pageLayout = computed(() => store.state.page.layout);",
        config: {
          showNo: true,
          language: 'vue',
          wordBreak: true,
          fontFamily: 'JetBrains Mono ExtraLight'
        }
      },
      // 无序列表
      {
        id: rnd(),
        control: 'ul',
        chain: false,
        value: ['列表一', '列表二', [{id: '1kip55', type: 'chain'}, '列表四', ['列表五', '列表六']], '列表七', '列表八'],
        config: {
          line: true,
          dot: true
        }
      },
      // 有序列表
      {
        id: rnd(),
        control: 'ol',
        chain: false,
        value: ['列表一', '列表二', ['列表三', {id: '1kip55', type: 'chain'}, ['列表五', '列表六']], '列表七', '列表八'],
        config: {
          line: false,
          dot: true
        }
      },
      // 外链控件
      {
        id: '1kip55',
        control: 'todo',
        chain: true,
        value: true,
        config: {
          task: '代办列表',
        }
      },
      // 外链控件
      {
        id: '1kip56',
        control: 'todoPro',
        chain: true,
        value: 2,
        config: {
          task: '高级代办列表',
        }
      },
      // 折叠控件
      {
        id: '1kip57',
        control: 'collapse',
        chain: true,
        value: ['折叠控件', {id: '1kip55', type: 'chain'},{id: '1kip56', type: 'chain'}, '折叠控件'],
        config: {
          shrink: false,
          title: '折叠控件',
          line: true
        }
      },
      {
        id: rnd(),
        control: 'collapse',
        chain: false,
        value: ['折叠控件', {id: '1kip57', type: 'chain'},{id: '1kip56', type: 'chain'}, '折叠控件'],
        config: {
          shrink: false,
          title: '折叠控件',
          line: true
        }
      },*/
      // 引述
      {
        id: rnd(),
        control: 'quote',
        chain: false,
        value: '引述控件',
        config: {}
      },
      // 分割线
      {
        id: rnd(),
        control: 'divider',
        chain: false,
        value: '分割线',
        config: {}
      },
      //思维导图
      {
        id: rnd(),
        control: 'mindMap',
        chain: false,
        value: <Array<Edge>>[
          {id: '1kip57', type: 'custom', label: '开始', position: {x: 100, y: 100}, data: {type: 'default', theme: '#ff79c6'}},
          {id: '1kip58', type: 'custom', label: '结束', position: {x: 400, y: 100}, data: {type: 'default'}},
          {id: '1kip59', source: '1kip57', target: '1kip58', sourceHandle: 'right', targetHandle: 'left', style: {stroke: '#f00', strokeWidth: '2px'}},
        ],
        config: {}
      }
    ]
  }),
  getters: {
    getLayout: (state: any) => (id: string) => getLayout(state.layout, id),
  },
  mutations: {
    setLayoutValue: (state: any, {id, value}: any) => getLayout(state.layout, id).value = value,
    setLayoutConfig: (state: any, {id, key, value}: any) => getLayout(state.layout, id).config[key] = value,
    filterUlNull: (state: any, id: string) => {
      const layout: LayoutItem = getLayout(state.layout, id);
      layout.value = deleteNull(layout.value as any) as any;
    }
  }
}

function getLayout(layout: Array<LayoutItem>, id: string): LayoutItem {
  const idx = layout.findIndex((layout: LayoutItem) => layout.id === id);
  return (idx === -1 ? {} : layout[idx]) as LayoutItem;
}

function deleteNull(array: Array<any>) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (Array.isArray(array[i])) {
      if (array[i].length === 0) {
        array.splice(i, 1);
      } else {
        array[i] = deleteNull(array[i]);
      }
    }
  }
  return array;
}
import {getUrlData} from "@/api/request";

export type ControlItem = {
  type: string,
  icon: string,
  label: string,
  code: string,
  keyCode?: Array<string>,
  keyType?: 'string' | 'regExp'
}

// 控件
export const controls: Array<ControlItem> = [
  {type: 'wb', icon: 'Aa', label: '文本', code: '/wb', keyCode: [], keyType: 'string'},
  {type: 'h1', icon: 'H1', label: '主标题', code: '/h1', keyCode: ['#'], keyType: 'string'},
  {type: 'h2', icon: 'H2', label: '大标题', code: '/h2', keyCode: ['##'], keyType: 'string'},
  {type: 'h3', icon: 'H3', label: '中标题', code: '/h3', keyCode: ['###'], keyType: 'string'},
  {type: 'h4', icon: 'H4', label: '小标题', code: '/h4', keyCode: ['####'], keyType: 'string'},
  {type: 'h4', icon: 'H4', label: '小标题', code: '/h4', keyCode: ['####'], keyType: 'string'},
  {type: 'ul', icon: 'U', label: '列表', code: '/ul', keyCode: ['-', '*', '+'], keyType: 'string'},
  {type: 'ol', icon: 'O', label: '数字列表', code: '/ol', keyCode: ['^[0-9]{0,9}.$'], keyType: 'regExp'},
  {type: 'code', icon: '</>', label: '代码片段', code: '/code', keyCode: ['^```\\S+$'], keyType: 'regExp'},
]

// 普通文本 控件
export const simpleTextWidget: Record<string, any> = {};

// 网址书签
const bookmark = {
  regExp: '(http|ftp|https)://[\\w\\-_]+(\\.[\\w\\-_]+)?',
  config: (data: any) => {
    const {url, title} = (typeof data === 'string' ? {url: data, title: ''}: data) || {};
    return new Promise((resolve, reject) => {
      const urlData:any = {title, url, description: '', icon: '', images: []};
      getUrlData({url}).then(res => {
        const {links: {icon} = {icon: {}}, meta} = res.data || {};
        urlData.title = meta.title || urlData.title;
        urlData.url = meta.canonical || urlData.url;
        urlData.description = meta.description;
        if (Array.isArray(icon) && icon.length) {
          urlData.icon = icon.splice(0, 1)[0].href;
          urlData.images = icon.map(o => o.href);
        }
        resolve(urlData);
      }).catch(() => reject());
    })
  }
};
simpleTextWidget['bookmark'] = bookmark;



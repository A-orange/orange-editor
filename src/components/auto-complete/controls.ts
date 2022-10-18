export type ControlItem = {
  type: string,
  icon: string,
  label: string,
  code: string,
  keyCode?: Array<string>,
  keyType?: 'string' | 'regExp'
}

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
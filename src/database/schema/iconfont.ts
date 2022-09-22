import type {RxJsonSchema} from "rxdb"
// 图标
export const iconfontSchema: RxJsonSchema<any> = {
  title: 'iconfont',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    // 所属分类
    classify: {
      type: 'string',
    },
    // 名称
    name: {
      type: 'string',
    },
    // svg 图标
    svg: {
      type: 'string',
    }
  },
  required: ['id', 'classify', 'name', 'svg'],
  indexes: ['id', 'classify']
}
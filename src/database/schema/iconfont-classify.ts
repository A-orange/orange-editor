import type {RxJsonSchema} from "rxdb"
import icon from "@/api/icon/orange.svg"
// 图标分类
export const iconfontClassifySchema: RxJsonSchema<any> = {
  title: 'iconfont classify',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 20,
    },
    // 名称
    name: {
      type: 'string',
      maxLength: 50
    },
    parentId: {
      type: 'string',
      maxLength: 20,
      default: ''
    },
    collect: {
      type: "boolean",
      default: false
    },
    // iconfont 网站图标组查询参数
    iconfontQuery: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        t: {
          type: "string"
        },
        ctoken: {
          type: "string"
        }
      }
    },
    // 分类展示图标
    icon: {
      type: "string",
      default: icon
    },
    // 作者信息
    creator: {
      type: 'object'
    }
  },
  required: ['id', 'name'],
  indexes: ['id']
}
import type {RxCollectionGenerated} from "rxdb"
import {addRxPlugin, createRxDatabase, RxCollectionBase} from "rxdb"
import {getRxStorageDexie} from "rxdb/plugins/dexie"
import {RxDBUpdatePlugin} from "rxdb/plugins/update"
// @ts-ignore
import {arrayToMap} from "@/utils/array";

// schemas
import {iconfontSchema} from "@/database/schema/iconfont";
import {iconfontClassifySchema} from "@/database/schema/iconfont-classify";
// 更新插件
addRxPlugin(RxDBUpdatePlugin);

// 创建数据库
const dataBase = await createRxDatabase({
  name: 'orangeDB',
  storage: getRxStorageDexie(),
  multiInstance: true, // 多实例
  eventReduce: true, // 使用EventReduce 算法来优化观察者或重复查询
  ignoreDuplicate: true, // 忽略重复实例
})

type RxCollectionRequire = RxCollectionBase<any> & RxCollectionGenerated & {
  $find?: (query: any) => Promise<any>,
  $findById?: (query: any) => Promise<any>,
  $insert?: (data: any) => Promise<any>,
  $update?: (data: any) => Promise<any>,
  $delete?: (ids: Array<string>) => Promise<any>
}

// 创建集合
export const {
    iconfont,
    iconfontClassify
  }: { [key: string]: RxCollectionRequire }
    = await dataBase.addCollections({
      iconfont: {
        schema: iconfontSchema
      },
      iconfontClassify: {
        schema: iconfontClassifySchema
      }
    }
  )

// 重写增删改查方法
;[iconfont, iconfontClassify].forEach(db => {
  // 添加
  db.$insert = async function (data) {
    try {
      data = Array.isArray(data) ? data : [data];
      data = getPropertyData(this.schema, data);
      const result = await this.bulkInsert(data);
      return Promise.resolve({
        code: 200,
        msg: result
      })
    } catch ({message}) {
      return Promise.reject({
        code: 500,
        msg: message
      })
    }
  }
  // 删除
  db.$delete = async function (ids) {
    try {
      const result = await this.bulkRemove(ids);
      return Promise.resolve({
        code: 200,
        msg: result
      })
    } catch ({message}) {
      return Promise.reject({
        code: 500,
        msg: message
      })
    }
  }
  // 查询
  db.$find = async function (query) {
    try {
      const result = await this.find(query).exec();
      return Promise.resolve({
        code: 200,
        data: result.map(o => o.toJSON()),
        total: result.length
      })
    } catch ({message}) {
      return Promise.reject({
        code: 500,
        msg: message
      })
    }
  }
  // 查询单条数据
  db.$findById = async function (id) {
    try {
      const result = await this.findByIds([id]);
      return Promise.resolve(result.get(id)?.toJSON());
    } catch ({message}) {
      return Promise.reject({
        code: 500,
        msg: message
      })
    }
  }
  // 修改
  db.$update = async function (data) {
    data = Array.isArray(data) ? data : [data];
    const map = arrayToMap(data);
    const ids = Object.keys(map);
    try {
      const source = await this.findByIds(ids);
      ids.forEach(id => {
        const data = source.get(id);
        if (data) {
          data.atomicUpdate((sourceData) => {
            getPropertyKey(this.schema).forEach(key => {
              if (key !== 'id') {
                sourceData[key] = map[id][key];
              }
            })
            return sourceData;
          })
        }
      })
      return Promise.resolve({
        code: 200,
        msg: data
      });
    } catch ({message}) {
      return Promise.reject({
        code: 500,
        msg: message
      });
    }
  }
})

// 获取属性key
function getPropertyKey({jsonSchema = {}}: any) {
  const delKey = ['_attachments', '_deleted', '_meta', '_rev'];
  const properties = jsonSchema.properties;
  const saveKey: Array<string> = [];
  if (properties) {
    Object.keys(properties).forEach(key => {
      if (properties.hasOwnProperty(key) && !delKey.includes(key)) {
        saveKey.push(key);
      }
    })
  }
  return saveKey;
}


// 去除无用数据
function getPropertyData(jsonSchema: any, data: any) {
  data = Array.isArray(data) ? data : [data];
  const saveKey = getPropertyKey(jsonSchema);
  return data.map((one: any) => {
    const item: any = {};
    saveKey.forEach(key => {
      item[key] = one[key];
    })
    return item;
  })
}
/**
 * 数组转 map
 * @param array
 * @param key 数组对象中要当作 map key的字段
 * @param saveKey 值 是否包含 键
 */
export function arrayToMap(array: Array<any>, key = 'id', saveKey = false) {
  const map: any = {}
  if (Array.isArray(array)) {
    array.forEach(one => {
      map[one[key]] = one
      if (!saveKey) {
        delete map[one[key]][key]
      }
    })
  }
  return map
}

import {typeOf} from "./object";

// 迭代 collection 迭代调用 iteratee 迭代函数（iteratee）显式的返回 false ，迭代会提前退出;
export function forEach(collection: any, iteratee: any) {
  let i = 0, length = 0;
  const fn = function (collection: any, iteratee: any) {
    if (typeOf(collection) === 'object') {
      const keys = Object.keys(collection);
      length = keys.length;
      for (; i < length; i++) {
        if (iteratee(collection[keys[i]], keys[i], collection) === false) {
          return;
        }
      }
      return;
    }
    if (typeOf(collection) === 'array') {
      length = collection.length;
      for (; i < length; i++) {
        if (iteratee(collection[i], i, collection) === false) {
          return;
        }
      }
      return;
    }
  }
  fn(collection, iteratee);
  return {
    finally: (fn: any) => {
      (++i > length) && fn &&fn();
    }
  }
}
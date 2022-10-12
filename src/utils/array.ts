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
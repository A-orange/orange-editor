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
export const isFalsy = value => value === 0 ? false : !value

/**
 * @param {Object} object 
 * 对象上键的值为空的话，就删掉该 key
 */
export const cleanObject = object => {
  const result = {...object}
  Reflect.ownKeys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) Reflect.deleteProperty(result, key)
  })
  return result
}

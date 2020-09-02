import { isArray, isObject, find, isEqual, keys, values, reject, compact, filter, uniq } from 'underscore'

/**
 * 将不是数组的对象转化成数组，默认为:[]
 * @param arr
 * @param defaultValue 默认值
 * @returns {Array}
 */
export let toArr = (arr, defaultValue = []) => {
  if (!isArray(arr)) return defaultValue
  return arr
}

/**
 * 将数组转成含有对象的数组
 * @param arr
 * @param name 变成数组的键名
 * @returns {Array}
 * eg:toObj([1,2,3],'id') ====> [{id:1},{id:2},{id:3}]
 */
export let toObj = (arr, name) => {
  if (!isArray(arr)) return null
  if (!name) return null
  let str = []
  arr.forEach(c => str.push({ [name]: c }))
  return str
}

/**
 * 数组中是否有某个对象（只要一个kek相同,就返回真）
 * @param arr
 * @param obj 对象
 * @returns {boolean}
 * eg:hasObj([{id:1,name:'22'}],{id:1}) ====> true
 */
export let hasObj = (arr, obj) => {
  if (!isArray(arr)) return false
  if (!isObject(obj)) return false
  let arr2 = find(arr, x => isEqual([x[keys(obj)]], values(obj)))
  return isObject(arr2)
}

/**
 * 数组中找到某一个对象，返回一个对象
 * @param obj 返回一个对象
 * @param arr
 * eg:findObj([{id:1,name:'22'}],{id:1}) ====> {id:1,name:'22'}
 */
export let findObj = (arr, obj) =>
  find(arr, x => {
    if (!isArray(arr)) return null
    if (!isObject(obj)) return null
    return isEqual([x[keys(obj)]], values(obj))
  })

/**
 * 数组中是否有某个对象的位置（只要一个kek相同,就返回index）
 * @param arr
 * @param obj
 * @returns {*} 返回索引或-1
 * eg:objIndex([{id:1,name:'22'}],{id:1}) ====> 0
 */
export let objIndex = (arr, obj) => {
  if (!isArray(arr)) return null
  if (!isObject(obj)) return null
  let index = arr.indexOf(findObj(arr, obj))
  if (index >= 0) return index
  return -1
}

/**
 * 排除数组中的对象Obj，返回一个数组
 * @param arr
 * @param obj
 * @returns {Array}
 * eg:rejectObj([{id:1,name:'22'}],{id:1}) ====> []
 */
export let rejectObj = (arr, obj) => {
  if (!isArray(arr)) return null
  if (!isObject(obj)) return null
  return reject(arr, x => isEqual([x[keys(obj)]], values(obj)))
}

/**
 * 过滤数组中的对象Obj，返回一个数组
 * @param obj
 * @param arr
 * @returns {Array}
 * eg:filterObj([{id:1,name:'22'}],{id:1}) ====> [{id:1,name:'22'}]
 */
export let filterObj = (arr, obj) => {
  if (!isArray(arr)) return null
  if (!isObject(obj)) return null
  return filter(arr, x => isEqual([x[keys(obj)]], values(obj)))
}
export let filterArr = (arr, obj) => {
  if (!isArray(arr)) return null
  if (!isObject(obj)) return null
  return filter(arr, x => values(obj)?.[0]?.includes(x[keys(obj)]))
}

/**
 * 数组中替换某个Obj，返回一个数组
 * @param arr
 * @param obj  需要替换的对象
 * @param obj2,替换成的对象
 * @returns {array}
 * eg:replaceObj([{id:1,name:'22'}],{id:1},{id:2}) ====> [{id:2}]
 */
export let replaceObj = (arr, obj, obj2) => {
  if (!isArray(arr)) return null
  if (!isObject(obj)) return null
  if (!isObject(obj2)) return null
  let index = arr.indexOf(findObj(arr, obj))
  if (index >= 0) {
    arr.splice(index, 1, obj2)
    return [...arr]
  }
  return null
}

/**
 * 随机从数组中取一个值
 * @returns {object} 一个对象
 * @private
 */
export let getRandomObj = arr => {
  if (!isArray(arr)) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 数组去重
 * @returns {Array}
 * @private
 */
export let arrOnly = arr => {
  if (!isArray(arr)) return null
  return uniq(arr)
}

/**
 * 数组去重
 param {Array} arr-待去重数组
 unique([1,2,3,4,2,1,2,3,4,5])
 result: [1, 2, 3, 4, 5]
 */
export let unique = arrOnly

/*export let unique = arr => {
  if (!isArray(arr)) return null
  //es6
  return [...new Set(arr)]
}*/
/**
 * @description 数组顺序打乱,返回一个新的数组
 * @param arr
 * @return {Array.[]}
 * upsetArr([1,2,3,4,5,6,7,8,9,0])
 result:  [7, 1, 3, 2, 4, 6, 8, 9, 0, 5]
 */
export let arrRandom = arr => {
  if (!isArray(arr)) return null
  let j, tempitem
  for (let i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * i)
    tempitem = arr[i]
    arr[i] = arr[j]
    arr[j] = tempitem
  }
  return arr
}

/**
 * 数组去掉无效的值
 * @param arr
 * @return array
 */
export let rejectBad = arr => {
  if (!isArray(arr)) return null
  return compact(arr)
}

/**
 * 数组去掉无效的值
 * @param arr
 * @return array
 */
export let removeBad = arr => {
  if (!isArray(arr)) return null
  return compact(arr)
}

/**
 *生成两数之间指定长度的随机数组
 * @param min
 * @param max
 * @param n
 * @return {any[]}
 * eg:ArrInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
 */
const arrInRange = (min, max, n = 1) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min)

/**
 * 根据parent_id生成树结构
 * @param items 数组
 * @param id
 * @param link
 * @return {array}
 */
export const toTree = (items, id = null, link = 'parent_id') =>
  items.filter(item => item[link] === id).map(item => ({ ...item, children: toTree(items, item.id) }))

/**
 * 按数量裁剪数组
 * @param arr 处理的数组
 * @param num 截取的长度
 * @returns {Array} 返回新数组
 * eg:filterObj([1,2,3,4,5,6], 2) ====> [1,2]
 */
export let arrCut = (arr, num) => {
  if (!_.isArray(arr)) return null
  if (typeof num !== 'number') return null
  return _.filter(arr, (x, xx) => xx < num)
}
export default {
  toArr,
  toObj,
  hasObj,
  findObj,
  objIndex,
  rejectObj,
  filterObj,
  replaceObj,
  getRandomObj,
  arrOnly,
  unique,
  arrRandom,
  rejectBad,
  removeBad,
  arrInRange,
  toTree,
  arrCut
}

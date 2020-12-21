var caixiaoweii = function () {
  function compact(ary) {
    var result = []
    for (let i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  }//创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。


  function chunk(ary, size) {//将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
    if (!ary || ary.length < 0) {
      return []
    }
    var result = []
    var i = 0
    while (true) {
      result.push(ary.slice(i, i + size));
      i += size;
      if (i >= ary.length) {
        break
      }
    }
    return result

  }

  function join(array, separator) {//将 array 中的所有元素转换为由 separator 分隔的字符串。
    separator = String(separator)
    var result = ''
    for (i = 0; i < array.length - 1; i++) {
      result += array[i] + separator
    }
    return result + array[i]
  }

  function isShallowEqual(a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
      return false;

    var propsInA = 0,
      propsInB = 0;

    for (var prop in b)
      propsInB += 1;

    for (var prop in a) {
      propsInA += 1;
      if (!(prop in b) || !isEqual(a[prop], b[prop]))
        return false;
    }

    return propsInA <= propsInB;
  }

  function isEqual(a, b) {
    if (a === b)
      return true
    if (a == null || typeof a != "object" || b == null || typeof b != "object")
      return false
    var propsInA = 0,
      propsInB = 0
    for (var prop in a) {
      propsInA += 1
    }
    for (var prop in b) {
      propsInB += 1
      if (!(prop in a) || !isEqual(a[prop], b[prop]))
        return false
    }
    return propsInA == propsInB
  }

  function baseIteratee(iteratee) {
    if (iteratee === null) {
      return val => val;
    }
    if (typeof iteratee === "string") {
      return val => val[iteratee];
    }
    if (typeof iteratee === "function") {
      return iteratee;
    }
    if (iteratee instanceof Array) {
      return function (obj) {
        return obj[iteratee[0]] === iteratee[1];
      }
    } else if (typeof iteratee === "object") {
      if (Object.prototype.toString.call(iteratee) === "[object RegExp]")
        return val => iteratee.test(val);
      else
        return isShallowEqual.bind(null, iteratee);
    }
  }

  function last(array) {//获取array中的最后一个元素。
    return array[array.length - 1]
  }

  function drop(array, n = 1) {//创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
    array.splice(0, n)
    return array

  }

  function dropRight(array, n = 1) {//创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
    if (n > array.length) {
      return []
    } else {
      return array.slice(0, array.length - n)
    }
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {//这个方法类似_.indexOf ，区别是它是从右到左遍历array的元素。
    for (i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }


  //使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
  function fill(array, value, start = 0, end = array.length) {
    for (i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }


  //返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
  function findIndex(array, predicate, fromIndex = 0) {
    var iteratee = baseIteratee(predicate);
    for (i = fromIndex; i < array.length; i++) {
      if (iteratee(array[i])) {
        return i
      }
      return -1
    }

  }
  //减少一级array嵌套深度。
  function flatten(array) {
    var result = []
    for (i = 0; i < array.length; i++) {
      if (typeof (array[i]) == 'number') {
        result.push(array[i])
      } else {
        for (j = 0; j < array[i].length; j++) {
          result.push(array[i][j])
        }
      }
    }
    return result
  }

  //将array递归为一维数组。
  function flattenDeep(array) {
    return array.reduce((result, item) => {
      return result.concat(Array.isArray(item) ? flattenDeep(item) : item);
    }, []);

  }

  //根据 depth 递归减少 array 的嵌套层级
  function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }

    var result = []
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result.push(...flattenDepth(array[i], depth - 1))
      } else {
        result.push(array[i])
      }
    }
    return result
  }


  //获取数组 array 的第一个元素
  function head(array) {
    return array[0]
  }

  //使用SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
  function indexOf(array, value, fromIndex = 0) {
    for (i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  //获取数组array中除了最后一个元素之外的所有元素（注：去除数组array中的最后一个元素）。
  function initial(array) {
    array.pop()
    return array
  }

  //反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推
  function reverse(array) {
    function swap(ary, i, j) {
      var t = ary[i]
      ary[i] = ary[j]
      ary[j] = t
    }
    var i = 0
    var j = array.length - 1
    while (i < j) {
      swap(array, i, j)
      i++
      j--
    }
    return array
  }

  //使用二进制的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
  function sortedIndex(array, value) {
    for (i = 0; i < array.length; i++) {
      if (array[i] >= value) {
        return i
      }
    }
    return array.length;
  }

  //计算 array 中的最大值。 如果 array 是 空的或者假值将会返回 undefined。
  function max(array) {
    var max = array[0]
    for (var i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i]
      }

    }
    return max
  }

  //计算 array 中的最小值。 如果 array 是 空的或者假值将会返回 undefined。
  function min(array) {
    var min = array[0]
    for (var i = 1; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i]
      }

    }
    return min
  }

  //计算 array 中值的总和
  function sum(array) {
    let sum = 0
    for (i = 0; i < array.length; i++) {
      sum += array[i]
    }
    return sum

  }


  function fromPairs(pairs) {
    var map = {}
    for (let i = 0; i < pairs.length; ++i) {
      map[pairs[i][0]] = pairs[i][1]
    }
    return map
  }


  // 区别是它是从右到左的迭代集合array中的元素。
  function findLastIndex(array, predicate, fromIndex) {
    var iteratee = baseIteratee(predicate);
    for (i = fromIndex; i >= 0; i--) {
      if (iteratee(array[i])) {
        return i
      }

    }
    return -1
  }

  //转换 value 为一个数组。
  function toArray(value) {
    if (typeof value == 'string') {
      return value.split('')
    }
    let res = []
    if (typeof value == 'object') {
      for (let i in value) {
        res.push(value[i])
      }
    }
    return res
  }

  function filter(ary, predicate) {
    var iteratee = baseIteratee(predicate);
    var result = undefined
    for (i = 0; i < ary.length; i++) {
      if (iteratee(ary[i], i, ary)) {
        result = ary[i]
        break
      }
    }
    return result
  }


  function find(ary, predicate, fromIndex = 0) {
    var iteratee = baseIteratee(predicate);
    for (var i = 0; i < fromIndex; i++) {
      if (iteratee(ary[i], i, ary)) {
        return ary[i]
      }
    }
  }

  function every(ary, predicate) {
    var iteratee = baseIteratee(predicate);
    for (i = 0; i < ary.length; i++) {
      if (!iteratee(ary[i], i, ary)) {
        return false
      }

    }
    return true
  }

  function some(ary, predicate) {
    var iteratee = baseIteratee(predicate);
    for (i = 0; i < ary.length; i++) {
      if (iteratee(ary[i], i, ary)) {
        return true
      }

    }
    return false
  }

  function maxBy(array, iteratee) {
    var iteratee = baseIteratee(iteratee);
    var max = 0
    for (let i = 1; i < array.length; i++) {
      if (iteratee(array[max]) < iteratee(array[i])) {
        max = i
      }
    }
    return array[max]
  }

  function minBy(array, iteratee) {
    var iteratee = baseIteratee(iteratee);
    var min = 0
    for (let i = 1; i < array.length; i++) {
      if (iteratee(array[min]) > iteratee(array[i])) {
        min = i
      }
    }
    return array[min]
  }

  function sumBy(array, iteratee) {
    var iteratee = baseIteratee(iteratee);
    var sum = 0
    for (let i = 0; i < array.length; i++) {
      sum += iteratee(array[i])
    }
    return sum
  }

  function forown(object, iteratee = _.identity) {
    var hasOwn = Object.prototype.hasOwnProperty
    for (var key in obj) {
      if (hasOwn.call(obj, key)) {
        if (NodeIterator(obj[key], key, obj) === false) {
          break
        }
      }
    }
    return obj
  }

  function keys(object) {
    let result = []
    let hasOwn = Object.prototype.hasOwnProperty
    for (let key in object) {
      if (hasOwn.call(object, key)) {
        result.push(key)
      }
    }
    return result

  }


  function values(object) {
    let result = []
    let hasOwn = Object.prototype.hasOwnProperty
    for (let key in object) {
      if (hasOwn.call(object, key)) {
        result.push(object[key])
      }
    }
    return result
  }

  function groupBy(array, predicate = identity) {
    var result = {}
    for (var i = 0; i < array.length; i++) {
      var key = predicate(array[i], i, array)
      if (!Array.isArray(result[key])) {
        result[key] = []
      }
      result[key].push(array[i])
    }
    return result
  }


  function identity(val) {
    return val
  }

  function mapValues(obj, iteratee) {
    var iteratee = baseIteratee(iteratee)
    var result = {}
    for (var key in obj) {
      var val = obj[key]
      result[key] = iteratee(val, key, obj)

    }
    return result
  }


  function mapKeys(obj, iteratee) {
    var iteratee = baseIteratee(iteratee)
    var result = {}
    for (var key in obj) {
      var val = obj[key]
      result[iteratee(val, key, obj)] = val

    }
    return result
  }

  function tail(array) {
    return array.slice(1)
  }


  function take(array, n = 1) {
    var result = []
    for (i = 0; i < array.length; i++) {
      if (i < n) {

        result.push(array[i])
      }

    }
    return result
  }

  function nth(array, n = 0) {
    if (n < 0) {
      return array[array.length + n]
    }
    return array[n]
  }

  function pull(array, ...values) {
    let result = []
    let res = []
    for (let i of values) {
      res.push(i)
    }
    for (i = 0; i < array.length; i++) {
      if (!res.includes(array[i])) {
        result.push(array[i])
      }
    }
    return result
  }

  function pullAll(array, values) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (!values.includes(array[i])) {
        result.push(array[i])
      }
    }
    return result
  }


  function pullAt(array, indexes) {
    let pulled = []
    let p = array
    for (let i = 0; i < indexes.length; i++) {
      pulled.push(array[indexes[i]])
    }
    return pulled
  }

  function sortedIndexBy(array, value, iteratee = identity) {

  }

  function sortedIndexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }

  function sortedLastIndex(array, value) {
    for (let i = array.length; i >= 0; i--) {
      if (array[i] <= value) {
        return i + 1
      }
    }
    return 0
  }

  function sortedLastIndexOf(array, value) {
    for (i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }

  function sortedUniq(array) {
    let newarray = array.reduce(function (acc, cur) {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur)
      }
      return acc
    }, [])
    return newarray
  }

  function takeRight(array, n = 1) {
    if (n == 0) {
      return []
    }
    return array.slice(-n)
  }

  function union(...arrays) {
    let ary = [].concat(...arrays)
    let result = []
    ary.forEach(it => {
      if (!result.includes(it)) {
        result.push(it)
      }
    })
    return result
  }

  function uniq(array) {
    let newarray = array.reduce(function (acc, cur) {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur)
      }
      return acc
    }, [])
    return newarray
  }


  function without(array, ...values) {
    let result = []
    let val = []
    for (let i of values) {
      val.push(i)
    }
    for (i = 0; i < array.length; i++) {
      if (!(val.includes(array[i]))) {
        result.push(array[i])
      }
    }
    return result
  }

  function zipObject(props = [], values = []) {
    let result = {}

    for (let i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result

  }

  function isMatch(object, source) {
    for (let key in source) {
      if (source[key] && typeof source[key] == 'object') {
        if (!isMatch(object[key], source[key])) {
          return false
        }
      } else {
        if (object[key] !== source[key]) {
          return false
        }
      }

    }
    return true
  }

  function bind(func, thisArg, partials) {
    return function (...args) {
      var copy = partials.slice()
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] === window) {
          copy[i] = args.shift()
        }
      }
      return func.call(thisArg, ...copy, ...args)
    }
  }

  function matches(src) {
    return bind(isMatch, null, window, src)
  }

  function property(path) {
    return bind(get, null, window, path)
  }

  function concat(array, ...values) {
    let res = array
    for (let i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        res.push(...values[i])
      } else {
        res.push(values[i])
      }
    }
    return res
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  }

  function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]'
  }

  function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]'
  }

  function isObject(value) {
    return typeof values === 'object' && typeof value !== null || typeof value === 'function'
  }

  function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'
  }

  function isSymbol(value) {
    return Object.prototype.toString.call(value) === '[object Symbol]'
  }

  function isSet(value) {
    return Object.prototype.toString.call(value) === '[object Set]'
  }

  function isUndefined(value) {
    return Object.prototype.toString.call(value) === '[object Undefined]'
  }

  function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  }

  function isNull(value) {
    return Object.prototype.toString.call(value) === '[object Null]'
  }


  function isNil(value) {
    return value === null || value === undefined
  }

  function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]'
  }

  function isArguments(value) {
    return Object.prototype.toString.call(value) === '[object Arguments]'

  }

  function difference(array, ...values) {
    let val = []
    let res = []

    for (let i = 0; i < values.length; i++) {
      val.push(...values[i])
    }

    for (let i = 0; i < array.length; i++) {
      if (!val.includes(array[i])) {
        res.push(array[i])
      }
    }
    return res
  }

  function differenceWith(array, values, comparator) {
    let res = []
    for (let a in array) {
      for (let v in values) {
        if (!(comparator(a, v))) {
          res.push(ary)
        }
      }
    }
    return res
  }
















  return {
    compact,
    chunk,
    join,
    last,
    drop,
    dropRight,
    lastIndexOf,
    fill,
    head,
    indexOf,
    initial,
    reverse,
    sortedIndex,
    max,
    min,
    sum,
    fromPairs,
    findIndex,
    findLastIndex,
    flattenDeep,
    flattenDepth,
    toArray,
    filter,
    find,
    every,
    some,
    maxBy,
    minBy,
    sumBy,
    isEqual,
    flatten,
    forown,
    keys,
    values,
    groupBy,
    identity,
    mapValues,
    mapKeys,
    tail,
    take,
    nth,
    pull,
    pullAll,
    pullAt,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexOf,
    sortedUniq,
    takeRight,
    union,
    uniq,
    without,
    zipObject,
    isMatch,
    matches,
    property,
    concat,
    isArray,
    isBoolean,
    isNumber,
    isObject,
    isString,
    isSymbol,
    isSet,
    isUndefined,
    isRegExp,
    isNull,
    isNil,
    isFunction,
    isArguments,
    difference,
    differenceWith,





  }

}()




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
    }
    return -1
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
  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    var iteratee = baseIteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
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
    var result = []
    for (i = 0; i < ary.length; i++) {
      if (iteratee(ary[i], i, ary)) {
        result.push(ary[i])
      }
    }
    return result
  }


  function find(ary, predicate) {
    var iteratee = baseIteratee(predicate);
    var res = undefined
    for (var i = 0; i < ary.length; i++) {
      if (iteratee(ary[i], i, ary)) {
        res = ary[i]
        break
      }
    }
    return res
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
    return (typeof value === 'object' && value !== null) || typeof value === 'function'
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
    for (let a of array) {
      for (let v of values) {
        if (!comparator(a, v)) {
          res.push(a)
        }
      }
    }
    return res
  }

  function zip(...arrays) {
    let res = []
    for (let i = 0; i < arrays[0].length; i++) {
      let mid = []
      for (let j = 0; j < arrays.length; j++) {
        mid.push(arrays[j][i])
      }
      res.push(mid)
    }
    return res
  }

  function unzip(...arrays) {
    let res = []
    for (let i = 0; i < arrays[0][0].length; i++) {
      let mid = []
      for (let j = 0; j < arrays[0].length; j++) {
        mid.push(arrays[0][j][i])
      }
      res.push(mid)
    }
    return res

  }

  function forEach(collection, iteratee = identity) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection)
      }
    }

    if (typeof collection == 'object') {
      for (let k in collection) {
        iteratee(collection[k], k, collection)
      }
    }
    return collection
  }

  function flatMap(collection, iteratee = identity) {
    let res = []
    for (let i = 0; i < collection.length; i++) {
      res = res.concat(iteratee(collection[i], i, collection))
    }
    return res
  }



  function size(collection) {
    let count = 0
    if (Object.prototype.toString.call(collection) == '[object Array]' || typeof collection == 'String') {
      return collection.length
    } else {

      for (let k in collection) {
        count++
      }
    }
    return count
  }

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function repeat(string, n = 1) {
    let str = ''
    if (n == 0) {
      return str
    } else {
      for (let i = 0; i < n; i++) {
        str += string
      }
    }
    return str
  }


  function includes(collection, value, fromIndex = 0) {
    if (Object.prototype.toString.call(collection) == '[object Array]') {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true
        } else {
          return false
        }
      }
    }

    if (typeof collection == 'object') {
      for (let k in collection) {
        if (collection[k]) {
          return true
        } else {
          return false
        }
      }
    }
    if (typeof collection == 'string') {
      if (collection.indexOf(value) !== -1) {
        return true
      }
      else {
        return false
      }
    }
  }

  function ary(f, n = func.length) {
    return function (...args) {
      return f(...args.slice(0, n))
    }

  }

  function before(n, func) {
    var c = 0
    var result
    return function (...args) {
      if (c < n) {
        return result = func.call(this, ...args)
        c++
      } else {
        return result
      }
    }
  }


  function after(n, func) {
    var c = 0
    return function (...args) {
      c++
      if (c > n) {
        return func.call(this, ...args)
      }
    }
  }

  function flip(func) {
    return function (...args) {
      return func(...args.reverse())
    }
  }

  function negate(predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  }


  function spread(func, start = 0) {
    return function (ary) {
      return func.apply(this, ary)
    }
  }


  function flatMapDepth(collection, iteratee, depth = 1) {
    let res = []
    for (let i = 0; i < collection.length; i++) {
      res.push(flattenDepth(iteratee(collection[i], i, collection), depth))
    }
    return res
  }

  function intersection(...arrays) {
    let res = arrays[0]
    for (let i = 0; i < arrays.length; i++) {
      res = res.filter(val => arrays[i].includes(val))
    }
    return res
  }

  function sortedIndexBy(array, value, iteratee) {
    if (typeof iteratee == 'function') {
      for (let i = 0; i < array.length; i++) {
        if (iteratee(array[i]) === iteratee(value)) {
          return i
        }
      }
    }

    if (typeof iteratee == 'string') {
      for (let i = 0; i < array.length; i++) {
        if (value[iteratee] === array[i][iteratee]) {
          return i
        }
      }
    }
  }

  function sortedLastIndexBy(array, value, iteratee) {
    if (typeof iteratee == 'function') {
      for (let i = array.length - 1; i >= 0; i--) {
        if (iteratee(array[i]) >= iteratee(value)) {
          return i
        }
      }
    }

    if (typeof iteratee == 'string') {
      for (let i = array.length - 1; i >= 0; i--) {
        if (value[iteratee] <= array[i][iteratee]) {
          return i
        }
      }
    }

  }

  function curry(func, arity = func.length) {
    return function (...args) {
      if (args.length < arity) {
        return curry(func.bind(null, ...args), arity - args.length)
      } else {
        return func(...args)
      }
    }
  }


  function uniqBy(array, predicate) {
    let res = []
    let map = new Map()
    let iteratee = baseIteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!map.has(iteratee(array[i]))) {
        map.set(iteratee(array[i]), true)
        res.push(array[i])
      }
    }
    return res
  }

  function sortedUniqBy(array, iteratee) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (iteratee(array[i]) === iteratee(array[i + 1])) {
        res.push(array[i])
      }
    }
    return res
  }

  function castArray(value) {
    if (Array.isArray(value)) {
      return value
    } else {
      let res = []
      for (let i = 0; i < arguments.length; i++) {
        res.push(arguments[i])
      }
      return res
    }
  }

  function conformsTo(object, source) {
    for (let key in source) {
      return source[key](object[key])
    }
  }

  function eq(value, other) {
    if (value !== value && other !== other) return true
    return value === other
  }

  function isArrayBuffer(value) {
    return Object.prototype.toString.call(value) == "[object ArrayBuffer]"
  }

  function isArrayLike(value) {
    if (typeof value !== 'function' && value.length >= 0) {
      return true
    } else {
      return false
    }
  }

  function isArrayLikeObject(value) {
    return typeof value === 'object' && isArrayLike(value)
  }

  function isDate(value) {
    return Object.prototype.toString.call(value) == '[object Date]'
  }

  function isElement(value) {
    return !!(value && (value.nodeType == 1 || value.nodeType == 9));
  }

  function isEmpty(value) {
    if (isArray(value)) {
      return value.length === 0
    }
    if (typeof value == 'object') {
      for (let key in value) {
        return false
      }
    }
    return true
  }

  function isEqualWith(value, other, customizer) {
    for (let i = 0; i < value.length; i++) {
      if (customizer(value[i], other[i],) === false) {
        return false
      }
    }
    return true
  }

  function isError(value) {
    return Object.prototype.toString.call(value) == '[object Error]'
  }

  function isFinite(value) {
    return Number.isFinite(value)
  }

  function isInteger(value) {
    return Number.isInteger(value)
  }

  function isLength(value) {
    if (typeof value === 'number' && value > Number.MIN_VALUE && value !== Infinity) {
      return true
    } else {
      return false
    }
  }

  function isMap(value) {
    return Object.prototype.toString.call(value) == '[object Map]'
  }

  function isMatchWith(object, source, customizer) {
    for (let key in object) {
      if (customizer(object[key], source[key]) === false) {
        return false
      }
    }
    return true
  }

  function isNaN(value) {
    if (typeof value === "object") {
      return value.valueof() !== value.valueof()
    }
    return value !== value
  }

  function isNative(value) {
    return (/\{\s*\[native code\]\s*\}/).test('' + value);
  }

  function isObjectLike(value) {
    return typeof value == 'object' && value !== null
  }

  function isPlainObject(value) {
    return value.__proto__ == Object.prototype || value.__proto__ == null
  }

  function isSafeInteger(value) {
    return Number.isSafeInteger(value)
  }

  function isTypedArray(value) {
    return Object.prototype.toString.call(value) == '[object Uint8Array]'
  }

  function isWeakMap(value) {
    return Object.prototype.toString.call(value) == '[object WeakMap]'
  }

  function isWeakSet(value) {
    return Object.prototype.toString.call(value) == '[object WeakSet]'
  }

  function lt(value, other) {
    return value < other
  }

  function lte(value, other) {
    return value <= other
  }

  function toFinite(value) {
    if (value === Infinity) {
      return Number.MAX_VALUE
    }
    if (value === -Infinity) {
      return Number.MIN_VALUE
    }
    return Number(value)
  }

  function toInteger(value) {
    if (value === Infinity) {
      return Number.MAX_VALUE
    }
    if (value === -Infinity) {
      return Number.MIN_VALUE
    }
    return (Number(value)) >> 0
  }

  function toLength(value) {
    if (value >= Infinity) {
      return 2 ** 32 - 1
    }
    if (value < -Infinity) {
      return 0
    }
    return toInteger(value)
  }

  function toNumber(value) {
    return Number(value)
  }

  function assign(object, ...sources) {
    sources.forEach(key => {
      Object.keys(key).forEach(obj => {
        object[obj] = key[obj]
      })
    })
    return object
  }

  function add(augend, addend) {
    return augend + addend
  }

  function ceil(number, precision = 0) {
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  }

  function divide(dividend, divisor) {
    return dividend / divisor
  }

  function floor(number, precision = 0) {
    return Math.floor(number * 10 ** precision) / 10 ** precision
  }

  function mean(array) {
    let sum = array.reduce(function (a, c) {
      return a + c
    }, 0)
    return sum / array.length
  }

  function meanBy(array, iteratee = identity) {
    iteratee = baseIteratee(iteratee)
    let sum = array.reduce(function (a, c) {
      return a + iteratee(c)
    }, 0)
    return sum / array.length
  }

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  function round(number, precision = 0) {
    return Math.round(number * 10 ** precision) / 10 ** precision
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function clamp(number, lower, upper) {
    if (number < lower) {
      return lower
    }
    if (number > upper) {
      return upper
    }
    return number
  }

  function inRange(number, start, end) {
    if (end == undefined) {
      let t = end
      end = start
      start = 0
    }
    if (start > end) {
      let t = end
      end = start
      start = t
    }
    if (number >= start && number < end) {
      return true
    }
    return false
  }


  function toSafeInteger(value) {
    if (value < -Infinity) {
      return 0
    }
    if (value >= Infinity) {
      return 2 ** 53 - 1
    }
    return Math.floor(value)
  }


  function assignIn(object, ...sources) {
    sources.forEach(item => {
      for (let key in item) {
        object[key] = item[key]
      }
    })
    return object
  }

  function toPath(value) {
    return value.match(/\w+/g)
  }

  function get(object, path, defaultValue) {
    if (typeof path == 'string') {
      path = toPath(path)
    }
    for (let i = 0; i < path.length; i++) {
      if (object == undefined) {
        return defaultValue
      }
      object = object[path[i]]
    }
    if (object == undefined) {
      return defaultValue
    }
    return object
  }

  function at(object, paths) {
    return paths.map(function (item) {
      return get(object, item)
    })
  }

  function defaults(object, ...sources) {
    let obj = {}
    for (let source of sources) {
      for (let key in source) {
        obj[key] = source[key]
      }
    }
    for (let i in object) {
      obj[i] = object[i]
    }
    return obj
  }

  function pick(object, props) {
    let res = {}
    for (let item in object) {
      if (props.includes(item)) {
        res[item] = object[item]
      }
    }
    return res
  }

  function defaultTo(value, defaultValue) {
    if (typeof value == 'NaN' && typeof value == 'null' || typeof value == 'undefined') {
      return defaultValue
    }
    return value
  }

  function words(string = '', pattern = /\w+/g) {
    return string.match(pattern)
  }

  function split(string = '', separator, limit) {
    let res = []

    for (let i = 0; i < string.length; i++) {
      if (string[i] !== separator) {
        res.push(string[i])
      }
    }
    return res.slice(0, limit)
  }

  function omit(object, props) {
    let res = {}
    for (let item in object) {
      if (!props.includes(item)) {
        res[item] = object[item]
      }
    }
    return res
  }

  function valuesIn(object) {
    let res = []

    for (let key in object) {
      res.push(object[key])
    }
    return res
  }

  function replace(str, pattern, replacement) {
    let arr = str.split(pattern)
    let res = ''
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length == 0) {
        res += replacement
      }
      res += arr[i]
    }
    return res
  }


  function snakeCase(string = '') {
    let rex = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return string.match(rex).join("_").toLowerCase()

  }

  function startCase(string = "") {
    let rex = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    let res = string.match(rex)
    return res.map(it => it.replace(/^\w/, it => it.toUpperCase())).join(" ")
  }

  function startsWith(string = '', target, position = 0) {
    for (let i = position; i < string.length; i++) {
      if (string[position] === target) {
        return true
      }
      return false
    }

  }

  function toLower(string = '') {
    return string.toLowerCase()
  }

  function toUpper(string = '') {
    return string.toUpperCase()
  }


  function trim(string = '', chars = '\\s') {
    let reg = new RegExp('[' + chars + ']+', 'g')
    return string.replace(reg, '')
  }


  function unary(func) {
    return ary(func, 1)
  }


  function parseJson(str) {
    var i = 0

    return parseValue()

    function parseValue() {
      var char = str[i]

      if (char == '[') {
        return parseArray()
      }
      if (char == '{') {
        return parseObject()
      }
      if (char == '"') {
        return parseString()
      }

      if (char == 't') {
        return parseTrue()
      }
      if (char == 'f') {
        return parseFalse()
      }
      if (char == 'n') {
        return parseNull()
      }
      return parseNumber()

    }

    function parseArray() {
      var result = []
      i++//skip [
      while (str[i] != ']') {
        if (str[i] == ',') {
          i++ //skip ,
        }
        var value = parseValue() //parse a value from i
        result.push(value)
      }
      i++
      return result

    }
    function parseObject() {
      var result = {}
      i++ //skip '{'
      while (str[i] != '}') {
        if (str[i] == ',') {
          i++
        }
        var key = parseString()
        i++ //skip ':'
        var value = parseValue()
        result[key] = value
      }
      i++ //skip'}'
      return result
    }
    function parseString() {
      var result = ''
      i++//skip first "
      while (str[i] !== '"') {
        result += str[i++]
      }
      i++ // skip second "
      return result
    }
    function parseTrue() {
      i += 4
      return true
    }
    function parseFalse() {
      i += 5
      return false
    }
    function parseNull() {
      i += 4
      return null
    }
    function parseNumber() {
      var numStr = ''
      while (/[\de+\-.]/.test(str[i]) && str[i]) {
        numStr += str[i++]
      }
      return parseFloat(numStr)
    }
  }

  function defer(func, ...args) {
    return setTimeout(func, 1, ...args) - 1;
  }

  function delay(func, wait, ...args) {
    return setTimeout(() => {
      func(...args)
    }, 1);
  }

  function functions(object) {
    let res = []
    let arr = Object.keys(object)//返回Object的自身可枚举属性组成的数组
    arr.forEach(it => {
      if (isFunction(object[it])) {
        res.push(it)
      }
    })
    return res
  }

  function times(n, iteratee = identity) {
    let res = []
    for (let i = 0; i < n; i++) {
      res.push(iteratee(i))
    }
    return res
  }

  function constant(value) {
    return function () {
      return value
    }
  }

  function functionsIn(object) {
    let res = []
    for (let key in object) {
      if (isFunction(object[key])) {
        res.push(key)
      }
    }
    return res
  }

  function capitalize(string = '') {
    return string.toLowerCase().replace(/^\w/, it => it.toUpperCase())
  }

  function camelCase(string = '') {
    var str = string.toLowerCase()
    var arr = str.match(/[a-z]+/g)
    let res = arr[0]
    res += arr[1][0].toUpperCase()
    for (let i = 1; i < arr[1].length; i++) {
      res += arr[1][i]
    }
    return res
  }

  function endsWith(string = '', target, position = string.length) {
    return string[position - 1] === target
  }

  function escape(string = '') {
    return string.replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('"', '&quot;')
      .replace("'", "&apos;")
      .replace("`", "&grave;")
  }

  function deburr(string = '') {
    return string.replace('é', 'e')
      .replace('à', 'a')
  }

  function escapeRegExp(string = '') {
    return string.replace(/[\^\$\""\,\.\*\+\?\(\)\[\]\|]/g, '\\$&')
  }

  function kebabCase(string = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return string.match(reg).join("-").toLowerCase()
  }

  function lowerCase(string = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[A-Z]+/g
    return string.match(reg).join(" ").toLowerCase()
  }

  function lowerFirst(string = '') {
    return string.replace(/^\w/, function (it) {
      return it.toLowerCase()
    })
  }

  function parseInt(string, radix = 10) {
    return Number.parseInt(string, radix)
  }

  function upperCase(string = '') {
    let reg = /[a-z]+|[A-Z][a-z]+|[a-z]/g
    return string.match(reg).join(' ').toUpperCase()
  }

  function upperFirst(string = '') {
    return string.replace(/^\w/, function (it) {
      return it.toUpperCase()
    })
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
    bind,
    zip,
    unzip,
    forEach,
    flatMap,
    flatMapDepth,
    size,
    gt,
    gte,
    repeat,
    includes,
    ary,
    before,
    after,
    flip,
    negate,
    spread,
    intersection,
    sortedIndexBy,
    sortedLastIndexBy,
    curry,
    uniqBy,
    sortedUniqBy,
    castArray,
    conformsTo,
    eq,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isDate,
    isElement,
    isEmpty,
    isEqualWith,
    isFinite,
    isInteger,
    isLength,
    isMap,
    isMatchWith,
    isNaN,
    isNative,
    isObjectLike,
    isPlainObject,
    isSafeInteger,
    isTypedArray,
    isWeakMap,
    isWeakSet,
    lt,
    lte,
    toFinite,
    toInteger,
    toLength,
    toNumber,
    assign,
    ceil,
    divide,
    floor,
    mean,
    meanBy,
    multiply,
    round,
    subtract,
    clamp,
    inRange,
    add,
    isError,
    toSafeInteger,
    assignIn,
    toPath,
    get,
    at,
    defaults,
    pick,
    defaultTo,
    words,
    split,
    omit,
    valuesIn,
    replace,
    snakeCase,
    startCase,
    startsWith,
    toLower,
    toUpper,
    trim,
    unary,
    parseJson,
    defer,
    delay,
    constant,
    functions,
    times,
    functionsIn,
    capitalize,
    camelCase,
    endsWith,
    escape,
    deburr,
    escapeRegExp,
    kebabCase,
    lowerCase,
    lowerFirst,
    parseInt,
    upperCase,
    upperFirst,


  }

}()




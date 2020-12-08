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
  function findindex(array, predicate, fromIndex = 0) {


  }
  //减少一级array嵌套深度。
  function flatten(array) {

  }

  //将array递归为一维数组。
  function flattenDeep(array) {

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
    if (array[0] > value) {
      return 0
    }
    if (array[array.length - 1] < value) {
      return array.length
    }
    for (i = 0; i < array.length; i++) {
      if (array[i] < value && array[i + 1] > value) {
        return i + 1
      }
    }
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




  }

}()




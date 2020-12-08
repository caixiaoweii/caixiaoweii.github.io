var caixiaoweii = function () {
  function compact(ary) {
    var result = []
    for (let i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  }


  function chunk(ary, size) {
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

  function join(array, separator) {
    separator = String(separator)
    var result = ''
    for (i = 0; i < array.length - 1; i++) {
      result += array[i] + separator
    }
    return result + array[i]
  }

  function last(array) {
    return array[array.length - 1]
  }

  function drop(array, n = 1) {
    array.splice(0, n)
    return array

  }

  function dropRight(array, n = 1) {
    if (n > array.length) {
      return []
    } else {
      return array.slice(0, array.length - n)
    }
  }



  return {
    compact,
    chunk,
    join,
    last,
  }

}()




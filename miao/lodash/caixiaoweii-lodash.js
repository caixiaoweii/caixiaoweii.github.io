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
  function chunk(ary, size = 1) {
    if (!ary || ary.length < 0) {
      return []
    }
    var result = []
    var i = 0
    while (true) {
      result.push(ary.slice(i, i + size));
      i += size;
      if (i > ary.length) {
        break
      }
    }
    return result

  }





  return {
    compact,
    chunk,
  }

}()




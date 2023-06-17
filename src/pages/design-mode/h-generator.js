function iteratorGenerator(list) {
  let idx = 0;
  let length = list.length;

  return {
    next: function () {
      // 如果索引还没有超出集合长度，done为false
      let done = idx >= length;
      // 如果done为false，则可以继续取值
      let value = !done ? list[idx++] : undefined;
      // 将当前值与遍历是否完毕（done）返回
      return {
        done,
        value
      };
    }
  };
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手']);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

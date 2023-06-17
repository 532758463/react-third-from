// 编写一个迭代器生成函数
function* iteratorGenerator() {
  yield '1号选手';
  yield '2号选手';
  yield '3号选手';
}

const iterator = iteratorGenerator();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

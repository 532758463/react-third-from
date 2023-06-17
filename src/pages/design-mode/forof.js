const arr = [1, 2, 3];
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]();

// 初始化一个迭代结果
let now = { done: false };

// 循环往外迭代成员
while (!now.done) {
  now = iterator.next();
  if (!now.done) {
    console.log(`现在遍历到了${now.value}`);
  }
}

/**
 * then在链式调用时，会等前一个then或者函数执行完毕，返回状态，才会执行回调函数。
 */

function increment(value) {
  return value + 1;
}
function doubleUp(value) {
  return value * 2;
}
function output(value) {
  console.log(value);
}

var res = Promise.resolve(1);
res.then(increment).then(doubleUp).then(output);
// 在Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。且都会返回一个Promise实例，所以可以链式调用then方法

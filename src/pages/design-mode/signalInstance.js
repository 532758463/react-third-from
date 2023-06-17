class SingleDog {
  show() {
    console.log('我是一个单例对象');
  }
}

const s1 = new SingleDog();
const s2 = new SingleDog();

// false
console.log(s1 === s2);
class SingleDog2 {
  show() {
    console.log('我是一个单例对象');
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog2.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog2.instance = new SingleDog2();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog2.instance;
  }
}

const s3 = SingleDog2.getInstance();
const s4 = SingleDog2.getInstance();

// true
console.log(s3 === s4);

SingleDog.getInstance = (function () {
  // 定义自由变量instance，模拟私有变量
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();

const s5 = SingleDog.getInstance();
const s6 = SingleDog.getInstance();

// true
console.log(s5 === s6);

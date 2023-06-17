/**===========================
 * 原型链继承
 * 缺点：
 * 两个实例使用的是同一个原型对象。
 * 它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化
 * =====================
 */
function Parent() {
  this.name = '1';
  this.play = [1, 2, 3];
}
function Child() {
  this.type = 'child2';
}

Child.prototype = new Parent();
const s1 = new Child();
const s2 = new Child();

s1.play.push(4);
console.log(s1.play, s2.play);

/**
 * 构造函数继承（借助call）
 *
 *  缺点：只能继承父类的实例属性和方法，不能继承原型属性或者方法。
 */

function Parent1() {
  this.name = 'parent1';
}

Parent1.prototype.getName = function () {
  return this?.name;
};

function Child1() {
  Parent1.call(this);
  this.type = 'child1';
}

const child = new Child1();
console.log(child);
// console.log(child.getName());

/**
 * 组合继承（前两种组合）
 * 缺点：
 *  通过注释我们可以看到 Parent3 执行了两次，第一次是改变Child3 的 prototype 的时候，
 * 第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销
 */
function Parent3() {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};
function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = 'child3';
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'

/**
 * 原型式继承
 *  Object.create 这个方法可以实现普通对象的继承，不仅仅能继承属性，同样也可以继承 getName 的方法
 * 缺点：缺点也很明显，多个实例的引用类型属性指向相同的内存，存在篡改的可能，
 *
 */
let parent4 = {
  name: 'parent4',
  friends: ['p1', 'p2', 'p3'],
  getName: function () {
    return this.name;
  }
};

let person4 = Object.create(parent4);
person4.name = 'tom';
person4.friends.push('jerry');

let person5 = Object.create(parent4);
person5.friends.push('lucy');

console.log(person4.name);
console.log(person4.name === person4.getName());
console.log(person5.name);
console.log(person4.friends);
console.log(person5.friends);

/**
 * 寄生式继承
 * 使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。
 * 其优缺点和原型式继承一样:多个实例的引用类型属性指向相同的内存，存在篡改的可能，
 */
let parent6 = {
  name: 'parent6',
  friends: ['p1', 'p2', 'p3'],
  getName: function () {
    return this.name;
  }
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person6 = clone(parent6);

console.log(person6.getName());
console.log(person6.getFriends());

/**
 * 寄生组合式继承
 *解决普通对象的继承问题的 Object.create 方法，我们在前面这几种继承方式的优缺点基础上进行改造，
 *得出了寄生组合式的继承方式，这也是所有继承方式里面相对最优的继承方式
 */
function clone2(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent7() {
  this.name = 'parent7';
  this.play = [1, 2, 3];
}

Parent7.prototype.getName = function () {
  return this.name;
};
function Child7() {
  Parent7.call(this);
  this.friends = 'child7';
}

clone2(Parent7, Child7);

Child7.prototype.getFriends = function () {
  return this.friends;
};

let person7 = new Child7();
console.log(person7);
console.log(person7.getName());
console.log(person7.getFriends());

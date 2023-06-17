'use strict';
var a = 10;
function foo() {
  console.log('this1', this);
  console.log(window.a);
  console.log(this.a);
}
console.log(window.foo);
console.log('this2', this);
console.log(a);
foo();

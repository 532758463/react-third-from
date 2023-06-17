/**
 *构造器模式
 */

function User(name, age, career) {
  this.name = name;
  this.age = age;
  this.career = career;
}

const user = new User('li', 25, 'coder');
console.log(user);
// const liLei = {
//   name: '李雷',
//   age: 25,
//   career: 'coder'
// };

// const hanMeiMei = {
//   name: '韩梅梅',
//   age: 24,
//   career: 'product manager'
// };

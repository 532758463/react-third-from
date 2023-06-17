/**
 * 工厂模式
 */

function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}

const mapToArr = {
  coder: ['写代码', '修bug'],
  boss: ['喝茶', '看书']
};

function Factor({ name, age, career }) {
  return new User(name, age, career, mapToArr[career]);
}

const instance = Factor({
  name: '李雷',
  age: 25,
  career: 'coder'
});

console.log(instance);

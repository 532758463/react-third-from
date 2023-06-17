export interface IProps {
  size: number;
}

// function getPropValue<T extends object, Key extends keyof T>(
//   obj: T,
//   key: Key
// ): T[Key] {
//   return obj[key];
// }

// 获取props中莫格属性的类型
type a = IProps['size'];
const c: a = 1;
console.log(c);

// interface IPerson {
//   readonly name: string;
//   age?: number;
// }

// type tuple = [string, number?];
type res = 1 extends 2 ? true : false;
const isTure: res = false;
console.log(isTure);
type isTwo<T> = T extends 2 ? true : false;
type res2 = isTwo<2>;
const isTwo2: res2 = true;
console.log(isTwo2);
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T | R
  : never;

type res3 = First<[1, 2, 3]>;
const d: res3 = 1;
console.log(d);

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ];
};

type res4 = MapType<{ a: 1; b: 2 }>;
const re4: res4 = {
  aaa: [1, 1, 1],
  bbb: [2, 2, 2]
};
console.log(re4);

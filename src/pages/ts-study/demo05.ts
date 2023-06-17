/* eslint-disable no-unused-vars */
/**
 * 数组长度做计数
 TypeScript 类型系统没有加减乘除运算符，怎么做数值运算呢？
不知道大家有没有注意到数组类型取 length 就是数值。
 */
type num1 = [unknown]['length'];

export type { num1 };
// TypeScript 类型系统中没有加减乘除运算符，
// 但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。

/**
 *数组长度实现加减乘除
 */

// 1. Add
type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : BuildArr<Length, Ele, [...Arr, Ele]>;

type Add<num1 extends number, num2 extends number> = [
  ...BuildArr<num1>,
  ...BuildArr<num2>
]['length'];
type AddRes = Add<12, 13>;

//  2. Subtract减法
type Substract<
  num1 extends number,
  num2 extends number
> = BuildArr<num1> extends [...BuildArr<num2>, ...infer Rest]
  ? [...Rest]['length']
  : never;
type Substract2<
  num1 extends number,
  num2 extends number
> = BuildArr<num1> extends [...arr1: BuildArr<num2>, ...arr2: infer Rest]
  ? [...Rest]['length']
  : never;
type SubstractRes = Substract<31, 12>;

// 3.Mutiply 乘法
type Mutiply<
  num1 extends number,
  num2 extends number,
  ResultArr extends unknown[] = []
> = num2 extends 0
  ? ResultArr['length']
  : Mutiply<num1, Substract<num2, 1>, [...BuildArr<num1>, ...ResultArr]>;
type MutiplyRes = Mutiply<990, 5>;

// 4.Divide 除法
type Divide<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends 0
  ? CountArr['length']
  : Divide<Substract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

type DivideResult = Divide<30, 5>;

// StrLen获取字符串长度,数组长度实现计数
type StrLen<
  Str extends string,
  CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [unknown, ...CountArr]>
  : CountArr['length'];
type StrLenResult = StrLen<'Hello World'>;

// GreaterThan Num1 > Num2 ==> true 否则为false
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : Num1 extends CountArr['length']
  ? false
  : Num2 extends CountArr['length']
  ? true
  : GreaterThan<Num1, Num2, [unknown, ...CountArr]>;

type GreaterThanResult = GreaterThan<3, 4>;
type GreaterThanResult2 = GreaterThan<6, 4>;

type GreaterThan2<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : CountArr['length'] extends Num2
  ? true
  : CountArr['length'] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...CountArr, unknown]>;

type GreaterThan2Result = GreaterThan<3, 4>;
type GreaterThan2Result2 = GreaterThan<6, 4>;

// Fibonacci 数列是 1、1、2、3、5、8、13、21、34、…… 这样的数列，有当前的数是前两个数的和的规律。
type FibonacciLoop<
  PrevArr extends unknown[],
  CurrArr extends unknown[],
  IndexArr extends unknown[],
  Num extends number = 1
> = IndexArr['length'] extends Num
  ? CurrArr['length']
  : FibonacciLoop<
      CurrArr,
      [...PrevArr, ...CurrArr],
      [...IndexArr, unknown],
      Num
    >;
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
// 1、1、2、3、5、8、13、21、34
type FibonacciResult = Fibonacci<8>;

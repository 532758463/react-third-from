/* eslint-disable no-unused-vars */
/**
 * =====================
 * 1.模式匹配做提取
 * ====================
 */
type p = Promise<'xiao'>;
// Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，
// 结果保存到通过 infer 声明的局部类型变量里，
// 如果匹配就能从该局部变量里拿到提取出的类型。
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;

type GetValueResult = GetValueType<p>;

export type { GetValueType, GetValueResult };

/**
 * 数组类型
 */
type arr = [1, 2, 3];
//  First 提取第一个数组元素
type GetFirst<T> = T extends [infer First, ...unknown[]] ? First : never;
// any 和 unknown 的区别： any 和 unknown 都代表任意类型，
// 但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。
// 类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。
type GetFirstRes = GetFirst<arr>;
type GetFirstRes2 = GetFirst<[]>;

export type { GetFirstRes, GetFirstRes2 };

//  last 提取最后一个数组元素
type GetLast<T> = T extends [...unknown[], infer Last] ? Last : never;
type GetLastRes = GetLast<arr>;
export type { GetLastRes };

// PopArr 我们分别取了首尾元素，当然也可以取剩余的数组，比如取去掉了最后一个元素的数组
type PopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;
type PopArrRes = PopArr<arr>;

// ShiftArr
type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;
type ShiftArrRes = ShiftArr<arr>;
export type { PopArrRes, ShiftArrRes };

/**
 * ============
 * 字符串类型
 * ============
 */
// StartsWith 判断字符串是否以某个前缀开头，也是通过模式匹配
type StartsWith<
  Str extends string,
  Prefix extends string
  // eslint-disable-next-line prettier/prettier
> = Str extends `${Prefix}${string}` ? true : false;
type StartsWithRes = StartsWith<'xiao yang', 'xiao'>;

export type { StartsWithRes };

// Replace
// 字符串可以匹配一个模式类型，提取想要的部分，自然也可以用这些再构成一个新的类型
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
  // eslint-disable-next-line prettier/prettier
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type ReplaceRes = ReplaceStr<'xxiaoyang', 'x', ''>;
type ReplaceRes2 = ReplaceStr<'My best friend is ?', '?', 'xiaoyang'>;
export type { ReplaceRes, ReplaceRes2 };

// Trim 能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：
// TrimRight
// eslint-disable-next-line prettier/prettier
type TrimRight<Str extends string> = Str extends `${infer Rest}${
  | ' '
  | '\n'
  | '\t'}`
  ? TrimRight<Rest>
  : Str;

type TrimRightRes = TrimRight<'xiao           '>;

// TrimLeft
// eslint-disable-next-line prettier/prettier
type TrimLeft<Str extends string> = Str extends `${
  | ' '
  | '\n'
  | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type TrimLeftRes = TrimLeft<'           xiao'>;

type TrimStr<Str extends string> = TrimRight<TrimLeft<Str>>;
type TrimStrRes = TrimStr<'    xiao yang   '>;
export type { TrimRightRes, TrimLeftRes, TrimStrRes };

/**
 * 函数
 * 函数同样也可以做类型匹配，比如提取参数、返回值的类型。
 */

type GetParameters<Fn extends Function> = Fn extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type ParameterRes = GetParameters<(name: string, age: string) => string>;

type GetReturnType<Fn extends Function> = Fn extends (
  ...args: infer Args
) => infer ReturnType
  ? ReturnType
  : never;

type ReturnTypeRes = GetReturnType<(name: string, age: string) => 'string'>;

class Dong {
  name: string;

  constructor() {
    this.name = 'dong';
  }

  hello(this: Dong) {
    return "hello, I'm " + this.name;
  }
}

const dong = new Dong();
dong.hello();

type GetThisParameterType<Fn extends Function> = Fn extends (
  this: infer ThisType,
  ...args: infer Args
) => unknown
  ? ThisType
  : never;

type GetThisParameterTypeRes = GetThisParameterType<typeof dong.hello>;

/**
 * 构造器
 * 构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new。
 * 同样，我们也可以通过模式匹配提取构造器的参数和返回值的类型：
 */
interface Person {
  name: string;
}
interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<ConstructorType extends new (...args: any) => unknown> =
  ConstructorType extends new (...args: infer Args) => infer InstanceType
    ? InstanceType
    : never;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

/**
 * GetConstructorParameters
 * GetInstanceType 是提取构造器返回值类型，那同样也可以提取构造器的参数类型：
 */
type GetConstructorParameters<
  ConstructorType extends new (...args: any) => unknown
> = ConstructorType extends new (...args: infer ParametersType) => unknown
  ? ParametersType
  : never;

type GetParametersTypeRes = GetConstructorParameters<PersonConstructor>;

/**
 * 索引類型
 * GetRefProps
 * 我们同样通过模式匹配的方式提取 ref 的值的类型：
 */
type GetRefProps<Props> = 'ref' extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;
type GetRefPropsRes = GetRefProps<{ ref: '1'; value: '22' }>;
type GetRefPropsRes2 = GetRefProps<{ value: '22' }>;
type GetRefPropsRes3 = GetRefProps<{ ref: undefined; value: '22' }>;
/**
 * =====================
 * 总结
 * =====================

  就像字符串可以匹配一个模式串提取子组一样，TypeScript 类型也可以匹配一个模式类型提取某个部分的类型。
TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里，
后面可以从这个局部变量拿到类型做各种后续处理。
模式匹配的套路在数组、字符串、函数、构造器、索引类型、Promise 等类型中都有大量的应用，
掌握好这个套路能提升很大一截类型体操水平。
 */

/* eslint-disable no-unused-vars */
/**
 * 递归复用做循环
 递归是把问题分解为一系列相似的小问题，通过函数不断调用自身来解决这一个个小问题，直到满足结束条件，就完成了问题的求解。

 TypeScript 类型系统不支持循环，但支持递归。当处理数量（个数、长度、层数）不固定的类型的时候，
 可以只处理一个类型，然后递归的调用自身处理下一个类型，
 直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。
 */

//  DeepPromiseValueType
type ttt = Promise<Promise<Promise<Record<string, any>>>>;
type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;

type DeepPromiseValueTypeRes = DeepPromiseValueType<ttt>;

// 简化版本 DeepPromiseValueType
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;
type DeepPromiseValueTypeRes2 = DeepPromiseValueType2<ttt>;
export type { DeepPromiseValueType };

// 数组类型的递归
type arr = [1, 2, 3, 4, 5];
//=> type arr = [5,4,3,2,1];

type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : T;
type ReverseArrRes = ReverseArr<arr>;

// Includes
// 既然递归可以做循环用，那么像查找元素这种自然也就可以实现。
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

type IncludesRes = Includes<arr, 4>;

type IncludesRes2 = Includes<arr, '4'>;

// RemoveItem
// 可以查找自然就可以删除，只需要改下返回结果，构造一个新的数组返回。
type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

type Arr2 = [1, 2, 3, 4, 4, 4545, 55, 4, 44];
type RemoveItemRes = RemoveItem<Arr2, 4>;

// BuildArray
// 我们学过数组类型的构造，如果构造的数组类型元素个数不确定，也需要递归。
// 比如传入 5 和元素类型，构造一个长度为 5 的该元素类型构成的数组。
type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : [...Arr, Ele];
type BuildArrRes = BuildArr<5>;

// 字符串类型递归
// ReplaceAll
// 学模式匹配的时候，我们实现过一个 Replace 的高级类型：
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? ReplaceAll<`${Left}${To}${Right}`, From, To>
  : Str;

type ReplaceAllResult = ReplaceAll<'guang guang guang', 'guang', 'dong'>;

type ReplaceAll2<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str;

type ReplaceAllResult2 = ReplaceAll2<'guang guang guang', 'guang', 'dong'>;

//  StringToUnion
// 我们想把字符串字面量类型的每个字符都提取出来组成联合类型，也就是把 'dong' 转为 'd' | 'o' | 'n' | 'g'
type StringToUnion1<Str extends string> =
  Str extends `${infer One}${infer Two}${infer Three}${infer Four}`
    ? One | Two | Three | Four
    : never;
type StringToUnionRes1 = StringToUnion1<'dong'>;

type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

type StringToUnionRes = StringToUnion<'dong'>;

// ReverseStr
// 字符串反转
type ReverseStr1<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : '';

type ReverseStr<
  Str extends string,
  Result extends string = ''
> = Str extends `${infer First}${infer Rest}`
  ? ReverseStr<Rest, `${First}${Result}`>
  : Result;
type ReverseStrRes = ReverseStr<'hello'>;

// 对象类型的递归
// DeepReadonly
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong';
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};
type ToReadonlyRes = ToReadonly<obj>;
// 数量（层数）不确定，类型体操中应该自然的想到递归。
type DeepReadonly1<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? Obj[Key] extends Function
      ? Obj[Key]
      : DeepReadonly<Obj[Key]>
    : Obj[Key];
};
type DeepReadonlyResult1 = DeepReadonly1<obj>;

type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key];
    }
  : never;
type DeepReadonlyResult2 = DeepReadonly2<obj>;

type DeepReadonly<T extends Record<string, any>> = T extends any
  ? {
      readonly [Key in keyof T]: T[Key] extends object
        ? T[Key] extends Function
          ? T[Key]
          : DeepReadonly<T[Key]>
        : T[Key];
    }
  : never;
type DeepReadonlyResult = DeepReadonly<obj>;

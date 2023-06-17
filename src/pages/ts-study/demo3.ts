/* eslint-disable no-unused-vars */
/**
 * 重新构造做变换
 * 类型编程主要的目的就是对类型做各种转换，那么如何对类型做修改呢？
  TypeScript 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。
 */
//  type 叫做类型别名，其实就是声明一个变量存储某个类型：
type ttt = Promise<number>;

//  infer 用于类型的提取，然后存到一个变量里，相当于局部变量：
type GetValue<P> = P extends Promise<infer Value> ? Value : never;

// 类型参数用于接受具体的类型，在类型运算中也相当于局部变量：
type isTwo<T> = T extends 2 ? true : false;

/**
 * 重新构造
TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。

数组、字符串、函数等类型的重新构造比较简单。

索引类型，也就是多个元素的聚合类型的重新构造复杂一些，涉及到了映射类型的语法。
 */

export type { ttt, GetValue };

// Push
type tuple = [1, 2, 3];
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushRes = Push<tuple, 4>;

// unshift
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type UnshiftRes = Unshift<tuple, 4>;

type tuple1 = [1, 2];
type tuple2 = ['guang', 'dong'];
// ===> type tuple = [[1, 'guang'], [2, 'dong']];

type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneLast]
  ? Other extends [infer OtherFirst, infer OtherLast]
    ? [[OneFirst, OtherFirst], [OneLast, OtherLast]]
    : []
  : [];
type ZipRes = Zip<tuple1, tuple2>;

type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]
    : []
  : [];
type ZipRes2 = Zip2<tuple1, tuple2>;
type Zip2Result = Zip2<
  [1, 2, 3, 4, 5],
  ['guang', 'dong', 'is', 'best', 'friend']
>;

// 字符串类型的重新构造
// CapitalizeStr
// 我们想把一个字符串字面量类型的 'guang' 转为首字母大写的 'Guang'。
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;
type CapitalizeResult = CapitalizeStr<'guang'>;

// CamelCase
// 我们再来实现 dong_dong_dong 到 dongDongDong 的变换。
type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer Next}${infer Rest}`
    ? `${First}${Uppercase<Next>}${CamelCase<Rest>}`
    : Str;
type CamelCaseRes = CamelCase<'dong_dong_dong'>;

// DropSubStr
// 可以修改自然也可以删除，我们再来做一个删除一段字符串的案例：删除字符串中的某个子串
// dong~~~ => dong
type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? `${Prefix}${DropSubStr<Suffix, SubStr>}`
  : Str;

type DropSubStr2<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;
type DropSubStrRes = DropSubStr<'~~~~~dong~~~', '~'>;
type DropSub2StrRes = DropSubStr2<'~~~~~dong~~~', '~'>;

// 函数类型的重新构造：
// AppendArgument 在已有的函数类型上添加一个参数：
type AppendArgument<Fn extends Function, Arg> = Fn extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;
type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;

/**
 * 索引类型的重新构造
 */
type Obj = {
  readonly name: string;
  age?: number;
  gender: boolean;
};

type Mapping<Obj extends object> = {
  [Key in keyof Obj]: Obj[Key];
};

type MappingRes = Mapping<Obj>;
// Mapping
// 映射的过程中可以对 value 做下修改，比如：
type Mapping2<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type Mapping2Res = Mapping2<{ name: 'xiao'; age: 25 }>;

// UppercaseKey
// 除了可以对 Value 做修改，也可以对 Key 做修改，使用 as，这叫做重映射：

type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKeyRes = UppercaseKey<{ name: 'xiao'; age: 25 }>;
// 通过 Uppercase 把索引 Key 转为大写，因为索引可能为 string、number、symbol 类型，
// 而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分。

// 索引类型
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';
type Record<K extends string | number | symbol, T> = { [P in K]: T };
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};

type UppercaseKey2<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKey2Res = UppercaseKey2<{ name: 'xiao'; age: 25 }>;

// ToReadonly
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ToReadonlyRes = ToReadonly<{ name: 'xiao'; age: 25 }>;

// ToPartial
// 同理，索引类型还可以添加可选修饰符：
type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type ToPartialRes = ToPartial<{ name: 'xiao'; age: 25 }>;

// ToMutable
// 可以添加 readonly 修饰，当然也可以去掉：
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type ToMutableRes = ToMutable<{ readonly name: string; age: number }>;

// ToRequired
// 同理，也可以去掉可选修饰符：
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};

type ToRequiredRes = ToRequired<{
  name?: string;
  age?: string;
}>;

// FilterByValueType
// 根据返回值类型做过滤

type FilterByValueType<T extends Record<string, any>, ValueType> = {
  [Key in keyof T as T[Key] extends ValueType ? Key : never]: T[Key];
};
// 如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，
// 否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
interface Person {
  name: string;
  age: number;
  hobby: string[];
}

type FilterResult = FilterByValueType<Person, string | number>;

/**
 TypeScript 支持 type、infer、类型参数来保存任意类型，相当于变量的作用。

但其实也不能叫变量，因为它们是不可变的。想要变化就需要重新构造新的类型，
并且可以在构造新类型的过程中对原类型做一些过滤和变换。

数组、字符串、函数、索引类型等都可以用这种方式对原类型做变换产生新的类型。
其中索引类型有专门的语法叫做映射类型，对索引做修改的 as 叫做重映射。
*/

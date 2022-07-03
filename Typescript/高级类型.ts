

/**
 * 关键字
 * - T extends U              类型约束，判断 T 是否可以赋值给 U
 * - P in T                   类型映射，遍历 T 的所有类型
 * - infer P
 * - parameterName is Type    类型谓词，判断函数参数 parameterName 是否是 Type 类型
 * - typeof v === "typename"  原始类型保护，判断数据的类型是否是某个原始类型（number、string、boolean、symbol）
 * - instanceof v             类型保护，判断数据的类型是否是构造函数的 prototype 属性类型
 * - T[K]                     索引访问操作符，返回 T 对应属性 P 的类型
 * - keyof                    索引类型查询操作符，返回类型上已知的 公共属性名
 */

// extends
/**
 * 类型映射(in)
 */
interface Person {
  name: string
  age: number
  gender: number
}
// 将 T 的所有属性转换为只读类型
type ReadOnlyType<T> = {
  readonly [P in keyof T]: T
}

// type ReadOnlyPerson = {
//     readonly name: Person;
//     readonly age: Person;
//     readonly gender: Person;
// }
type ReadOnlyPerson = ReadOnlyType<Person>

/**
 * 类型谓词(is)
 * - 语法：parameterName is Type
 * - 用法：看完联合类型的例子后，可能会考虑：如果想要在 start 函数中，根据情况去调用 Bird 的 fly 方法和 Fish 的 swim 方法，该如何操作呢？
 */
 function start1(pet: Bird | Fish) {
  // 调用 layEggs 没问题，因为 Bird 或者 Fish 都有 layEggs 方法
  pet.layEggs();

  if ((pet as Bird).fly) {
      (pet as Bird).fly();
  } else if ((pet as Fish).swim) {
      (pet as Fish).swim();
  }
 }

function isBird(bird: Bird | Fish): bird is Bird {
  return !!(bird as Bird).fly
}

function start2(pet: Bird | Fish) {
  // TypeScript 不仅知道在 if 分支里 pet 是 Fish 类型；它还清楚在 else 分支里，一定不是 Fish 类型，一定是 Bird 类型
  if (isBird(pet)) {
    pet.fly()
  } else {
    pet.swim()
  }
}

/**
 * 待推断类型(infer)
 * 可以用 infer P 来标记一个泛型，表示这个泛型是一个待推断的类型，并且可以直接使用
 */
 type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

 type FunctionType = (name: string, age: number) => string;
 type FunctionParamsType = Parameters<FunctionType>; // [name: string, age: number]
 
 const params: FunctionParamsType = ['Tom', 20];
 
 type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;
 type FunctionReturnType = ReturnType<FunctionType>; // string
 
const returnType: FunctionReturnType = 'name';
 
/**
 * 原始类型保护(typeof)
 * - 语法：typeof v === "typename" 或 typeof v !== "typename"
 */
 function print(value: number | string) {
  if (typeof value === 'string') {
      console.log(value.split('').join(', '))
  } else {
      console.log(value.toFixed(2))
  }
 }

/**
 * 类型保护(instanceof)
 * 与 typeof 类似，不过作用方式不同，instanceof 类型保护是通过构造函数来细化类型的一种方式。
 * instanceof 的右侧要求是一个构造函数，TypeScript 将细化为：
 *  - 此构造函数的 prototype 属性的类型，如果它的类型不为 any 的话
 *  - 构造签名所返回的类型的联合
 */
// 根据类型谓词的实例改造
function start3(pet: Bird | Fish) {
  // 调用 layEggs 没问题，因为 Bird 或者 Fish 都有 layEggs 方法
  pet.layEggs();

  if (pet instanceof Bird) {
      pet.fly();
  } else {
      pet.swim();
  }
}

/**
 * 映射类型
 */
// 只读类型(Readonly<T>)
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 只读数组(ReadonlyArray<T>)
type ReadonlyArray<T> = {
  /**
   * Iterator of values in the array. */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;
}

// 可选类型(Partial<T>):用于将 T 类型的所有属性设置为可选状态，首先通过 keyof T，取出类型 T 的所有属性， 然后通过 in 操作符进行遍历，最后在属性后加上 ?，将属性变为可选属性。
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 必选类型(Required<T>)
type Required<T> = {
  [P in keyof T]-?: T[P]
}

// 提取属性(Pick<T>)
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 排除属性(Omit<T>)
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 摘取类型(Extract<T, U>)
type Extract<T, U> = T extends U ? T : never;

type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Extract<string | number | (() => void), Function>;  // () => void

// 排除类型(Exclude<T, U>)
type Exclude<T, U> = T extends U ? never : T
type T03 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

type T04 = Exclude<string | number | (() => void), Function>;  // string | number

// 属性映射(Record<K, T>)
type Record<K extends string | number | symbol, T> = {
  [P in K]: T
}

// 不可为空类型(NonNullable<T>)
type NonNullable<T> = T extends null | undefined ? never : T

// 实例类型(InstanceType<T>)
type InstanceType<T> = T extends new (...args: any) => infer R ? R : never





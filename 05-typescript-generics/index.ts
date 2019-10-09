/* ------------------------------- Day 42 ----------------------------------- */

/* 泛用型別 Generic Types */

// 宣告名為 Identity 的化名；其中，裡面有一個參數化的型別 T
type Identity<T> = T;

let shouldBeNumber: Identity<number>;

/* 泛用型別化名的各種形式 */
// 宣告一個泛用的 Dictionary 型別化名
type Dictionary<T> = {
  [prop: string]: T
};

// 宣告一個泛用的 LinkedList 和 LinkedListNode 介面
interface LinkedList<T> {
  head: LinkedListNode<T> | null;
  length: number;
  at(index: number): LinkedListNode<T> | null;
};

interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
}

// 宣告一個泛用的 TypedArray 類別
class TypedArray<T> {
  constructor(public values: T[]) {}
}

/* 使用 Dictionary<T> */
// 正確使用 Dictionary<T>
let correctDict: Dictionary<boolean> = {
  wentToClub: true,               // 有沒有上過夜店？
  playedMahjong: true,            // 有沒有打過麻將？
  isEvadingMayor: true,           // 是不是落跑市長？
  hasPoliticalAcheivement: false, // 有沒有政績？
};

// Dictionary<boolean> 會被警告的部分，如果值非 boolean 型別
// let wrongDict: Dictionary<boolean> = {
//   koreaIsFun: true,                // 旅遊韓國愉快？
//   whyIsKoreaFun: 'No mayor evaded' // 為何旅遊韓國愉快？
// };

/* 泛用函式與泛用 */
// 1. 函式型別的泛用型式
type operator<T> = (p1: T, p2: T) => T;

// addition 被註記為 operator<number>
// 代表必須符合 (p1: number, p2: number): number 型別
let addition: operator<number> =
  function (p1: number, p2: number): number {
    return p1 + p2;
  };

// stringConcatenation 被註記為 operator<string>
// 代表必須符合 (p1: string, p2: string): string 型別
let stringConcatenation: operator<string> =
  function (p1: string, p2: string): string {
    return p1 + p2;
  };

// 2. 函式本身是泛用的形式
function identityFunc<T>(something: T): T {
  return something;
}

/* 多重泛用參數的形式 */
// TypeConversion 型別化名為將某輸入轉換成不同的輸出型別
// 但必須根據 T 與 U 的型別參數指定到的型別進行轉換
type TypeConversion<T, U> = (input: T) => U;

// 檢測數字是否為正數
let isPositive: TypeConversion<number, boolean> =
  function (input: number) {
    return input > 0;
  };

// 將任何東西變成 `string` 型別的值
let anythingToString: TypeConversion<any, string> =
  function (input: any) {
    return input.toString();
  };

/* 內建泛用型別 Built-in Generics */
// 等效於具有型別的陣列
type MyArray<T> = T[];

// 使用 TypeScript 陣列型別方式表示陣列
let numericArray: number[] = [1, 2, 3];

// number[] 等效於 Array<number>
let anotherNumericArray: Array<number> = numericArray;

// 使用 TypeScript 泛用型別方式表示陣列
let stringArray: Array<string> = ['Hello', 'World'];

// Array<string> 等效於 string[]
let anotherStringArray: string[] = stringArray;

/* 條件型別的應用 Conditional Types */
// 應用部分官方是稱作 Utility Type - 以下以 Required 為例子 

// interface PersonalInfo {
//   name: string;
//   age?: number;
//   hasPet?: boolean;
// }

// 至少有 name 但不一定需要 age 或 hasPet
// let validPersonalInfo: PersonalInfo = {
//   name: 'Maxwell',
//   hasPet: false,
// };

// 多了不相關的一鍵就會被 TypeScript 譙
// let wrongPersonalInfo: PersonalInfo = {
//   name: 'Maxwell',
//   age: 20,
//   hasMotorcycle: true,
// };

// 但被冠上 Require 條件型別後，TypeScript 就會
// 嚴格要求 age 與 hasPet 必須存在
// let incompletePersonalInfo: Required<PersonalInfo> = {
//   name: 'Maxwell',
//   age: 20,
// };







/* ------------------------------- Day 43 ----------------------------------- */

/* 基礎泛用型別註記 */
// 泛用型別之參數有被指定的情形
let numbersArr: Array<number> = [1, 2, 3];

// 泛用型別之參數沒有被指定的情形 => 出錯！
// let unspecifiedTypeParamArr: Array = [1, 2, 3];

/* 預設型別 */
type DefaultStringDictionary<T = string> = {
  [prop: string]: T
};

// 預設鍵值對的值之型別為 string
let stringDict: DefaultStringDictionary = {
  message: 'Hello world',
  language: 'TypeScript'
};

// 覆寫鍵值對的值之型別為 boolean
let booleanDict: DefaultStringDictionary<boolean> = {
  hasPet: false,
  hasMotorcycle: true,
};

/* 泛用化名之型別參數限制 */
// 宣告 Primitives 為所有原始型別的 union
type Primitives = number | string | boolean | null | undefined;

// 宣告 PrimitiveArray 為泛用型別，但是 T 被限制為 Primitives 的範疇
type PrimitiveArray<T extends Primitives> = Array<T>;

// 1. 單純原始型別陣列
let numberPrimitiveArr:
  PrimitiveArray<number> = [1, 2, 3];

let stringPrimitiveArr:
  PrimitiveArray<string> = ['Hello', 'World'];

// 2. 原始型別複合的陣列 => 照樣符合原始型別 union 的範疇
let numberOrStringPrimitiveArr:
  PrimitiveArray<number | string> = [1, '2', 3];

// 3. 物件型別的陣列 => 非原始型別，會被 TypeScript 警吿
interface PersonalInfo {
  name: string;
  age: number;
  hasPet: boolean;
}

// let invalidObjectArray:
//   PrimitiveArray<PersonalInfo> = [
//     {
//       name: 'Maxwell',
//       age: 20,
//       hasPet: false
//     },
//     {
//       name: 'Martin',
//       age: 28,
//       hasPet: true
//     }
//   ];

/* 使用條件型別寫法 */
type TypedPrimitiveArray<T extends Primitives> =
  T extends number    ? T[] :
  T extends string    ? T[] :
  T extends boolean   ? T[] :
  T extends null      ? T[] :
  T extends undefined ? T[] : never;

// 合理的使用行為：
let onlyNumberArr:
  TypedPrimitiveArray<number> = [1, 2, 3];

let onlyStringArr:
  TypedPrimitiveArray<string> = ['Hello', 'World'];

// 違反的使用行為：
// let invalidPrimitiveUnionedArr:
//   TypedPrimitiveArray<number | string> = [1, '2', 3];

/* 泛用函式 */
// 宣告一個名為 traverseElements 的泛用函式
function traverseElements<T>(
  values: Array<T>,
  callback: (el: T, index: number) => void,
) {
  for (let i = 0; i < values.length; i += 1) {
    callback(values[i], i);
  }
}

// 宣告一個數字陣列型別符合 Array<number>
let numberArrayInput = [2, 3, 5, 7, 11];

// 一個函式負責將數字陣列裡的值
let traverseCallback = function(el: number, index: number) {
  console.log(`Index ${index} - Value ${el}`);
}

// 使用 traverseElements<number>
traverseElements<number>(
  numberArrayInput,
  traverseCallback
);

// 合併簡化結果：
traverseElements<number>(
  [2, 3, 5, 7, 11] as Array<number>,
  function (el: number, index: number) {
    console.log(`Index ${index} - Value ${el}`);
  }
);

// 最終簡化結果：
traverseElements<number>(
  [2, 3, 5, 7, 11],
  function (el, index) {
    console.log(`Index ${index} - Value ${el}`);
  }
);

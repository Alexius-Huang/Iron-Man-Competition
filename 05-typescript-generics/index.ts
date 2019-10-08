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

interface PersonalInfo {
  name: string;
  age?: number;
  hasPet?: boolean;
}

// 至少有 name 但不一定需要 age 或 hasPet
let validPersonalInfo: PersonalInfo = {
  name: 'Maxwell',
  hasPet: false,
};

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


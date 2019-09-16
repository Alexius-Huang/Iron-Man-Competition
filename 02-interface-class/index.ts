/* ------------------------------- Day 12 ----------------------------------- */

/* 型別化名的各種表現形式 */
// 全部都是原始型別集合
type Primitives = number | string | boolean | null | undefined;

// 該陣列可以任意存取各種原始型別值
type PrimitiveArray = Primitives[];

// 函式型別的化名
type OperatorFunc = (op1: Primitives, op2: Primitives) => unknown;

// 狹義物件明文型別的化名
type PersonalInfo = {
  name: string,
  age: number,
  hasPet: boolean
};

// 元組化名
type VehicleInfo = [string, string, string, Date];

// 列舉組合化名
enum WeekDayEnum { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
type WeekDayString = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'; 
type WeekDayFormat = WeekDayEnum | WeekDayString;

/* 介面 (Interface) 的表現形式 */
enum Gender { Male, Female, Other };

// 物件格式的表示方式
interface UserInfo {
  // 原始型別
  id: number;
  name: string;

  // 廣義物件型別
  birth: Date;
  interests: string[];

  // TypeScript Enum 或 Tuple 都可，這裡用 Enum
  gender: Gender;

  // 明文型別，這裡用物件明文型別
  address: {
    country: string;
    city: string;
    postalCode: string;
  };

  // 函式型別
  logInfo(message: string): void;
}

// 單純只有函式的格式
interface UpdateRecord {
  (id: number, newRecord: UserInfo): void;
}

/* 基本的 Interface 使用方式 */
// 定義一個介面
interface Person {
  name: string;
  age: number;
  hasPet: boolean;
}

// 使用介面
const maxwell: Person = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
};

// 少一鍵會被認為錯誤 => 被 TS 警告！
// const martin: Person = {
//   name: 'Martin',
//   hasPet: true,
// };

// 多一鍵也會被認為錯誤 => 被 TS 警告！
// const leo: Person = {
//   name: 'Leo',
//   age: 28,
//   hasPet: false,
//   job: 'DevOps',
// };

// 屬性對應型別錯誤 => 被 TS 警告！
// const toby: Person = {
//   name: 'Toby',
//   age: 34,
//   hasPet: 'Crocodile'
// };

/* 檢測物件被推論結果作為函式的參數的狀況 */
// 這ㄧ次函式使用的是 interface 而不是 type alias
function printPersonInfo(person: Person) {
  console.log(`Name: ${person.name}`);
  console.log(`Age is: ${person.age}`);
  console.log(`Owns a pet? ${person.hasPet}`);
}

// 情形一：直接代入狹義物件的明文格式 => 會出現警告！
// printPersonInfo({
//   name: 'Maxwell',
//   age: 20,
//   hasPet: false,

//   job: 'Front-End',
//   nothingSpecial: null,
// });

// 情形二：物件形式存入參數，型別推論過後的結果，將
// 變數作為函式的參數代入
let infoMaxwell = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,

  job: 'Front-End',
  nothingSpecial: null,
};

printPersonInfo(infoMaxwell);

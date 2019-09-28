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

// printPersonInfo(infoMaxwell);






/* ------------------------------- Day 13 ----------------------------------- */

/* 介面的擴展 Interface Extension */
// 前面的例子有定義過，因此這裡做註解
// enum Gender { Male, Female, Other };

interface AccountSystem {
  email: string;
  password: string;
  subscribed: boolean;
}

interface AccountPersonalInfo {
  nickname?: string;
  birth?: Date;
  gender?: Gender;
}

// UserAccount 是 AccountSystem 與 AccountPersonalInfo 的結合
interface UserAccount extends AccountSystem, AccountPersonalInfo {}

/* 使用擴展過後的 Interface */
// 正常使用方法
let accountMaxwell: UserAccount = {
  email: 'max@example.com',
  password: '<hashed-password>',
  subscribed: false,
  nickname: 'Maxwell',
  gender: Gender.Male,
  // birth 可以被省略是因為，該屬性為選用屬性 Optional Property
};

// 少一鍵，且該鍵非選用屬性，則會發出警告
// let accountMartin: UserAccount = {
//   email: 'martin@example.com',
//   password: '<hashed-password>',
//   nickname: 'Mars',
//   birth: new Date(2000, 1, 1),
//   gender: Gender.Male,
// };

// 多一鍵也會發生警告
// let accountLeo: UserAccount = {
//   email: 'leo@example.com',
//   password: '<hashed-password>',
//   subscribed: true,
//   nickname: 'Leonard',
//   birth: new Date(2000, 1, 1),
//   gender: Gender.Male,
//   hasPet: false,
// };

/* 介面的交集 */
// 定義 I1, I2, I3 三種不同介面：
interface I1 { a: string;  b: number;             }
interface I2 {             b: number; c: boolean; }
interface I3 { a: string;             c: string;  }

// I1 和 I2 同時有 b 屬性且對應型別相同 => STRIKE！
interface I12 extends I1, I2 {}

// I2 和 I3 同時有 c 屬性但對應型別不同 => BALL！
// interface I23 extends I2, I3 {}

// I1 和 I3 同時有 a 屬性且對應型別相同 => STRIKE！
interface I13 extends I1, I3 {}

// 想當然三種型別因為 I2, I3 關係而造成衝突 => BALL！
// interface I123 extends I1, I2, I3 {}


/* 函式之參數可以接受各種至少符合介面的格式 */
interface Duck {
  noise: string;
  makeNoise(): void;
}

function pokeTheDuck(something: Duck) {
  something.makeNoise();
}

let maxwellCanBeDuck = {
  name: 'Maxwell',
  age: 20,
  noise: 'He~He~He~He~He~~~', // 有病
  makeNoise() { console.log(this.noise); },
};

let kittyCanBeDuck = {
  color: 'black and white',
  eyes: 'cute',
  noise: 'Meow~meow~meow~meow~meowwwwwwwwwww',
  makeNoise() { console.log(this.noise); },
};

let vehicleCanBeDuck = {
  brand: 'BMW',
  type: 'motorcycle',
  noise: 'Vroom! Vroom! Vroooooooooooom!',
  makeNoise() { console.log('Vrooooooom!!!'); },
};

let duckIsLiterallyDuck = {
  noise: 'Quack~quack~quack~quack~quack~',
  makeNoise() { console.log('Quack!'); },
};

// pokeTheDuck(maxwellCanBeDuck);
// pokeTheDuck(kittyCanBeDuck);
// pokeTheDuck(vehicleCanBeDuck);
// pokeTheDuck(duckIsLiterallyDuck);


/* 用型別去實作跟 UserAccount 同等效果的型別表示 */
type TAccountSystem = {
  email: string;
  password: string;
  subscribed: boolean;
};

type TAccountPersonalInfo = {
  nickname?: string;
  birth?: Date;
  gender?: Gender;
};

/* 用介面去實作跟 UserAccount 同等效果的介面表示 */
interface IAccountSystem {
  email: string;
  password: string;
  subscribed: boolean;
}

interface IAccountPersonalInfo {
  nickname?: string;
  birth?: Date;
  gender?: Gender;
}

// TUserAccount 型別是 TAccountSystem 與 TAccountPersonalInfo 的 Intersection
type TUserAccount = AccountSystem & AccountPersonalInfo;

// IUserAccount 是 IAccountSystem 與 IAccountPersonalInfo 的結合
interface IUserAccount extends IAccountSystem, IAccountPersonalInfo {}






/* ------------------------------- Day 14 ----------------------------------- */

/* 函式超載當然不可能直接動作 */
// 如果是數字則直接套入加法
// function addition(p1: number, p2: number) {
//   return p1 + p2;
// }

// // 如果是字串則轉換成數字
// function addition(p1: string, p2: string) {
//   return parseInt(p1, 10) + parseInt(p2, 10);
// }

/* 介面的屬性對應的函式型別可以被超載喔！ */
interface AddOperation {
  addition(p1: number, p2: number): number;
  addition(p1: string, p2: string): number;
}

const implementAddition: AddOperation = {
  addition(p1: number | string, p2: number | string) {
    if (typeof p1 === 'number' && typeof p2 === 'number') {
      return p1 + p2;
    } else if (typeof p1 === 'string' && typeof p2 === 'string') {
      return parseInt(p1, 10) + parseInt(p2, 10);
    }

    throw new Error(`
      Parameter \`p1\` and \`p2\` should only accept both \`number\`
      type or \`string\` type.
    `);
  }
};

/* 其他案例讀者試試看 */
// 1. 參數與回傳型別一模一樣
interface AddOperation1 {
  add(p1: number, p2: number): number;
  add(p1: number, p2: number): number;
}

// 2. 回傳型別不同但是參數相同
interface AddOperation2 {
  add(p1: number, p2: number): number;
  add(p1: number, p2: number): string;
}

// 3. 參數數量不同
interface AddOperation2 {
  add(p1: number): number;
  add(p1: number, p2: number): number;
}

// 4. 其他讀者可能想得到的案例...

/* 介面融合 Interface Merging */
// Block-Level Elements
interface MyDocument {
  createElement(tag: 'p'):    HTMLParagraphElement;
  createElement(tag: 'body'): HTMLBodyElement;
  createElement(tag: 'div'):  HTMLDivElement;
}

// Inline-Level Elements
interface MyDocument {
  createElement(tag: 'a'):     HTMLAnchorElement;
  createElement(tag: 'span'):  HTMLSpanElement;
  createElement(tag: 'input'): HTMLInputElement;
}


// 第三方套件的 Definition File：
// namespace StupidFramework {
//   interface StupidRequest {
//     headers: Header[];
//     body: Body;
//     url: string;
//     method: 'GET' | 'POST' | ... | 'DELETE';
//     ...
//   }  
// }

/* -------- 分隔線代表不同的檔案 -------- */

// 我們的專案自定義的狀態
// type Dictionary = { [propName: string]: string };

// namespace StupidFramework {
//   interface StupidRequest {
//     query?: Dictionary;
//   }
// }






/* ------------------------------- Day 15 ----------------------------------- */

/* Indexable Types */
// 定義一種物件型別 Dictionary，其中，它的鍵值對都是字串型態
type Dictionary = {
  [propName: string]: string,
};

// 定義類似陣列的型別，其裡面儲存的值為字串
interface StringTypedList {
  [index: number]: string;
}

// Dictionary 範例
// 正常使用方式
let normalDictionary: Dictionary = {
  hello: 'world',
  thisFeature: 'is crazy'
};

// 空的狹義物件狀態也行
let emptyDictionary: Dictionary = {};

// 錯誤的使用方式
// let wrongDictionary: Dictionary = {
//   hello: 123,
//   thisFeature: true,
//   withFunction() { console.log('Wrong type!'); },
//   nestedDictionary: { hello: 123 },
// };

// StringTypedList 範例
// 正常使用方式
let stringTypedArray: StringTypedList = {
  123: 'Hello',
  [456]: 'Hi',
};

// 空的狹義物件狀態也行
let emptyStringTypedArray: StringTypedList = {};

// 但不可以直接變成 Array
// let stringTypedArrayLiteral: StringTypedList = [1, 2, 3];

// 但卻可以為空的 Array
let emptyStringTypedArray2: StringTypedList = [];

// 可以用數字進行索引
stringTypedArray[0];
stringTypedArray[1];

// 錯誤使用方式
// let wrongStringTypedArray: StringTypedList = {
//   message: 'Hello',
//   thisFeature: true
// };

// 也當然不能被字串索引
// stringTypedArray['hello'];

// 當然更不可能用點來呼叫屬性，因為會被當成字串
// stringTypedArray.hello;

/* 選用屬性 Optional Properties */
type TAccountUser = {
  email: string,
  password: string,
  name?: string,
  age?: number,
};

interface IAccountUser {
  email: string;
  password: string;
  name?: string;
  age?: number;
}

/* 唯讀屬性 */
type TAccountUserWithReadonlyProperty = {
  readonly email: string,
  readonly password: string,
  name?: string,
  age?: number,
};

interface IAccountUserWithReadonlyProperty {
  readonly email: string;
  readonly password: string;
  name?: string;
  age?: number;
}

let sampleAccount: TAccountUserWithReadonlyProperty = {
  email: 'maxwell@example.com',
  password: '<hashed-password>',
  name: 'Maxwell'
};

// 可以讀取
sampleAccount.email;

// 但不能寫入 => 強行寫入就被 TS 警告
// sampleAccount.email = 'new@example.com';

/* 混合型介面 Hybrid Type Interface */
interface Counter {
  // 純函式格式
  (start: number): void;

  // 狹義物件的格式
  increment(): number;
  reset(): void;
  value: number;
}

function createCounter(): Counter {
  let value: number;
  let initializedNumber: number;

  // 實踐純函式的部分
  const counter = (function (startNumber: number) {
    initializedNumber = startNumber;
    value = startNumber;
  }) as Counter;

  // 實踐狹義物件格式的部分
  counter.increment = function() {
    value++;
    return value;
  };

  counter.reset = function() {
    value = initializedNumber;
  };

  Object.defineProperty(counter, 'value', {
    get() { return value; }
  });

  return counter;
}

// 建立一個 counter 物件
const counter: Counter = createCounter();

// 藉由 Counter 介面裡面中，純函式型別裡的格式：
// (start: number): void
// 我們可以填入數字
counter(5); // <- 初始化值為 5

// 呼叫 Counter 介面裡的 value 屬性
// console.log(counter.value); // 應該要得出 5

// 呼叫 3 次 Counter 介面裡的 increment 方法
counter.increment();
counter.increment();
counter.increment();

// 再呼叫一次 Counter 介面裡的 value 屬性
// console.log(counter.value); // 應該要得出 8

// 呼叫 Counter 介面裡的 reset 方法
counter.reset();

// 再呼叫一次 Counter 介面裡的 value 屬性
// console.log(counter.value); // 應該要得出 5，也就是原本的初始值






/* ------------------------------- Day 16 ----------------------------------- */

/* 介面不能單純用原始型別表示 */
// 根本沒有介面這樣的定義行為，實質上也沒意義啊
// interface I {
//   number;
// }

// 遑論單純複合狀態
// interface J {
//   number | string;
// }

/* Duck-typing 模式：建議函式之參數註記為介面 */
interface PersonInfo {
  name: string;
  age: number;
  hasPet: boolean;
}

function logPersonInfo (person: PersonInfo): void {
  console.log(`Name: ${person.name}`);
  console.log(`Age: ${person.age}`);
  console.log(`Owns a pet? ${person.hasPet}`);
}

let maxwellInfo = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  email: 'maxwell@example.com',
  ownsMotorcycle: false,
};

// logPersonInfo(maxwellInfo);






/* ------------------------------- Day 17 ----------------------------------- */
/* Union */
type UnionSet1 = number | string;

type UserInfo1 = {
  name: string,
  age: number
};

type UserInfo2 = {
  hasPet: boolean,
  ownsMotorcycle: boolean
};

type UnionSet2 = UserInfo1 | UserInfo2;

// 按照數學推理理應只有三種組合：
// 1. 只有 UserInfo1
let maxwellOnlyInfo1: UnionSet2 = {
  name: 'Maxwell',
  age: 20
};

// 2. 只有 UserInfo2
let maxwellOnlyInfo2: UnionSet2 = {
  hasPet: false,
  ownsMotorcycle: true
};

// 3. 都有
let maxwellOnlyInfo3: UnionSet2 = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
};

// 理應要錯誤的組合：
// 1. UserInfo1 和 UserInfo2 皆缺屬性：保證錯！
// let maxwellWithPartialInfo1: UnionSet2 = {
//   name: 'Maxwell',
//   // age: 20, <-- 缺這個屬性
//   // hasPet: false, <-- 缺這個屬性
//   ownsMotorcycle: true
// };

// 2. UserInfo1 滿足但 UserInfo2 有缺屬性
let maxwellWithPartialInfo2: UnionSet2 = {
  name: 'Maxwell',
  age: 20,
  // hasPet: false, <-- 缺這個屬性
  ownsMotorcycle: true
};

// 3. UserInfo2 滿足但 UserInfo1 有缺屬性
let maxwellWithPartialInfo3: UnionSet2 = {
  // name: 'Maxwell', <-- 缺這個屬性
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
};

// 空集合一定錯
// let maxwellWithNoInfo: UnionSet2 = {};

/* Intersection */
type IntersectionSet = UserInfo1 & UserInfo2;

// 正確格式，所有屬性必須都出現
let correctInfo: IntersectionSet = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
};

// // 錯誤格式，屬性缺一不可
// let wrongInfo1: IntersectionSet = {
//   // name: 'Maxwell', <-- 少一個 UserInfo1 屬性
//   age: 20,
//   hasPet: false,
//   ownsMotorcycle: true
// };

// let wrongInfo2: IntersectionSet = {
//   name: 'Maxwell',
//   age: 20,
//   hasPet: false,
//   // ownsMotorcycle: true  <-- 少一個 UserInfo2 屬性
// };

/* 原始型別複合 */
type PrimitiveIntersection = number & string;

/* 思考一下：廣義物件與原始型別複合 */
type PrimitiveIntersectObject = number & { hello: string };

/* Type Guard 遇到物件型別的狀況 */
// 例如：想要寫一個簡單的總和函式介面
interface ISummation {
  (...args: number[]): number;
  (arr: number[]): number;
}

let F: ISummation = function (p1: number | number[], ...args: number[]) {
  if (
    // Type Guard 實踐：確保 p1 是數字，arr 是數字型陣列
    typeof p1 === 'number' &&
    args instanceof Array
  ) {
    // ...
    // 將 p1 與 arr 裡面的值加總起來
    return args.reduce((acc, cur) => acc + cur, p1);
  } else if (
    // Type Guard 實踐：確保 p1 是陣列
    p1 instanceof Array
  ) {
    // 因為 p1 被認為是陣列，因此加總起來
    return p1.reduce((acc, cur) => acc + cur, 0);
  }

  // 滿足 `never` 的 Case
  throw new Error(`Something is wrong with your input`);
};

// 使用 (...args: number[]): number 的方式：
F(1, 2, 3, 4, 5);
// 結果是 1 + 2 + 3 + 4 + 5 = 15

// 使用 (arr: number[]): number 的方式：
F([1, 2, 3, 4, 5]);
// 結果也是 1 + 2 + 3 + 4 + 5 = 15


// 驗證：(...args: number): number
console.log(F(1, 2, 3, 4, 5));

// 驗證：(arr: number[]): number
console.log(F([1, 2, 3, 4, 5]));

// 裡面摻雜亂源會被發現錯誤
// F(1, 2, '3', 4, 5);

// 陣列型別也是，裡面摻雜亂源會被發現錯誤
// F([1, 2, '3', 4, 5]);

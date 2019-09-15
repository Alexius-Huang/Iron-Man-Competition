// index.ts

/* ------------------------------- Day 02 ----------------------------------- */
let myName = 'Maxwell';
let age = 20;
let hasPet = false;
let nothing = undefined;
let nothingLiterally = null;

// 我們先定義好我們的變數，但是不要去帶入任何值
let messageToSend;

// 帶入我們想要寫的值
messageToSend = 'Cat is afraid of cucumbers...';
messageToSend = 1011011011100100011111010110;

let absoluteNothing: undefined = undefined;
let literallyAbsoluteNothing: null = null;

// 以下這兩行會出現警告！
// absoluteNothing = 123;
// literallyAbsoluteNothing = "I can't live in this variable now...";

let canBeNullableString: string;

// TDZ 暫時性死區的錯誤！
// let myString = canBeNullableString;

canBeNullableString = 'hello';

// canBeNullableString = undefined;
// canBeNullableString = null;

let absolutelyEitherNullOrString: string | null = null;

absolutelyEitherNullOrString = 'Assigned with string...';
absolutelyEitherNullOrString = null;
absolutelyEitherNullOrString = 'Assigned with string, again...';





/* ------------------------------- Day 03 ----------------------------------- */

let info = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
};

let someone = {
  knows: undefined,
  identity: null
};

// 第一情況：屬性值被錯誤的型別插入干擾
// 先確認屬性是否能代入值，其值對應正確的型別 => PASS！
info.name = 'Martin';
info.age = 24;
info.hasPet = true;

someone.knows = undefined;
someone.identity = null;

// 確認屬性被錯誤型別的值干擾 => 錯誤！
// info.name = false;
// info.age = null;
// info.hasPet = 'Doggie with Mustache!';

// 筆者 OS：讀者知道這個梗嗎？
// someone.knows = 'Nothing';
// someone.identity = 'John Snow';


// 第二情況：整個物件分別被正確或者是錯誤的物件格式複寫
// 格式正確
// info = {
//   name: 'Martin',
//   age: 24,
//   hasPet: true
// };

// 格式錯誤 - 少了一個鍵
// info = {
//   name: 'Martin',
//   age: 24,
// };

// 格式錯誤 - 多了一個鍵
// someone = {
//   knows: undefined,
//   identity: null,
//   loves: 'Ygritte',
// };

// 第三情況：直接對物件新增或刪除值
// 新增屬性 - 出錯
// info.job = 'Engineer';

// 刪除屬性 - 出 Bug，根本沒跟我們說出錯
// 這個 Bug 到現在還沒解決掉：請追蹤 https://github.com/Microsoft/TypeScript/issues/13783
// delete info.age;
// console.log(info);

// 替代性寫法 - 至少有出錯
// info.age = undefined;

/* -------------- 試試看推論以下不同範例 ----------------- */
// 1. 物件包物件
let nestedObject = {
  prop: 'Hello',
  child: {
    prop1: 123,
    prop2: false
  }
};

// 2. Rest-Spread
let obj1 = { hello: 'world' };
let obj2 = { ...obj1, goodbye: 'Cruel World' };

// 3. Object.assign (超進階範例)
// let obj3 = { hello: 'Another world' };
// let obj4 = Object.assign(obj3, { goodbye: 'Another cruel world' });
// 提示：想要讓這個範例動的話，可以先把 tsconfig.json 裡的 lib 選項啟動
//      並且填入 ["es2015", "dom"]

/* ------------------------------------------------------ */

let justAnObject: object = { hello: 'World' };

// 我們認為可能正確的情況 => 錯誤
// justAnObject.hello = 'Max';

// 測試情況一：覆寫錯誤型別的值 => 錯誤
// justAnObject.hello = null;

// 測試情況二：完全覆寫錯誤格式 => PASS!
justAnObject = { goodbye: 'Cruel World' };

// 測試情況三：無緣無故亂加 Key => 錯誤
// justAnObject.newProp = 123;

// 測試：完全以其他的物件覆寫
// 以原始型態覆寫（預期會出錯，畢竟不是物件）=> 錯誤
// justAnObject = 123;

// 以陣列覆寫 => PASS!
justAnObject = [1, '2', 3, '4', 5, true, { hello: 'world '}];

// 以函數來覆寫 => PASS!
justAnObject = function () { console.log('Oh my goddddddd!?!?'); }

// 以各種物件表示來覆寫 => PASS!
justAnObject = new Object();

// 以看起來是原始型態的東西但是用創建物件的方式覆寫 => PASS!
justAnObject = new String("Who am I!? I'm a String or Object!?");
justAnObject = new Number(42);

// 直接用類別名稱複寫 => PASS!
justAnObject = Object;
justAnObject = Array;

// 定義一系列隸屬 JS 的物件讓 TS 來推論
let arrayObject = [1, 2, 3, 4, 5];
let functionObject = function() { console.log('Again!?'); };
let objectObject = new Object();
let primitiveObject = new String('What does the fox say? Ding!Ding!Ding!Ding!Ding!~');
let classItself = Object;

// 根據物件完整性理論推測：以下應該要被 TS 警告！
// arrayObject.customProp = 123;
// functionObject.customProp = 456;
// objectObject.customProp = 'Huh?';
// primitiveObject.customProp = 'Bird says: Chuchuchuchuchuchuchuchuchuchu!~';
// classItself.customProp = 3.1415926;

// 根據物件完整性理論推測：以下應該不會怎麼樣，只是被我們（惡意）竄改
// 注意喔！值的型別要跟對應到該屬性接受的型別。這裡筆者還沒教到函式與陣列型別，不過暫且先跟
// 讀者說明：
//
// 函式的型別組成包含 input 對應 output，姑且先舉個簡單的例子。
//
// Array.prototype.pop 方法沒有任何 input，但 output 可能是任意值，但由於陣列的特性，
// 我們的陣列在 `arrayObject` 裡面全部都是數字，因此型別為 `number[]`，於是乎 pop 方法
// 的函式型別理應來說是 input 為空，output 為 number：() => number
// 
// 因此我們如果將 pop 複寫為以下方式，則不會出現警告喔：
arrayObject.pop = function() { return 123; };

// 如果你改錯成其他型別一樣，譬如在這個案例裡 Return 為空或者是非 `number` 型別，
// 則會被 TS 嫌棄，以下這兩種就是：
// arrayObject.pop = function() { console.log('Returns nothing!'); };
// arrayObject.pop = function() { return 'string'; };





/* ------------------------------- Day 04 ----------------------------------- */

let aSimpleFunction = function() { console.log('Hi!'); };

// let addition = function (num1, num2) {
//   return num1 + num2;
// };

let addition = function (param1: number, param2: number) {
  return param1 + param2;
};

// let shouldBeString: string = addition(123, 456); // => 出錯！

const aJSONString = '{"Hello": "World", "luckyNumber": 14}';

// TS 不會鳥你的狀況
let parsedJSON = JSON.parse(aJSONString);

// 接受 TS 型別系統的擁抱
let parsedJSON1 = JSON.parse(aJSONString) as { hello: string, luckyNumber: number };
let parsedJSON2 = <{ hello: string, luckyNumber: number }>JSON.parse(aJSONString);
let parsedJSON3: { hello: string, luckyNumber: number } = JSON.parse(aJSONString);

// 原本的 addition 型別為 (number, number) => number
// 因為已經被定義在上方，這邊就不多寫了
// let addition = function (param1: number, param2: number) {
//   return param1 + param2;
// };

// 覆寫 addition：其型別為 (number, number) => number
addition = function (param1: number, param2: number) {
  return param2 + param1; // <- 交換位置而已...
}

// 錯誤地覆寫 addition: 參數型別錯誤！其型別為 (string, string) => string -> 會被 TS 警告！
// addition = function (param1: string, param2: string) {
//   return param1 + param2;
// }

// 錯誤地覆寫 addition: 參數型別錯誤！其型別為 (number, number) => void -> 會被 TS 警告！
// addition = function (param1: number, param2: number) {
//   param1 + param2;
// }

// 函式主動回傳 undefined
let doesItWork1 = function doesItWork1() {
  return undefined;
}

// 函式輸出型別註記為 undefined，也回傳 undefined
let doesItWork2 = function doesItWork2(): undefined {
  return undefined;
}

// 函式輸出型別註記為 undefined，但不回傳任何東西 => 只有這個會出錯
// let doesItWork3 = function doesItWork3(): undefined {
  // Empty and returns nothing!
// }

// 函式輸出型別註記為 void，但回傳 undefined
let doesItWork4 = function doesItWork4(): void {
  return undefined;
}






/* ------------------------------- Day 05 ----------------------------------- */

// 全部都是數字
let numbers = [1, 2, 3, 4, 5];

// 全部都是字串
let strings = ['hi', 'how are you', 'goodbye'];

// 對陣列裡任意值覆寫
numbers[1] = 123;   // <- PASS！
// numbers[3] = '123'; // <- 嗶嗶！TS 關心您！

// 對陣列使用方法 TS 也會幫你檢測型別耶！酷的是還會隨機變通哦！
numbers.push(456);   // <- PASS！
// numbers.push('456'); // <- 嗶嗶！TS 再度關心您！

numbers.concat([789, 987]);     // <- PASS！
// numbers.concat(['789', '987']); // <- 嗶嗶！TS 知道你正在玩它！

// 對陣列全部覆寫
//（依據廣義物件完整性第一條，只要覆蓋的值型別不變，你愛怎麼蓋就怎麼蓋，用愛蓋吧！）
numbers = [666, 888, 999];               // <- PASS！
// numbers = ['三位一體！', '您被聖靈附體！'];  // <- 嗶嗶！TS 真的很想開你罰單！

// 數字和字串混合
let numbersAndStrings = [1, '2', 42, 666, "Devils don't actually like to wear Prada!"];


// 長得一模一樣格式的物件
let objectsArray1 = [
  { message: 'Hello' },
  { message: 'Hi' },
  { message: 'Goodbye' }
];

// 某個物件就是故意給你基因突變
// let objectsArray2: ({ message: string, revolt?: boolean })[] = [
//   { message: 'Hello' },
//   { message: 'Hi', revolt: true },
//   { message: 'Goodbye' }
// ];

let objectsArray2: ({ message: string, revolt?: boolean })[] = [
  { message: 'Hello' },
  { message: 'Hi', revolt: undefined },
  { message: 'Goodbye', revolt: true }
];

// 沒辦法，基因突變的方法實在太多種了，所以也不管，將就測一測吧
let objectsArray3 = [
  { message: 'Hello' },
  { message: 10100101110110 },
  { message: 'Goodbye' }
];

let functionsArray4 = [
  function addition(num1: number, num2: number) { return num1 + num2 },
  function subtraction(num1: number, num2: number) { return num1 - num2 },
  function multiplication(num1: number, num2: number) { return num1 * num2 },
  function division(num1: number, num2: number) { return num1 / num2 }
];

let arraysArray = [
  [1, 2],
  ['Hello', 'World', 'AABAA，叫叫CBA，到底是ABC還是CBA，筆者忘記了'],
  [true, false, true, true, false],
];

// 超變態陷阱題 （Ooooooooowwww~~ 好變態啊~~~）
let miscellaneousArraysArray = [
  [1, 2, 3],
  ['Hello', 'World'],
  [true, false, 123, null],
  ['String', undefined],
];

let emptyArray = [];

let canBeEitherNullOrNumbers: (number | null)[] = [1, 2, 4];
canBeEitherNullOrNumbers.splice(2, 0, null); // <- TS 准許你通過







/* ------------------------------- Day 06 ----------------------------------- */

// 因為前面已經被定義過 numbers 了，所以這邊必須得註解掉！
// let numbers = [1, 2, 3, 4, 5];
let mappedNumbers = numbers.map(num => num * 2);

// 不熟悉 ES6 Arrow Function 語法，可以將它的寫法等化為：
// let mappedNumbers = numbers.map(function(num) { return num * 2; });
//
// 不過呢，Arrow Functions 和普通的 Function 還是有差，這系列由於不是在講述 ES6 的
// 特點，因此不清楚差異的讀者，請積極的上網查查吧！

// type Vehicle = [string, string, string, Date];

let BMWMotor: Vehicle = ['BMW', 'motorcycle', 'silver', new Date(2019, 2, 17)];
let JaguarOffRoad = <Vehicle>['Jaguar', 'off-road', 'royal-blue', new Date(2019, 1, 9)];
let ToyotaRV = ['Toyota', 'recreational', 'ivory-white', new Date(2019, 3, 15)] as Vehicle;

type Vehicle = [string, string, string, Date];

// 少一個元素：錯誤！
// let v1: Vehicle = ['Honda', 'motorcycle', 'red'];

// 多一個元素：錯誤！
// let v2: Vehicle = ['Gogoro', 'scooter', 'white', new Date(2019, 4, 27), 'electrical'];

// 單純型別沒有符合：錯誤！
// let v3: Vehicle = ['Tesla', 'electric', 'sapphire', '2019-08-14'];

// 型別順序錯置：錯誤！
// let v4: Vehicle = ['Prosche', 'race', new Date(2019, 7, 21), 'carbon-black'];

// 完全對前三個同為 `string` 型別的值對調，儘管意義上錯誤，但 TS 還是不鳥你 ~
let WTFVehicle: Vehicle = ['taxi', 'yellow', 'Toyota', new Date(2019, 6, 12)];





/* ------------------------------- Day 07 ----------------------------------- */

enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
};

// 語法錯誤！
// enum WeekDay = { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday };

let weekDayOfBirthday = WeekDay.Monday;

let TGIF: WeekDay = WeekDay.Friday;
console.log(TGIF);
// 結果為 5

let valueOfTGIF = WeekDay[TGIF];
console.log(valueOfTGIF);
// 結果為 Friday






/* ------------------------------- Day 08 ----------------------------------- */

let addOp = function (n1: number, n2: number) {
  return n1 + n2;
}

let subtractOp = function (n1: number, n2: number) {
  return n1 - n2;
}

let multiplyOp = function (n1: number, n2: number) {
  return n1 * n2;
}

let divideOp = function(n1: number, n2: number) {
  return n1 / n2;
}

// type MathOperator = (n1: number, n2: number) => number;

// 正確結果！
let powerOp: MathOperator = function (n1: number, n2: number) {
  return n1 ** n2;
};

// 錯誤：型別錯誤！
// let wrongPowerOp1: MathOperator = function (n1: string, n2: string) {
//   return n1 ** n2;
// };

// 錯誤：函式型別之回傳型別錯誤！
// let wrongPowerOp2: MathOperator = function (n1: number, n2: number) {
//   return (n1 ** n2).toString();
// };

type MathOperator = (n1: number, n2: number) => number;

// 變數被型別化名註記過後，Implicit `any` 被化解
let powerOpWithNoParamsAnnotation: MathOperator = function (n1, n2) {
  return n1 ** n2;
};

// 會出現錯誤！
// powerOpWithNoParamsAnnotation(
//   '123',
//   '456'
// );


type PersonInfo = {
  name: string,
  age: number,
  hasPet: boolean
};

let infoAboutMaxwell: PersonInfo = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
};

// 隨便新增屬性會出錯！
// infoAboutMaxwell.newInfo = 'Graduated from NTUST';

// 更改屬性值，型別對就可以接受！
infoAboutMaxwell.hasPet = true;

// 更改屬性值，型別錯就GG！
// infoAboutMaxwell.hasPet = 'Doggie & Kittie';

// 全面覆寫，格式正確就放心！
infoAboutMaxwell = {
  name: 'Alexius',
  age: 18,
  hasPet: true,
};

// 全面覆寫，格式錯誤就傷心！
// infoAboutMaxwell = {
//   firstName: 'Maxwell',
//   graduated: true,
//   age: 20,
//   hasPet: false,
// };


function printInfo(info: PersonInfo) {
  console.log(`Name: ${info.name}`);
  console.log(`Age: ${info.age}`);
  console.log(`Has Pet? ${info.hasPet}`);
}

// 物件的形式沒有被積極註記為 PersonalInfo，直接
// 將值暴力帶入函式作為參數 => 驗證錯誤！
// printInfo({
//   name: 'Martin',
//   age: 28,
//   hasPet: true,

//   hello: 'world',
//   nothingSpecial: null,
// });

// 物件的形式存入變數，其中該變數沒有被積極註記為
// PersonInfo，該變數卻被代入函式作為參數 => 竟然通過！？
let infoAboutMartin = {
  name: 'Martin',
  age: 28,
  hasPet: true,

  hello: 'world',
  nothingSpecial: null,
};

printInfo(infoAboutMartin);






/* ------------------------------- Day 09 ----------------------------------- */

enum Gender { Male, Female, Other };

type TestAccountInfo = {
  account: string,
  password: string,
  nickname: string | undefined,
  birth: Date | undefined,
  gender: Gender | undefined,
  subscribed: boolean
};

// 依然出錯！
// let accountMaxwell: TestAccountInfo = {
//   account: 'nordic.wyvern',
//   password: '<hashed-password>',
//   subscribed: false
// };

type AccountInfo = {
  account: string,
  password: string,
  nickname?: string,
  birth?: Date,
  gender?: Gender,
  subscribed: boolean
};

// let accountMaxwell: AccountInfo = {
//   account: 'nordic.wyvern',
//   password: '<hashed-password>',
//   subscribed: false
// };

let additionThreeAsDefault = function (num1: number, num2?: number) {
  if (num2) {
    return num1 + num2;
  }
  return num1 + 3;
}

type VehicleInfoWithOptionalElements = [string, string, string?, Date?];







/* ------------------------------- Day 10 ----------------------------------- */

let executesForever = function forever() {
  while(true) {
    /* Stuck in here forever... */
  }
};

const randomNumber = Math.random() * 10;

let probablyExecutesForever = function (num: number) {
  while (num > 5) {
    /* Probably stuck in here forever... */
  }
};

// Maybe 'never' or 'void' case
probablyExecutesForever(randomNumber);

// Definite 'never' case
probablyExecutesForever(6);

// Definite 'void' case
probablyExecutesForever(4);

// let probablyThrowsError = function (num: number): number | never {
//   if (num <= 0) {
//     throw new Error('Not a positve number, go to hell!');
//   }
//   return num;
// };

type EitherNumberOrNever = number | never;
type MustBeNever = number & never;


let probablyThrowsError = function (num: number) {
  if (num <= 0) {
    throw new Error('Not a positve number, go to hell!');
  }
  return num;
};

let acceptsNever: number = probablyThrowsError(-5);

// let mustThrowError = function () {
//   throw new Error('Throw new error!');
// }

let mustThrowError = function () {
  throw new Error('Throw new error!');
}

let mustAcceptsNever: never = mustThrowError();

let canAlsoAcceptNever: number = mustThrowError();

let wontThrowError = function () { return 42; };

// 會出現錯誤！
// mustAcceptsNever = wontThrowError();

// 若是被註記為 never 型態，則函式一定要符合不能有結束執行的結果
// function possibleNotToThrowError(): never {
//   const possibility = Math.random();
//   if (possibility > 0.5) {
//     throw new Error('Error Thrown');
//   }
// }

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

let canBeEitherNullOrNumbers: (number | null)[] = [1, 2, 4]
canBeEitherNullOrNumbers.splice(2, 0, null);

/* 使用 ES6 Map */
let typedMap = new Map<number, string>();

typedMap.set(1, 'Hello world');

typedMap.get(1);

typedMap.has(1);

/* 使用 ES6 Set */
let typedSet = new Set<number>();

typedSet.add(123);

typedSet.values();

typedSet.clear();

let unspecifiedTypeMap1 = new Map();
let unspecifiedTypeSet1 = new Set();

let unspecifiedTypeMap2 = new Map([[123, 'Hello world']]);
let unspecifiedTypeSet2 = new Set([1, 2, 3, 4, 5]);

/* ES6 Promise 與泛型的機制 */
// let aPromise =
//   new Promise<string>((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 3000);
//   });

// const unspecifiedTypePromise =
//   new Promise((resolve, reject) => {
//     resolve(true); // Resolve 一個 boolean 型別
//   });

// const resolvedPromise = Promise.resolve(true);
// const rejectedPromise = Promise.reject(false);

/* 使用 Promise.all */
// const promiseAll = Promise.all([
//   Promise.resolve('123'),
//   new Promise<number>((resolve) => resolve(123)),
//   new Promise<boolean>((resolve) => resolve(true)),
//   Promise.reject(false),
// ]);

/* 使用 Promise.race */
// function delay<T>(milliseconds: number, value: T): Promise<T> {
//   return new Promise<T>((resolve) => {
//     setTimeout(function() {
//       resolve(value);
//     }, milliseconds);
//   });
// }

// const promiseRace = Promise.race([
//   delay<string>(3000, 'Hello World'),
//   delay<number>(1000, 123),
//   delay<boolean>(2000, false),
// ]);

// 可以使用 Promise.race 來進行 request 的比賽
// const mightTimeout = Promise.race(
//   arbitraryRequest,
//   rejectDelay<string>(3000, '408 Timeout after 3 seconds'),
// );

/* 回呼函式地獄 */
// 假設我們有一個很陽春的送請求的函式
function sendRequest(
  success: (result: string) => void,
  error: (message: string) => void
) {
  if (Math.random() > .9) {
    // 送請求可能出現錯誤
    error('500 Server Error');
    return;
  }

  const time = Math.random() * 3000;
  setTimeout(() => {
    success('200 Success');
  }, time);
}

// 我們想要達成，依序送出三種不同請求
// 且必須要等前一個請求完成才能繼續下去

// 設定三個計時器
// console.time('1st Request Received');
// console.time('2nd Request Received');
// console.time('3rd Request Received');

// 送出第一個請求
// sendRequest(
//   function (result) {
//     // 第一次請求送完時的時間
//     console.timeEnd('1st Request Received');
//     console.log(`1st attempt ${result}`);

//     // 等第一個請求送完再來送第二個請求
//     sendRequest(
//       function (result) {
//         // 第二次請求送完時的時間 
//         console.timeEnd('2nd Request Received');
//         console.log(`2nd attempt ${result}`);
    
//         // 等第二個請求送完再來送第三個請求
//         sendRequest(
//           function (result) {
//             // 第三次請求送完時的時間
//             console.timeEnd('3rd Request Received');
//             console.log(`3rd attempt ${result}`);        
//           },
//           function (message) {
//             console.log(`Error occured in 3rd attempt ${message}`);
//           }
//         );
//       },
//       function (message) {
//         console.log(`Error occured in 2nd attempt ${message}`);
//       }
//     );
//   },
//   function (message) {
//     console.log(`Error occured in 1st attempt ${message}`);
//   }
// );

/* 使用 Promise 物件 */
function sendRequestAsPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (Math.random() > .9) {
      // 送請求可能出現錯誤
      reject('500 Server Error');
      return;
    }
  
    const time = Math.random() * 3000;
    setTimeout(() => {
      resolve('200 Success');
    }, time);
  });
}

// 設定三個計時器
// console.time('1st Request Received');
// console.time('2nd Request Received');
// console.time('3rd Request Received');

// let attempts = 1;

// 第一次送出 request - 為一個 Promise<string>
// sendRequestAsPromise()
//   .then(function (result) {
//     // 第一次請求送完時的時間
//     console.timeEnd('1st Request Received');
//     console.log(`1st attempt ${result}`);
//     attempts++;

//     // 送出第二次請求 - 回傳一個 Promise<string>
//     return sendRequestAsPromise();
//   })
//   .then(function (result) {
//     // 第二次請求送完時的時間
//     console.timeEnd('2nd Request Received');
//     console.log(`2nd attempt ${result}`);
//     attempts++;

//     // 送出第三次請求 - 回傳一個 Promise<string>
//     return sendRequestAsPromise();
//   })
//   .then(function (result) {
//     // 第三次請求送完時的時間
//     console.timeEnd('3rd Request Received');
//     console.log(`3rd attempt ${result}`);
//   })

//   .catch(function (message) {
//     console.log(`Failed in the ${attempts} attempts: ${message}`);
//   });

/* 陽春的 Generator Function */
function * numbersIteratorGenerator() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5; 
}

// 從 Generator Function 建立一個迭代器
const numbersIter = numbersIteratorGenerator();

let iterElement = numbersIter.next();



// 以下連續呼叫 7 次 next 方法
// console.log(numbersIter.next());
// console.log(numbersIter.next());
// console.log(numbersIter.next());
// console.log(numbersIter.next());
// console.log(numbersIter.next());
// console.log(numbersIter.next());
// console.log(numbersIter.next());



function * generatorFunc() {
  console.log('Iterator created...');

  yield 1;
  yield 2;
  yield 3;
}

// 試問呼叫 generatorFunc 時，console.log 會先動？
// console.log('Before create iterator');
// let iterator = generatorFunc();
// console.log('After create iterator');

// 還是等到 next 被呼叫前後才會動作？
// console.log('Before invoke 1st next method');
// console.log(iterator.next());
// console.log('After invoke 1st next method');

/* 費伯內契數列 */
function * fibonacci() {
  let n0 = 1;
  let n1 = 1;

  while (true) {
    yield n0;

    // 使用 ES6 Destructure 語法
    [n0, n1] = [n1, n0 + n1];
  }
}

// 試問以下會出現什麼樣的結果？
// const fibSeries = fibonacci();
// for (let i = 0; i < 10; i ++) {
//   console.log(fibSeries.next());
// }


function * summationGenerator(defaultValue: number = 0) {
  let total = defaultValue;

  while (true) {
    total += yield total;
  }
}

let summationIter = summationGenerator();

// console.log(summationIter.next(5));
// console.log(summationIter.next(7));
// console.log(summationIter.next(11));

function * positiveNumberIterator() {
  let number = 1;

  while (true) {
    yield number;
    number += 1;
  }
}

type PongResponse = {
  data: string | null,
  status: 200 | 500
};

// pingRequest 會回傳 pong 訊息作為 response
function pingRequest(
  num: number,
  errorProbability: number = 0,
): Promise<PongResponse> {
  return new Promise((resolve, reject) => {
    const probability = Math.random();
    if (probability < errorProbability) {
      reject({ data: null, status: 500 });
    }

    const timeout = Math.random() * 3000;

    setTimeout(() => {
      resolve({ data: `Pong: ${num}`, status: 200 });
    }, timeout);
  });
}

/* Promise Chain 表示方式 */
// console.time('1st Pong');
// console.time('2nd Pong');
// console.time('3rd Pong');

// console.log('Promise Chain Representation:');
// pingRequest(1)
//   .then(response => {
//     console.log(response.data);
//     console.timeEnd('1st Pong');
//     return pingRequest(2);
//   })
//   .then(response => {
//     console.log(response.data);
//     console.timeEnd('2nd Pong');
//     return pingRequest(3);
//   })
//   .then(response => {
//     console.log(response.data);
//     console.timeEnd('3rd Pong');
//   })
//   .catch(response => {
//     console.log(`Status: ${response.status}`);
//   });

/* Generator 表示形式 */
// console.log('Generator Representation:');
// console.time('1st Pong');
// console.time('2nd Pong');
// console.time('3rd Pong');

// Generator 表現形式
function * pingsGenerator() {
  try {
    const response1 = yield pingRequest(1);
    console.log(response1.data);
    console.timeEnd('1st Pong');  
  } catch (err1) {
    throw new Error(err1);
  }

  try {
    const response2 = yield pingRequest(2);
    console.log(response2.data);
    console.timeEnd('2nd Pong');  
  } catch (err2) {
    throw new Error(err2);
  }

  try {
    const response3 = yield pingRequest(3);
    console.log(response3.data);
    console.timeEnd('3rd Pong');  
  } catch (err3) {
    throw new Error(err3);
  }
}

// 建立一個 ping-request 的迭代器
// let pingsIter = pingsGenerator();

// 縮寫的命名代表 Pong-Response-Promise 物件
// type PRP = Promise<PongResponse>;

// 第一輪迭代 —— 啟動迭代器
// (pingsIter.next().value as PRP).then(response1 => {
//   console.log('Response 1 received');

//   // 將 response1 傳入 next 並進行第二輪迭代
//   (pingsIter.next(response1).value as PRP).then(response2 => {
//     console.log('Response 2 received');

//     // 將 response2 傳入 next 並進行第二輪迭代
//     (pingsIter.next(response2).value as PRP).then(response3 => {
//       console.log('Response 3 received');

//       // 將 response3 傳入 next 並進行最後一輪迭代
//       pingsIter.next(response3);
//     });
//   });    
// });

/* 宣告專門接收 generator 為參數的函式 */
function runGenerator(gen: () => Generator) {
  const iter = gen();

  // 使用遞迴的技巧去處理 request-response 過程的邏輯
  function recursiveIteration(pushResponse: any) {
    const result = iter.next(pushResponse);
    if (result.done) return;

    (result.value as Promise<any>).then(response => {
      recursiveIteration(response);
    });
  }

  (iter.next().value as Promise<any>).then(response => {
    recursiveIteration(response);
  });
}

//Async-Await 表現形式
async function pingsAsyncFunc() {
  try {
    const response1 = await pingRequest(1);
    console.log(response1.data);
    console.timeEnd('1st Pong');  
  } catch (err1) {
    throw new Error(err1);
  }

  try {
    const response2 = await pingRequest(2);
    console.log(response2.data);
    console.timeEnd('2nd Pong');  
  } catch (err2) {
    throw new Error(err2);
  }

  try {
    const response3 = await pingRequest(3);
    console.log(response3.data);
    console.timeEnd('3rd Pong');  
  } catch (err3) {
    throw new Error(err3);
  }
}

// 執行 Async Function
// console.log('Using Async Function:');
// console.time('1st Pong');
// console.time('2nd Pong');
// console.time('3rd Pong');

// 呼叫 Async Function 想成在處理 Promise 物件
// pingsAsyncFunc()
//   .then(() => { console.log('End Request Process!'); });


// 就算是回傳普通值，它ㄧ樣會使用 Promise 包起來
async function returnSomething() {
  return 42;
}


function delayAfter<T>(
  milliseconds: number, value?: T
): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => { resolve(value); }, milliseconds);
  });
}

async function example1() {
  const message = await delayAfter(3000, 'Hello world!');

  console.log(message);
}

async function example2() {
  const message = await 'Hello world!';

  console.log(message);
}

async function example3() {
  const result = await Promise.race([
    delayAfter(5000, 'Hello world!'),
    delayAfter(3000, 123),
    delayAfter(4000, true),
  ]);

  console.log(result);
}

async function example4() {
  const result = await Promise.all([
    delayAfter(5000, 'Hello world!'),
    delayAfter(3000, 123),
    delayAfter(4000, true),
  ]);

  console.log(result);
}

async function example5_1() {
  return await Promise.resolve(123);
}

async function example5_2() {
  return Promise.resolve(123);
}

async function example6_1() {
  console.log('First async function called.');
  return await delayAfter(1000, 'Hello!');
}

async function example6_2() {
  const result = await example6_1();
  console.log('Second async function called.');
  await delayAfter(2000);
  return result;
}

example6_2().then(console.log);

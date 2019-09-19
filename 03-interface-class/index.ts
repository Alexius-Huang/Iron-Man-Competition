/* ------------------------------- Day 18 ----------------------------------- */

interface PersonInfo {
  name: string;
  age: number;
  hasPet: boolean;
  printInfo(): void;
}

let maxwell: PersonInfo = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  printInfo() {
    console.log(`
      Name: ${this.name}
      Age: ${this.age}
      Owns a pet? ${this.hasPet}
    `);
  },
};

let martin: PersonInfo = {
  name: 'Martin',
  age: 24,
  hasPet: true,
  printInfo() {
    console.log(`
      Name: ${this.name}
      Age: ${this.age}
      Owns a pet? ${this.hasPet}
    `);
  },
};

let toby: PersonInfo = {
  name: 'Toby',
  age: 32,
  hasPet: false,
  printInfo() {
    console.log(`
      Name: ${this.name}
      Age: ${this.age}
      Owns a pet? ${this.hasPet}
    `);
  },
};

// 將介面 PersonInfo 轉換成類別的形式
class CPersonInfo {
  name: string = 'Maxwell';
  age: number = 20;
  hasPet: boolean = false;

  printInfo() {
    console.log(`
      Name: ${this.name}
      Age: ${this.age}
      Owns a pet? ${this.hasPet}
    `);
  }
}

// 從類別建立出物件
let maxwellInfoFromClass = new CPersonInfo();
// console.log(maxwellInfoFromClass);

// maxwellInfoFromClass.printInfo();

class CustomPersonInfo {
  name: string;
  age: number;
  hasPet: boolean;

  // 建構子函式
  constructor(
    name: string = 'Maxwell',
    age: number = 20,
    hasPet: boolean = false
  ) {
    this.name = name;
    this.age = age;
    this.hasPet = hasPet;
  }

  printInfo() {
    console.log(`
      Name: ${this.name}
      Age: ${this.age}
      Owns a pet? ${this.hasPet}
    `);
  }
}

// 1. 不填入參數
let customInfo1 = new CustomPersonInfo();
// console.log(customInfo1);
// customInfo1.printInfo();

// 2. 填入自訂的參數
let customInfo2 = new CustomPersonInfo('Toby', 32, true);
// console.log(customInfo2);
// customInfo2.printInfo();

// 填錯型別
// let wrongCustomInfo = new CustomPersonInfo('Toby', '32', true);

// let correctCustomInfo = new CustomPersonInfo('Leo', 28, false);

// 呼叫不存在的屬性
// correctCustomInfo.inexistedProps;

// 呼叫不存在的方法
// correctCustomInfo.inexistedMethod();







/* ------------------------------- Day 19 ----------------------------------- */

/* 提款機範例 */
// 定義每一個使用陽春的提款機的用戶的資訊
type TUserAccount = {
  account: string;
  password: string;
  money: number;
}

// 定義陽春的提款機介面的帳戶管理系統
interface AccountSystem {
  // 登入系統，必須填入帳戶與密碼
  signIn(account: string, password: string): void;

  // 登出系統
  signOut(): void;
}

// 定義陽春的提款機介面的交易系統
interface TransactionSystem {
  // 存錢錢，裡面填入要存錢的量
  deposit(amount: number): void;

  // 提領錢錢，裡面填入要提錢的量
  withdraw(amount: number): void;
}

// 定義陽春的提款機介面的完整系統
interface ICashMachine extends TransactionSystem, AccountSystem {}

// 實踐 ICashMachine 介面
class CashMachine implements ICashMachine {
  // 假設我們有這些使用者
  private users: TUserAccount[] = [
    { account: 'Maxwell',       password: '123', money: 12345      },
    { account: 'Martin',        password: '456', money: 54321      },
    { account: 'Chairman Guo.', password: '789', money: 1000000000 },
  ];

  private currentUser: TUserAccount | undefined;

  public signIn(account: string, password: string) {
    // 因為 Array.prototype.find 是 ES6 語法，暫時先用 ES5 的方式處理
    for (let i = 0; i < this.users.length; i += 1) {
      const user = this.users[i];
      if (
        user.account  === account  &&
        user.password === password
      ) {
        this.currentUser = user;
        break;
      }
    }

    if (this.currentUser === undefined) {
      throw new Error('User not found!');
    }
  }

  public signOut() {
    // 清除目前的使用者
    this.currentUser = undefined;
  }

  public deposit(amount: number) {
    if (this.currentUser !== undefined) {
      this.currentUser.money += amount;
    } else {
      throw new Error('No user signed in!');
    }
  }

  public withdraw(amount: number) {
    if (this.currentUser !== undefined) {
      this.currentUser.money -= amount;
    } else {
      throw new Error('No user signed in!');
    }
  }
}

function printAccountInfo(input: TUserAccount | undefined) {
  if (input === undefined) {
    console.log('No user found!');
  } else {
    console.log(`
      Current User: ${input.account}
      Money: ${input.money}
    `);
  }
}

// 初始化新的提款機
const machine = new CashMachine();
// console.log('Initialized: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 登入過後
machine.signIn('Maxwell', '123');
// console.log('Signed In: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 提款 5000 過後
machine.withdraw(5000);
// console.log('After Withdrawal: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 登出過後
machine.signOut();
// console.log('Signed Out: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

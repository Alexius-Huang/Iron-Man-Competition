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







/* ------------------------------- Day 20 ----------------------------------- */

/* 陽春的交通票務系統 */
// 使用列舉定義我們的車票種類
enum TransportTicketType {
  Train,    // 坐火車
  MRT,      // 捷運
  Aviation, // 航空
};

// 使用元組：依順序分別代表小時、分鐘與秒鐘
type TimeFormat = [number, number, number];

// 定義名為交通的類別
class TicketSystem {
  constructor(
    private type: TransportTicketType,
    protected startingPoint: string,
    protected destination: string,
    private departureTime: Date,
  ) {}

  // 計算交通的間隔時間
  protected deriveDuration(): TimeFormat {
    // 因為交通方式有三種，所以我們選擇先寫死
    return [1, 0, 0];
  }

  // 計算交通的抵達時間
  private deriveArrivalTime(): Date {
    const { departureTime } = this;

    // 從間隔時間導出總共間隔的微秒數
    const [hours, minutes, seconds] = this.deriveDuration();
    const durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    const durationMilliseconds = durationSeconds * 1000;

    // 導出抵達時間
    const arrivalMilliseconds = departureTime.getTime() + durationMilliseconds;
    return new Date(arrivalMilliseconds);
  }

  // 印出交通票券的詳細內容
  public getTicketInfo() {
    // 根據 Day 07. 提到的列舉的反射性
    // 可以反向由值推回列舉的鍵的名稱！
    const ticketName = TransportTicketType[this.type];
    const arrivalTime = this.deriveArrivalTime();

    console.log(`
      Ticket Type: ${ticketName}
      Station:     ${this.startingPoint} - ${this.destination}
      Departure:   ${this.departureTime}
      Arrival:     ${arrivalTime}
    `);
  }
}

// 我們來開張火車票～
const randomTicket = new TicketSystem(
  // 這是火車票！
  TransportTicketType.Train,

  // 啟程地點
  'Tainan',

  // 抵達終點
  'Kaohsiung',

  // 啟程時間 2019/09/01 早上 9 點 00 分 00 秒
  new Date(2019, 8, 1, 9, 0, 0),
);

// randomTicket.getTicketInfo();


/* 使用類別繼承創造火車票券類別 */
type TrainStation = {
  name: string,
  nextStop: string,
  duration: TimeFormat,
};

class TrainTicket extends TicketSystem {
  // 子類別的建構子函式
  constructor(
    startingPoint: string,
    destination: string,
    departureTime: Date,
  ) {
    // 使用 super 將初始化值傳到父類別的建構子函式裡
    super(
      TransportTicketType.Train,
      startingPoint,
      destination,
      departureTime,
    );
  }

  private stops: string[] = [
    'Pingtung',
    'Kaohsiung',
    'Tainan',
    'Taichung',
    'Hsinchu',
    'Taipei',
  ];

  private stationsDetail: TrainStation[] = [
    { name: 'Pingtung',  nextStop: 'Kaohsiung', duration: [2, 30,  0] },
    { name: 'Kaohsiung', nextStop: 'Tainan',    duration: [1, 45, 30] },
    { name: 'Tainan',    nextStop: 'Taichung',  duration: [3, 20,  0] },
    { name: 'Taichung',  nextStop: 'Hsinchu',   duration: [2, 30, 30] },
    { name: 'Hsinchu',   nextStop: 'Taipei',    duration: [1, 30, 30] },
  ];

  private isStopExist(stop: string): boolean {
    for (let i = 0; i < this.stops.length; i += 1) {
      const existedStop = this.stops[i];
      if (existedStop === stop) return true;
    }
  
    return false;
  }

  protected deriveDuration(): TimeFormat {
    // 我們必須取得啟程站與抵達站
    const { startingPoint, destination } = this;

    // 先確保車站的站點是合理的
    if (
      this.isStopExist(startingPoint) &&
      this.isStopExist(destination)
    ) {
      let time: TimeFormat = [0, 0, 0];
      let stopFound = false;
  
      /* 1. 開始進行站點間的運算 */
      for (let i = 0; i < this.stationsDetail.length; i += 1) {
        const detail = this.stationsDetail[i];
  
        // 啟程站還未找到但是名稱對應到時開始累計交通時間
        if (!stopFound && detail.name === startingPoint) {
          stopFound = true;
          time[0] += detail.duration[0];
          time[1] += detail.duration[1];
          time[2] += detail.duration[2];
        }
  
        // 早已找到啟程站
        else if (stopFound) {
          // 繼續累計交通時間
          time[0] += detail.duration[0];
          time[1] += detail.duration[1];
          time[2] += detail.duration[2];
  
          // 然而，若下一站為終點站則跳出迴圈不再累計
          if (detail.nextStop === destination) break;
        }
      }
  
      /* 2. 將時間轉換成合理的格式 */
      // 每六十秒轉一分鐘
      let minutes = Math.floor(time[2] / 60);
      time[1] += minutes;
      time[2] -= minutes * 60;
  
      // 每六十分鐘轉一小時
      let hours = Math.floor(time[1] / 60);
      time[0] += hours;
      time[1] -= hours * 60;
  
      // 回傳時間的格式 TimeFormat
      return time;
    }
  
    // `never` 型別的例外，參見 Day 10.
    throw new Error("Wrong stop name! Please check again!");
  }
}

const trainTicket = new TrainTicket(
  // 啟程自台南
  'Tainan',

  // 終點到新竹
  'Hsinchu',

  // 發車時間為 2019/09/01 早上 9:00
  new Date(2019, 8, 1, 9, 0, 0)
);

// trainTicket.getTicketInfo();

/* 使用 super 的注意事項 */
// 父類別擁有三個成員變數
class TestParentClass {
  constructor(
    public p1: number,
    public p2: string,
    public p3: boolean,
  ) {}
}

// 子類別繼承父類別，並且呼叫 super 進行初始化物件的動作
class TestChildClass1 extends TestParentClass {
  constructor(
    p1Child: number,
    p2Child: string,
    p3Child: boolean
  ) {
    super(p1Child, p2Child, p3Child);
  }
}

const objFromChildClass1 = new TestChildClass1(123, 'Hello', true);
// console.log(objFromChildClass1);

// 子類別繼承父類別，但是沒有實踐建構子函式
class TestChildClass2 extends TestParentClass {}

// 請仔細查看這一行出現的錯誤訊息：
// const objFromChildClass2 = new TestChildClass2();








/* ------------------------------- Day 21 ----------------------------------- */

/* 幾何圓形類別 */
class CircleGeometry {
  private PI: number = 3.14;

  // 初始化時需要的參數為半徑 radius
  constructor(public radius: number) {}

  // 計算圓形的面積
  public area(): number {
    return this.PI * (this.radius ** 2);
  }

  // 計算圓形的周長
  public circumference(): number {
    return 2 * this.PI * this.radius;
  }
}

// 初始化半徑為單位 2 的圓
const myCircle = new CircleGeometry(2);

// 計算圓的面積
// console.log(myCircle.area());

// 計算圓的周長
// console.log(myCircle.circumference());

/* Math 本身就是提供一系列的屬性與方法 */
// 圓周率 PI
Math.PI;

// 隨機產生介於 0 ~ 1 之間的值
Math.random();

// 計算三角函數
Math.sin(Math.PI / 2);

// 計算次方
Math.pow(2, 4);

/* 靜態成員版本的幾何圓形類別 */
class StaticCircleGeometry {
  private static PI: number = 3.14;

  // 計算圓形的面積
  static area(radius: number): number {
    return StaticCircleGeometry.PI * (radius ** 2);
  }

  // 計算圓形的周長
  static circumference(radius: number): number {
    return 2 * StaticCircleGeometry.PI * radius;
  }

  // 提供使用者一個管道來取得 PI 的值
  static getValueOfPI(): number {
    return StaticCircleGeometry.PI;
  }
}

// 接觸 `private` 的靜態成員會被警告！
StaticCircleGeometry.PI;

// 但是可以藉由公用靜態方法取得資訊
StaticCircleGeometry.getValueOfPI();

/* 使用 CircleGeometry */
// 初始化半徑為單位 2 的圓
const circleObj = new CircleGeometry(2);

// 計算圓的面積
const areaFromObj = circleObj.area();

// 計算圓的周長
const circumferenceFromObj = circleObj.circumference();

/* 使用 StaticCircleGeometry */
// 計算半徑為 2 的圓之面積
const areaFromStaticMethod = StaticCircleGeometry.area(2);

// 計算半徑為 2 的圓之周長
const circumferenceFromStaticMethod = StaticCircleGeometry.circumference(2);

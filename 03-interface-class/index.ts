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
// StaticCircleGeometry.PI;

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








/* ------------------------------- Day 22 ----------------------------------- */

class CircleGeometryV2 {
  // 使用 readonly 在成員變數上
  public readonly PI: number = 3.14;

  // 使用 readonly 在類別靜態屬性上
  static readonly staticPI: number = 3.14;

  // 略...

  // 初始化時需要的參數為半徑 radius
  constructor(public radius: number) {}

  // 使用取值方法 Getter Method
  // 裡面不能有任何參數，否則會被記警告！
  get area(/* 禁止放任意參數 */) {
    // 沒有回傳任何值也是錯誤的行為！
    return this.PI * (this.radius ** 2);
  }

  // 使用存值方法 Setter Method
  // 裡面僅僅只能有一個參數，否則會被記警告！
  set area(value: number /* , anotherValue: number */) {
    // 半徑是面積先除以圓周率 PI 之後再開根號
    // 開根號等效於取 0.5 次方的概念！
    this.radius = (value / this.PI) ** 0.5;
  }

  // 計算圓形的周長
  public circumference(): number {
    return 2 * this.PI * this.radius;
  }
}

// 初始化半徑為 2 的圓形
const randomCircle = new CircleGeometryV2(2);

// 取得圓形的面積
// console.log(randomCircle.area);

// 改變半徑的值
randomCircle.radius = 3;

// 再次取得圓形面積
// console.log(randomCircle.area);


// 初始化半徑為 2 的圓形
const anotherRandomCircle = new CircleGeometryV2(2);

// 取得圓形的半徑，應該等於 2
// console.log(anotherRandomCircle.radius);

// 取得圓形的面積
// console.log(anotherRandomCircle.area);

// 更改圓形的面積應該會連動到 radius 半徑的值
// 這一次我們使用半徑為 5 的圓形面積作為指派值
anotherRandomCircle.area = 3.14 * (5 ** 2);

// 半徑應該約等於 5
// console.log(anotherRandomCircle.radius);

let areaOfCircle = anotherRandomCircle.area;

/* readonly 模式 */
// 可以被讀取
anotherRandomCircle.PI;

// 但是不能被覆寫！
// anotherRandomCircle.PI = 3.1415926;

// 類別的靜態屬性被標註 readonly 也無一例外
CircleGeometryV2.staticPI;

// 因為是 readonly，所以會被 TypeScript 提醒喔
// CircleGeometryV2.staticPI = 3.1415926;








/* ------------------------------- Day 23 ----------------------------------- */

/* 擁有私有建構子的類別範例 */
class ConstructIsForbidden {
  private constructor(/* 參數 */) {
    /* 初始化物件的成員 */
  }
}

// 會被 TypeScript 叫！
// let forbiddenObject = new ConstructIsForbidden();

/* 簡單的單例模式示範 Singleton Pattern */
class SingletonPerson {
  // 該私有建構子裡面，具有某人的基本資料
  // 其中，儘管裡面的資料是開放的，但都是唯讀的狀態
  private constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean,
  ) {}

  // 定義一個私有靜態屬性，存放此類別建構的物件資料
  private static Instance: SingletonPerson =
    new SingletonPerson('Maxwell', 20, false);

  // 定義一個公用靜態方法，負責回傳存放在此類別唯一的物件資料
  static getInstance(): SingletonPerson { return this.Instance; }
}


// 取得單例模式的類別下建構出來的唯一物件
const uniquePerson = SingletonPerson.getInstance();

// console.log(uniquePerson);
// console.log(uniquePerson.name);
// console.log(uniquePerson.age);
// console.log(uniquePerson.hasPet);


/* 懶漢模式 */
class LazySingletonPerson {
  private constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean,
  ) {}

  // Day 2. 就提到過的 Nullable Type
  private static Instance: LazySingletonPerson | null = null;

  static getInstance(): LazySingletonPerson {
    // 若是第一次呼叫，Instance 必為 null，因此進行單子的初始化
    if (this.Instance === null) {
      this.Instance = new LazySingletonPerson('Maxwell', 20, false);
    }

    return this.Instance;
  }
}


class LazySingletonC {
  private constructor(/* 成員變數或參數 */) {
    /* 物件初始化成員的過程 */
  }

  // 將 Instance 一開始的值設定為 null
  private static Instance: LazySingletonC | null = null;

  // 如果是第一次呼叫 getInstance 才會建構物件
  static getInstance(): LazySingletonC {
    if (this.Instance === null) {
      this.Instance = new LazySingletonC(/* 參數 */);
    }

    return this.Instance;
  }
}









/* ------------------------------- Day 24 ----------------------------------- */

enum Color { White, Black, Brown, Grey, Rainbow };

class Horse {
  constructor (
    public name: string,
    public color: Color,
    public readonly type: string,
    private noise: string = 'MeeeeeeeEeeééeéeée~',
  ) {}

  public makeNoise() {
    console.log(this.noise);
  }

  public info() {
    console.log(this.infoText);
  }

  // 子類別可以覆寫 infoText 成員方法
  protected infoText(): string {
    return `It is ${this.name} the ${Color[this.color]} ${this.type}.`;
  }
}

/* 繼承類別範例 */
class Unicorn extends Horse {
  constructor(name: string) {
    super(
      name,
      Color.Rainbow,
      'Mystical Unicorn',

      // 獨角獸的叫聲到底是什麼，筆者也不清楚
      'Nheeeeeeheeehehé~hehé~hehé~hehé~~~',
    );
  }

  protected infoText(): string {
    return `It's a mystical unicorn! Its name is ${this.name}!`;
  }

  // 獨角獸會吐彩虹色的嘔吐物
  public puke(): void {
    console.log('Puking rainbow vomit!');
  }
}

// 利用生物科技製造出一隻名為 Martin 的黑色小馬
let aRandomHorsie = new Horse('Martin', Color.Black, 'Pony');

// 對馬原本就有的屬性指派錯誤型別 => TS 覺得你錯了！
// aRandomHorsie.color = 'Red';

// 對馬植入新的屬性 => 難道你沒聽到動保團體的抗議嗎？
// aRandomHorsie.isNatural = false;

// 直接覆寫錯誤的值 => 我的馬到哪裡去？
// aRandomHorsie = null;

// 要覆寫就要用同為 Horse 型別的值進行完整覆寫
// 另外：stallion 是 “騭”，馬的品種之一
aRandomHorsie = new Horse('Toby', Color.Brown, 'Stallion');

/* 類別得型別註記法 */
// 1. 用常見的型別註記法
let certainlyAHorsie: Horse =
  new Horse('Leo', Color.Black, 'Bronco');

// 2. 用顯性型別註記法
let certainlyAnotherHorsie =
  <Horse>(new Horse('Wendy', Color.White, 'Mustang'));

// 3. 用 `as` 型別註記法
let certainlyTheOtherHorsie =
  new Horse('Alexius', Color.Grey, 'Foal') as Horse;

/* 繼承後的子類別之推論機制 */
// 普通的 Unicorn
let aRandomUnicorn = new Unicorn('Maxwell');

// 註記為 Horse，不過被指派為 Unicorn
let anotherHorsie: Horse = new Unicorn('Maximilian');

// 嘔吐吧！獨角獸！
// aRandomUnicorn.puke();

// 你也跟著嘔吐吧！ => 它嘔吐不了...
// anotherHorsie.puke();

// 子類別看似代表父類別物件
// let shouldBeUnicorn: Unicorn =
//   new Horse(
//     'Maxime',
//     Color.Rainbow,
//     'Mystical Unicorn',
//     'Nyeeeeeeee~~'
//   );


// 宣告 Stallion 為 Horse 子類別，並且沒有多宣告更多成員
class Stallion extends Horse {
  constructor(name: string) {
    super(
      name,
      Color.Brown,
      'Stallion',
    );
  }
}

// 註記為 Stallion 型別的變數卻指派 Horse
let shouldBeStallion: Stallion =
  new Horse(
    'Maxwell',
    Color.Brown,
    'Stallion',
  );

// 定義兩種相似的類別
class C1 {
  constructor(public prop: string) {}

  public publicMethod(): string {
    return this.prop;
  }
}

class C2 {
  constructor(public prop: string) {}

  public publicMethod(): string {
    return this.prop;
  }
}

let someObject: C1 = new C2('Hello');

// 定義兩種相似的類別，但是有 private 模式
class AnotherC1 {
  constructor(
    public prop: string,
    private privateProp: number,
  ) {}

  public publicMethod(): number {
    return this.privateMethod();
  }

  private privateMethod(): number {
    return this.privateProp;
  }
}

class AnotherC2 {
  constructor(
    public prop: string,
    private privateProp: number,
  ) {}

  public publicMethod(): number {
    return this.privateMethod();
  }

  private privateMethod(): number {
    return this.privateProp;
  }
}

// let anotherObject: AnotherC1 = new AnotherC2('Hello', 42);


type TA = { hello: string };
type TB = { hello: string };

interface IA {
  hello: string;
}

interface IB {
  hello: string;
}

function logTypeA(obj: TA) { console.log(obj); };

// 事實上，只要結構ㄧ樣，管你是 Type 還是 Interface
// 只要格式ㄧ樣都通過，就算參數很明確只能指定 TA 型別
// logTypeA(<TA>{ hello: 'World' });
// logTypeA(<TB>{ hello: 'World' });
// logTypeA(<IA>{ hello: 'World' });
// logTypeA(<IB>{ hello: 'World' });







/* ------------------------------- Day 25 ----------------------------------- */

// 定義角色的介面
enum Role {
  Swordsman    = 'Swordsman',     // 劍士
  Warlock      = 'Warlock',       // 術士
  Highwayman   = 'Highwayman',    // 攔路強盜
  BountyHunter = 'Bounty Hunter', // 賞金獵人
  Monster      = 'Monster',       // 怪物
};

// 角色基本資料（剛剛被宣告過）
interface ICharacter {
  name: string;
  role: Role;
  attack(target: ICharacter): void;
}

// 另一個介面，代表角色的各種屬性或能力值
interface IStats {
  health: number;       // 生命值
  mana: number;         // 魔力值
  strength: number;     // 力量
  defense: number;      // 防禦
}

// 將遊戲角色與 ICharacter 介面進行綁定 
class Character implements ICharacter, IStats {
  public health: number = 50;
  public mana: number = 10;
  public strength: number = 10;
  public defense: number = 5;

  constructor(
    public name: string,
    public role: Role,
  ) {}

  public attack(target: ICharacter) {
    let verb: string;

    // 根據不同的職業，進行不同的攻擊方式
    switch (this.role) {
      case Role.Swordsman:    verb = 'attacking';   break;
      case Role.Warlock:      verb = 'cursing';     break;
      case Role.Highwayman:   verb = 'ambushing';   break;
      case Role.BountyHunter: verb = 'threatening'; break;
      default: throw new Error(`${this.role} didn't exist!`);
    }

    console.log(`${this.name} is ${verb} ${target.name}!`);
  }
}

// 分別建立兩種不同的角色
// const character1 = new Character('Maxwell', Role.Swordsman);
// const character2 = new Character('Martin', Role.Highwayman);

// 來互相傷害啊！
// character1.attack(character2);
// character2.attack(character1);


// 建立簡單的角色
let character = new Character('Maxwell', Role.Swordsman);

// 從類別建立出來的物件
let certainlyACharacter: ICharacter =
  new Character('Martin', Role.Highwayman);

// 被推論為 Character 型別的變數可以呼叫 name 屬性
character.name;

// 被推論為 Character 型別的變數可以呼叫 health 屬性
character.health;

// 被註記為 ICharacter 型別的變數可以呼叫 name 屬性
certainlyACharacter.name;

// 被註記為 ICharacter 型別的變數，由於介面 ICharacter
// 沒有 health 屬性，被 TypeScript 判定為有潛在問題
// certainlyACharacter.health;


// 新增的 Monster 類別有實踐 ICharacter 介面
class Monster implements ICharacter {
  public role = Role.Monster;

  constructor(public name: string) {}

  public attack(target: ICharacter) {
    console.log(
      `${this.name} is attacking the ${target.role} - ${target.name}`
    );
  }
}

// 宣告一個 Character 以及 Monster
let aHumanCharacter = new Character('Maxwell', Role.Swordsman);
let aMonster = new Monster('Sticky Slime');

// Character 創建出來的物件之 attack 方法可以接收 Monster 類別創建的物件
// aHumanCharacter.attack(aMonster);

// Monster 創建出來的物件之 attack 方法也可以接收 Character 類別創建的物件
// aMonster.attack(aHumanCharacter);

class BountyHunter extends Character {
  // 賞金獵人會抓取人質或怪物，所以這裡會是用陣列型別
  public hostages: ICharacter[] = [];

  constructor (name: string) {
    super(name, Role.BountyHunter);
  }

  // 定義名為 capture - 捕捉敵人的功能
  // 第一個參數 target 是捕捉的目標
  // 第二個參數 successRate 是捕捉到目標的機率 (0 ~ 1)
  public capture(target: ICharacter, successRate: number) {
    const randomNumber = Math.random();
    let message: string;
    let targetTitle = `${target.name} the ${target.role}`;

    // 賞金獵人成功抓取敵人必要條件是 randomNumber 必須大於 1 - successRate 的數值
    // 用機率的講法是：敵人沒辦法逃脫的機率是 1 - successRate
    // 因此，若 successRate = 1（100%），則敵人逃脫機率為 1 - successRate = 0
    // 機率真是一門很深但也是令人頭痛的學問
    if (randomNumber > (1 - successRate)) {
      // 抓到敵人時，將敵人丟到 hostages 這個陣列
      this.hostages = [...this.hostages, target];

      message = `${this.name} has captured ${targetTitle}`;
    } else {
      message = `${this.name} failed to capture ${targetTitle}`
    }

    console.log(message);
  }

  // 販賣人質～
  public sellHostages() {
    const totalPrice = this.hostages.length * 1000;
    const hostagesInfo = this.hostages
      .map((hostage) => `${hostage.name} the ${hostage.role}`)
      .join('\n');

    console.log(`
${this.name} sells all the hostages, including:
${hostagesInfo}

Receive Gold: $${totalPrice}
    `);

    this.hostages = [];
  }
}

// 建立一個賞金獵人
const bountyHunter = new BountyHunter('Maxwell');

// 建立一個懸賞的普通角色
const wantedCharacter = new Character('Martin', Role.Highwayman);

// 建立一個怪物
const wantedMonster = new Monster('Eikthyrnir');

// 建立一個亡命之徒
const desperado = new Character('Legendary Joe', Role.Highwayman);

// 百分之百可以抓到普通角色
// bountyHunter.capture(wantedCharacter, 1);

// 可能可以抓到怪物
// bountyHunter.capture(wantedMonster, 0.5);

// 不太可能抓到亡命之徒
// bountyHunter.capture(desperado, 0.01);

// 賣掉人質
// bountyHunter.sellHostages();

// 普通角色是否能夠回擊呢？
wantedCharacter.attack(bountyHunter);

// 怪物是否也能夠回擊呢？
wantedMonster.attack(bountyHunter);

// 如果被強行註記為 ICharacter 的變數，是否能夠接受 BountyHunter 類型的值？
const anyCharacter: ICharacter = new BountyHunter('Alexius');

// 註記為 ICharacter 的 BountyHunter 是否可以呼叫 capture 方法？
// anyCharacter.capture(wantedMonster, 0.5);






/* ------------------------------- Day 27 ----------------------------------- */

class Sorter {
  // 使用者建立一個 Sorter 需要代入一個清單式的目標
  // 這裡我們先用 number[] 作為輸入
  // private 模式下防止使用者竄改
  constructor (private input: number[]) {}

  // 將使用者代入的清單式的值經由 Getter 設為唯讀模式
  get values() { return this.input; }

  // 提取代入清單狀資料的長度
  get length() { return this.input.length; }

  // 使用泡泡排序法 Bubble Sort
  public sort() {
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length - i - 1; j += 1) {
        // 1. 比較的過程：若左邊的元素值大於右邊元素值
        if (this.input[j] > this.input[j + 1]) {
          // 2. 元素互換的過程：將兩個元素進行交換
          const cache = this.input[j];
          this.input[j] = this.input[j + 1];
          this.input[j + 1] = cache;
        }
      }
    }
  }
}

// const numbers = [3, 0, 2, -4, 1];
// const sortNumbers = new Sorter(numbers);

// // 經過排序前：
// console.log(`Before sorted: ${sortNumbers.values.join(', ')}`);

// sortNumbers.sort();

// // 經過排序後：
// console.log(`After sorted: ${sortNumbers.values.join(', ')}`);

class SorterV2 {
  // 這裡我們用 number[] | string 作為輸入
  constructor (private input: number[] | string) {}

  get values() { return this.input; }

  get length() { return this.input.length; }

  // 使用泡泡排序法 Bubble Sort
  public sort() {
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length - i - 1; j += 1) {
        // 使用 Type Guard 限縮 this.input 為陣列型別
        if (this.input instanceof Array) {
          // 1. 比較的過程：若左邊的元素值大於右邊元素值
          if (this.input[j] > this.input[j + 1]) {
            // 2. 元素互換的過程：將兩個元素進行交換
            const cache = this.input[i];
            this.input[j] = this.input[j + 1];
            this.input[j + 1] = cache;
          }
        }
        
        // 使用 Type Guard 限縮 this.input 為字串型別
        else if (typeof this.input === 'string') {
          // 1. 比較的過程：若左邊的 character code 比右邊大
          if (this.input[j] > this.input[j + 1]) {
            // 2. 元素互換的過程：將兩個字母進行交換
            const chars = this.input.split('');
            const cacheChar = chars[j];
            chars[j] = chars[j + 1];
            chars[j + 1] = cacheChar;
            this.input = chars.join('');
          }
        }
      }
    }
  }
}

// const characters = 'helloworld';
// const sortCharacters = new SorterV2(characters);

// // 經過排序前：
// console.log(`Before sorted: ${sortCharacters.values}`);

// sortCharacters.sort();

// // 經過排序後：
// console.log(`After sorted: ${sortCharacters.values}`);

class SorterV3 {
  // 使用者建立一個 Sorter 需要代入一個清單式的目標
  constructor (private input: number[]) {}

  get values() { return this.input; }

  get length() { return this.input.length; }
  
  public compare(index1: number, index2: number) {
    return this.input[index1] > this.input[index2];
  }

  public swap(index1: number, index2: number) {
    const cacheEl = this.input[index1];
    this.input[index1] = this.input[index2];
    this.input[index2] = cacheEl;
  }

  // 使用泡泡排序法 Bubble Sort
  public sort() {
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length - i - 1; j += 1) {
        // 1. 比較的過程：若左邊的元素值大於右邊元素值
        if (this.compare(j, j + 1)) {
          // 2. 元素互換的過程：將兩個元素進行交換
          this.swap(j, j + 1);
        }
      }
    }
  }
}


/* 使用抽象類別 */
interface Sortable {
  values: unknown;
  at(index: number): unknown;
  length: number;
}

abstract class AbstractSorter {
  // 我們預設子類別就已經有 length 取值方法被實踐出來
  abstract get length(): number;

  // 我們預設子類別就已經有 compare 方法被實踐出來
  abstract compare(index1: number, index2: number): boolean;

  // 我們預設子類別就已經有 swap 方法被實踐出來
  abstract swap(index1: number, index2: number): void;

  // 使用泡泡排序法 Bubble Sort
  public sort() {
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length - i - 1; j += 1) {
        // 1. 比較的過程：若左邊的元素值大於右邊元素值
        if (this.compare(j, j + 1)) {
          // 2. 元素互換的過程：將兩個元素進行交換
          this.swap(j, j + 1);
        }
      }
    }
  }
}

class NumberSeries extends AbstractSorter {
  constructor(private input: number[]) {
    // 每次被繼承一定要呼叫父類別的建構子，但由於父類別
    // 建構子不需要任何參數了，所以參數為空
    super();
  }

  get values() { return this.input; }

  // 根據父類別的 abstract get length 格式進行實踐
  get length() { return this.input.length; }

  // 根據父類別的 abstract compare 函式的格式進行實踐
  public compare(index1: number, index2: number): boolean {
    return this.input[index1] > this.input[index2];
  }

  // 根據父類別的 abstract swap 函式的格式進行實踐
  public swap(index1: number, index2: number): void {
    const cacheNumber = this.input[index1];
    this.input[index1] = this.input[index2];
    this.input[index2] = cacheNumber;
  }
}

// const numbersV2 = [3, -2, 4, -6, 1];
// const numberSeries = new NumberSeries(numbersV2);

// // 排序前的結果
// console.log(`Before Sort: ${numberSeries.values.join(', ')}`);

// numberSeries.sort();

// // 排序後的結果
// console.log(`After Sort: ${numberSeries.values.join(', ')}`);

class CharacterSeries extends AbstractSorter {
  constructor(private input: string) {
    super();
  }

  get values() { return this.input; }

  // 根據父類別的 abstract get length 格式進行實踐
  get length() { return this.input.length; }

  // 根據父類別的 abstract compare 函式的格式進行實踐
  public compare(index1: number, index2: number): boolean {
    return this.input[index1] > this.input[index2];
  }

  // 根據父類別的 abstract swap 函式的格式進行實踐
  public swap(index1: number, index2: number): void {
    const chars = this.input.split('');
    const cacheChar = chars[index1];
    chars[index1] = chars[index2];
    chars[index2] = cacheChar;
    this.input = chars.join('');
  }
}

// const charsV2 = 'helloworld';
// const charSeries = new CharacterSeries(charsV2);

// // 排序前的結果
// console.log(`Before Sort: ${charSeries.values}`);

// charSeries.sort();

// // 排序後的結果
// console.log(`After Sort: ${charSeries.values}`);


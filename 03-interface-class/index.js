"use strict";
/* ------------------------------- Day 18 ----------------------------------- */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var maxwell = {
    name: 'Maxwell',
    age: 20,
    hasPet: false,
    printInfo: function () {
        console.log("\n      Name: " + this.name + "\n      Age: " + this.age + "\n      Owns a pet? " + this.hasPet + "\n    ");
    },
};
var martin = {
    name: 'Martin',
    age: 24,
    hasPet: true,
    printInfo: function () {
        console.log("\n      Name: " + this.name + "\n      Age: " + this.age + "\n      Owns a pet? " + this.hasPet + "\n    ");
    },
};
var toby = {
    name: 'Toby',
    age: 32,
    hasPet: false,
    printInfo: function () {
        console.log("\n      Name: " + this.name + "\n      Age: " + this.age + "\n      Owns a pet? " + this.hasPet + "\n    ");
    },
};
// 將介面 PersonInfo 轉換成類別的形式
var CPersonInfo = /** @class */ (function () {
    function CPersonInfo() {
        this.name = 'Maxwell';
        this.age = 20;
        this.hasPet = false;
    }
    CPersonInfo.prototype.printInfo = function () {
        console.log("\n      Name: " + this.name + "\n      Age: " + this.age + "\n      Owns a pet? " + this.hasPet + "\n    ");
    };
    return CPersonInfo;
}());
// 從類別建立出物件
var maxwellInfoFromClass = new CPersonInfo();
// console.log(maxwellInfoFromClass);
// maxwellInfoFromClass.printInfo();
var CustomPersonInfo = /** @class */ (function () {
    // 建構子函式
    function CustomPersonInfo(name, age, hasPet) {
        if (name === void 0) { name = 'Maxwell'; }
        if (age === void 0) { age = 20; }
        if (hasPet === void 0) { hasPet = false; }
        this.name = name;
        this.age = age;
        this.hasPet = hasPet;
    }
    CustomPersonInfo.prototype.printInfo = function () {
        console.log("\n      Name: " + this.name + "\n      Age: " + this.age + "\n      Owns a pet? " + this.hasPet + "\n    ");
    };
    return CustomPersonInfo;
}());
// 1. 不填入參數
var customInfo1 = new CustomPersonInfo();
// console.log(customInfo1);
// customInfo1.printInfo();
// 2. 填入自訂的參數
var customInfo2 = new CustomPersonInfo('Toby', 32, true);
// 實踐 ICashMachine 介面
var CashMachine = /** @class */ (function () {
    function CashMachine() {
        // 假設我們有這些使用者
        this.users = [
            { account: 'Maxwell', password: '123', money: 12345 },
            { account: 'Martin', password: '456', money: 54321 },
            { account: 'Chairman Guo.', password: '789', money: 1000000000 },
        ];
    }
    CashMachine.prototype.signIn = function (account, password) {
        // 因為 Array.prototype.find 是 ES6 語法，暫時先用 ES5 的方式處理
        for (var i = 0; i < this.users.length; i += 1) {
            var user = this.users[i];
            if (user.account === account &&
                user.password === password) {
                this.currentUser = user;
                break;
            }
        }
        if (this.currentUser === undefined) {
            throw new Error('User not found!');
        }
    };
    CashMachine.prototype.signOut = function () {
        // 清除目前的使用者
        this.currentUser = undefined;
    };
    CashMachine.prototype.deposit = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money += amount;
        }
        else {
            throw new Error('No user signed in!');
        }
    };
    CashMachine.prototype.withdraw = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money -= amount;
        }
        else {
            throw new Error('No user signed in!');
        }
    };
    return CashMachine;
}());
function printAccountInfo(input) {
    if (input === undefined) {
        console.log('No user found!');
    }
    else {
        console.log("\n      Current User: " + input.account + "\n      Money: " + input.money + "\n    ");
    }
}
// 初始化新的提款機
var machine = new CashMachine();
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
var TransportTicketType;
(function (TransportTicketType) {
    TransportTicketType[TransportTicketType["Train"] = 0] = "Train";
    TransportTicketType[TransportTicketType["MRT"] = 1] = "MRT";
    TransportTicketType[TransportTicketType["Aviation"] = 2] = "Aviation";
})(TransportTicketType || (TransportTicketType = {}));
;
// 定義名為交通的類別
var TicketSystem = /** @class */ (function () {
    function TicketSystem(type, startingPoint, destination, departureTime) {
        this.type = type;
        this.startingPoint = startingPoint;
        this.destination = destination;
        this.departureTime = departureTime;
    }
    // 計算交通的間隔時間
    TicketSystem.prototype.deriveDuration = function () {
        // 因為交通方式有三種，所以我們選擇先寫死
        return [1, 0, 0];
    };
    // 計算交通的抵達時間
    TicketSystem.prototype.deriveArrivalTime = function () {
        var departureTime = this.departureTime;
        // 從間隔時間導出總共間隔的微秒數
        var _a = this.deriveDuration(), hours = _a[0], minutes = _a[1], seconds = _a[2];
        var durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        var durationMilliseconds = durationSeconds * 1000;
        // 導出抵達時間
        var arrivalMilliseconds = departureTime.getTime() + durationMilliseconds;
        return new Date(arrivalMilliseconds);
    };
    // 印出交通票券的詳細內容
    TicketSystem.prototype.getTicketInfo = function () {
        // 根據 Day 07. 提到的列舉的反射性
        // 可以反向由值推回列舉的鍵的名稱！
        var ticketName = TransportTicketType[this.type];
        var arrivalTime = this.deriveArrivalTime();
        console.log("\n      Ticket Type: " + ticketName + "\n      Station:     " + this.startingPoint + " - " + this.destination + "\n      Departure:   " + this.departureTime + "\n      Arrival:     " + arrivalTime + "\n    ");
    };
    return TicketSystem;
}());
// 我們來開張火車票～
var randomTicket = new TicketSystem(
// 這是火車票！
TransportTicketType.Train, 
// 啟程地點
'Tainan', 
// 抵達終點
'Kaohsiung', 
// 啟程時間 2019/09/01 早上 9 點 00 分 00 秒
new Date(2019, 8, 1, 9, 0, 0));
var TrainTicket = /** @class */ (function (_super) {
    __extends(TrainTicket, _super);
    // 子類別的建構子函式
    function TrainTicket(startingPoint, destination, departureTime) {
        var _this = 
        // 使用 super 將初始化值傳到父類別的建構子函式裡
        _super.call(this, TransportTicketType.Train, startingPoint, destination, departureTime) || this;
        _this.stops = [
            'Pingtung',
            'Kaohsiung',
            'Tainan',
            'Taichung',
            'Hsinchu',
            'Taipei',
        ];
        _this.stationsDetail = [
            { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [2, 30, 0] },
            { name: 'Kaohsiung', nextStop: 'Tainan', duration: [1, 45, 30] },
            { name: 'Tainan', nextStop: 'Taichung', duration: [3, 20, 0] },
            { name: 'Taichung', nextStop: 'Hsinchu', duration: [2, 30, 30] },
            { name: 'Hsinchu', nextStop: 'Taipei', duration: [1, 30, 30] },
        ];
        return _this;
    }
    TrainTicket.prototype.isStopExist = function (stop) {
        for (var i = 0; i < this.stops.length; i += 1) {
            var existedStop = this.stops[i];
            if (existedStop === stop)
                return true;
        }
        return false;
    };
    TrainTicket.prototype.deriveDuration = function () {
        // 我們必須取得啟程站與抵達站
        var _a = this, startingPoint = _a.startingPoint, destination = _a.destination;
        // 先確保車站的站點是合理的
        if (this.isStopExist(startingPoint) &&
            this.isStopExist(destination)) {
            var time = [0, 0, 0];
            var stopFound = false;
            /* 1. 開始進行站點間的運算 */
            for (var i = 0; i < this.stationsDetail.length; i += 1) {
                var detail = this.stationsDetail[i];
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
                    if (detail.nextStop === destination)
                        break;
                }
            }
            /* 2. 將時間轉換成合理的格式 */
            // 每六十秒轉一分鐘
            var minutes = Math.floor(time[2] / 60);
            time[1] += minutes;
            time[2] -= minutes * 60;
            // 每六十分鐘轉一小時
            var hours = Math.floor(time[1] / 60);
            time[0] += hours;
            time[1] -= hours * 60;
            // 回傳時間的格式 TimeFormat
            return time;
        }
        // `never` 型別的例外，參見 Day 10.
        throw new Error("Wrong stop name! Please check again!");
    };
    return TrainTicket;
}(TicketSystem));
var trainTicket = new TrainTicket(
// 啟程自台南
'Tainan', 
// 終點到新竹
'Hsinchu', 
// 發車時間為 2019/09/01 早上 9:00
new Date(2019, 8, 1, 9, 0, 0));
// trainTicket.getTicketInfo();
/* 使用 super 的注意事項 */
// 父類別擁有三個成員變數
var TestParentClass = /** @class */ (function () {
    function TestParentClass(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    return TestParentClass;
}());
// 子類別繼承父類別，並且呼叫 super 進行初始化物件的動作
var TestChildClass1 = /** @class */ (function (_super) {
    __extends(TestChildClass1, _super);
    function TestChildClass1(p1Child, p2Child, p3Child) {
        return _super.call(this, p1Child, p2Child, p3Child) || this;
    }
    return TestChildClass1;
}(TestParentClass));
var objFromChildClass1 = new TestChildClass1(123, 'Hello', true);
// console.log(objFromChildClass1);
// 子類別繼承父類別，但是沒有實踐建構子函式
var TestChildClass2 = /** @class */ (function (_super) {
    __extends(TestChildClass2, _super);
    function TestChildClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestChildClass2;
}(TestParentClass));
// 請仔細查看這一行出現的錯誤訊息：
// const objFromChildClass2 = new TestChildClass2();
/* ------------------------------- Day 21 ----------------------------------- */
/* 幾何圓形類別 */
var CircleGeometry = /** @class */ (function () {
    // 初始化時需要的參數為半徑 radius
    function CircleGeometry(radius) {
        this.radius = radius;
        this.PI = 3.14;
    }
    // 計算圓形的面積
    CircleGeometry.prototype.area = function () {
        return this.PI * (Math.pow(this.radius, 2));
    };
    // 計算圓形的周長
    CircleGeometry.prototype.circumference = function () {
        return 2 * this.PI * this.radius;
    };
    return CircleGeometry;
}());
// 初始化半徑為單位 2 的圓
var myCircle = new CircleGeometry(2);
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
var StaticCircleGeometry = /** @class */ (function () {
    function StaticCircleGeometry() {
    }
    // 計算圓形的面積
    StaticCircleGeometry.area = function (radius) {
        return StaticCircleGeometry.PI * (Math.pow(radius, 2));
    };
    // 計算圓形的周長
    StaticCircleGeometry.circumference = function (radius) {
        return 2 * StaticCircleGeometry.PI * radius;
    };
    // 提供使用者一個管道來取得 PI 的值
    StaticCircleGeometry.getValueOfPI = function () {
        return StaticCircleGeometry.PI;
    };
    StaticCircleGeometry.PI = 3.14;
    return StaticCircleGeometry;
}());
// 接觸 `private` 的靜態成員會被警告！
// StaticCircleGeometry.PI;
// 但是可以藉由公用靜態方法取得資訊
StaticCircleGeometry.getValueOfPI();
/* 使用 CircleGeometry */
// 初始化半徑為單位 2 的圓
var circleObj = new CircleGeometry(2);
// 計算圓的面積
var areaFromObj = circleObj.area();
// 計算圓的周長
var circumferenceFromObj = circleObj.circumference();
/* 使用 StaticCircleGeometry */
// 計算半徑為 2 的圓之面積
var areaFromStaticMethod = StaticCircleGeometry.area(2);
// 計算半徑為 2 的圓之周長
var circumferenceFromStaticMethod = StaticCircleGeometry.circumference(2);
/* ------------------------------- Day 22 ----------------------------------- */
var CircleGeometryV2 = /** @class */ (function () {
    // 略...
    // 初始化時需要的參數為半徑 radius
    function CircleGeometryV2(radius) {
        this.radius = radius;
        // 使用 readonly 在成員變數上
        this.PI = 3.14;
    }
    Object.defineProperty(CircleGeometryV2.prototype, "area", {
        // 使用取值方法 Getter Method
        // 裡面不能有任何參數，否則會被記警告！
        get: function ( /* 禁止放任意參數 */) {
            // 沒有回傳任何值也是錯誤的行為！
            return this.PI * (Math.pow(this.radius, 2));
        },
        // 使用存值方法 Setter Method
        // 裡面僅僅只能有一個參數，否則會被記警告！
        set: function (value /* , anotherValue: number */) {
            // 半徑是面積先除以圓周率 PI 之後再開根號
            // 開根號等效於取 0.5 次方的概念！
            this.radius = Math.pow((value / this.PI), 0.5);
        },
        enumerable: true,
        configurable: true
    });
    // 計算圓形的周長
    CircleGeometryV2.prototype.circumference = function () {
        return 2 * this.PI * this.radius;
    };
    // 使用 readonly 在類別靜態屬性上
    CircleGeometryV2.staticPI = 3.14;
    return CircleGeometryV2;
}());
// 初始化半徑為 2 的圓形
var randomCircle = new CircleGeometryV2(2);
// 取得圓形的面積
// console.log(randomCircle.area);
// 改變半徑的值
randomCircle.radius = 3;
// 再次取得圓形面積
// console.log(randomCircle.area);
// 初始化半徑為 2 的圓形
var anotherRandomCircle = new CircleGeometryV2(2);
// 取得圓形的半徑，應該等於 2
// console.log(anotherRandomCircle.radius);
// 取得圓形的面積
// console.log(anotherRandomCircle.area);
// 更改圓形的面積應該會連動到 radius 半徑的值
// 這一次我們使用半徑為 5 的圓形面積作為指派值
anotherRandomCircle.area = 3.14 * (Math.pow(5, 2));
// 半徑應該約等於 5
// console.log(anotherRandomCircle.radius);
var areaOfCircle = anotherRandomCircle.area;
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
var Sorter = /** @class */ (function () {
    // 使用者建立一個 Sorter 需要代入一個清單式的目標
    // 這裡我們先用 number[] 作為輸入
    // private 模式下防止使用者竄改
    function Sorter(input) {
        this.input = input;
    }
    Object.defineProperty(Sorter.prototype, "values", {
        // 將使用者代入的清單式的值經由 Getter 設為唯讀模式
        get: function () { return this.input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sorter.prototype, "length", {
        // 提取代入清單狀資料的長度
        get: function () { return this.input.length; },
        enumerable: true,
        configurable: true
    });
    // 使用泡泡排序法 Bubble Sort
    Sorter.prototype.sort = function () {
        for (var i = 0; i < this.length; i += 1) {
            for (var j = 0; j < this.length - i - 1; j += 1) {
                // 1. 比較的過程：若左邊的元素值大於右邊元素值
                if (this.input[j] > this.input[j + 1]) {
                    // 2. 元素互換的過程：將兩個元素進行交換
                    var cache = this.input[j];
                    this.input[j] = this.input[j + 1];
                    this.input[j + 1] = cache;
                }
            }
        }
    };
    return Sorter;
}());
// const numbers = [3, 0, 2, -4, 1];
// const sortNumbers = new Sorter(numbers);
// // 經過排序前：
// console.log(`Before sorted: ${sortNumbers.values.join(', ')}`);
// sortNumbers.sort();
// // 經過排序後：
// console.log(`After sorted: ${sortNumbers.values.join(', ')}`);
var SorterV2 = /** @class */ (function () {
    // 這裡我們用 number[] | string 作為輸入
    function SorterV2(input) {
        this.input = input;
    }
    Object.defineProperty(SorterV2.prototype, "values", {
        get: function () { return this.input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SorterV2.prototype, "length", {
        get: function () { return this.input.length; },
        enumerable: true,
        configurable: true
    });
    // 使用泡泡排序法 Bubble Sort
    SorterV2.prototype.sort = function () {
        for (var i = 0; i < this.length; i += 1) {
            for (var j = 0; j < this.length - i - 1; j += 1) {
                // 使用 Type Guard 限縮 this.input 為陣列型別
                if (this.input instanceof Array) {
                    // 1. 比較的過程：若左邊的元素值大於右邊元素值
                    if (this.input[j] > this.input[j + 1]) {
                        // 2. 元素互換的過程：將兩個元素進行交換
                        var cache = this.input[i];
                        this.input[j] = this.input[j + 1];
                        this.input[j + 1] = cache;
                    }
                }
                // 使用 Type Guard 限縮 this.input 為字串型別
                else if (typeof this.input === 'string') {
                    // 1. 比較的過程：若左邊的 character code 比右邊大
                    if (this.input[j] > this.input[j + 1]) {
                        // 2. 元素互換的過程：將兩個字母進行交換
                        var chars = this.input.split('');
                        var cacheChar = chars[j];
                        chars[j] = chars[j + 1];
                        chars[j + 1] = cacheChar;
                        this.input = chars.join('');
                    }
                }
            }
        }
    };
    return SorterV2;
}());
// const characters = 'helloworld';
// const sortCharacters = new SorterV2(characters);
// // 經過排序前：
// console.log(`Before sorted: ${sortCharacters.values}`);
// sortCharacters.sort();
// // 經過排序後：
// console.log(`After sorted: ${sortCharacters.values}`);
var SorterV3 = /** @class */ (function () {
    // 使用者建立一個 Sorter 需要代入一個清單式的目標
    function SorterV3(input) {
        this.input = input;
    }
    Object.defineProperty(SorterV3.prototype, "values", {
        get: function () { return this.input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SorterV3.prototype, "length", {
        get: function () { return this.input.length; },
        enumerable: true,
        configurable: true
    });
    SorterV3.prototype.compare = function (index1, index2) {
        return this.input[index1] > this.input[index2];
    };
    SorterV3.prototype.swap = function (index1, index2) {
        var cacheEl = this.input[index1];
        this.input[index1] = this.input[index2];
        this.input[index2] = cacheEl;
    };
    // 使用泡泡排序法 Bubble Sort
    SorterV3.prototype.sort = function () {
        for (var i = 0; i < this.length; i += 1) {
            for (var j = 0; j < this.length - i - 1; j += 1) {
                // 1. 比較的過程：若左邊的元素值大於右邊元素值
                if (this.compare(j, j + 1)) {
                    // 2. 元素互換的過程：將兩個元素進行交換
                    this.swap(j, j + 1);
                }
            }
        }
    };
    return SorterV3;
}());
var AbstractSorter = /** @class */ (function () {
    function AbstractSorter() {
    }
    // 使用泡泡排序法 Bubble Sort
    AbstractSorter.prototype.sort = function () {
        for (var i = 0; i < this.length; i += 1) {
            for (var j = 0; j < this.length - i - 1; j += 1) {
                // 1. 比較的過程：若左邊的元素值大於右邊元素值
                if (this.compare(j, j + 1)) {
                    // 2. 元素互換的過程：將兩個元素進行交換
                    this.swap(j, j + 1);
                }
            }
        }
    };
    return AbstractSorter;
}());
var NumberSeries = /** @class */ (function (_super) {
    __extends(NumberSeries, _super);
    function NumberSeries(input) {
        var _this = 
        // 每次被繼承一定要呼叫父類別的建構子，但由於父類別
        // 建構子不需要任何參數了，所以參數為空
        _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    Object.defineProperty(NumberSeries.prototype, "values", {
        get: function () { return this.input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberSeries.prototype, "length", {
        // 根據父類別的 abstract get length 格式進行實踐
        get: function () { return this.input.length; },
        enumerable: true,
        configurable: true
    });
    // 根據父類別的 abstract compare 函式的格式進行實踐
    NumberSeries.prototype.compare = function (index1, index2) {
        return this.input[index1] > this.input[index2];
    };
    // 根據父類別的 abstract swap 函式的格式進行實踐
    NumberSeries.prototype.swap = function (index1, index2) {
        var cacheNumber = this.input[index1];
        this.input[index1] = this.input[index2];
        this.input[index2] = cacheNumber;
    };
    return NumberSeries;
}(AbstractSorter));
// const numbersV2 = [3, -2, 4, -6, 1];
// const numberSeries = new NumberSeries(numbersV2);
// // 排序前的結果
// console.log(`Before Sort: ${numberSeries.values.join(', ')}`);
// numberSeries.sort();
// // 排序後的結果
// console.log(`After Sort: ${numberSeries.values.join(', ')}`);
var CharacterSeries = /** @class */ (function (_super) {
    __extends(CharacterSeries, _super);
    function CharacterSeries(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    Object.defineProperty(CharacterSeries.prototype, "values", {
        get: function () { return this.input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterSeries.prototype, "length", {
        // 根據父類別的 abstract get length 格式進行實踐
        get: function () { return this.input.length; },
        enumerable: true,
        configurable: true
    });
    // 根據父類別的 abstract compare 函式的格式進行實踐
    CharacterSeries.prototype.compare = function (index1, index2) {
        return this.input[index1] > this.input[index2];
    };
    // 根據父類別的 abstract swap 函式的格式進行實踐
    CharacterSeries.prototype.swap = function (index1, index2) {
        var chars = this.input.split('');
        var cacheChar = chars[index1];
        chars[index1] = chars[index2];
        chars[index2] = cacheChar;
        this.input = chars.join('');
    };
    return CharacterSeries;
}(AbstractSorter));
var charsV2 = 'helloworld';
var charSeries = new CharacterSeries(charsV2);
// 排序前的結果
console.log("Before Sort: " + charSeries.values);
charSeries.sort();
// 排序後的結果
console.log("After Sort: " + charSeries.values);

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
trainTicket.getTicketInfo();
/* ------------------------------- Day 21 ----------------------------------- */
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Swordsman_1 = __importDefault(require("./characters/Swordsman"));
var Warlock_1 = __importDefault(require("./characters/Warlock"));
// 記得要載入的武器
var Dagger_1 = __importDefault(require("./weapons/Dagger"));
var BasicWand_1 = __importDefault(require("./weapons/BasicWand"));
var swordsman = new Swordsman_1.default('Maxwell');
var warlock = new Warlock_1.default('Martin');
// 使用初始化時的 BasisSword
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);
// 切換成匕首 Dagger
swordsman.equip(new Dagger_1.default());
console.log('Using Dagger - StabAttack:');
swordsman.attack(warlock);
// 切換成 BasicWand 會丟出例外，因為 Swordsman 不能使用
try {
    swordsman.equip(new BasicWand_1.default());
}
catch (err) {
    console.log(err);
}

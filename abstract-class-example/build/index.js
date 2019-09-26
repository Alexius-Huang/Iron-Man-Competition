"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Swordsman_1 = __importDefault(require("./characters/Swordsman"));
var Warlock_1 = __importDefault(require("./characters/Warlock"));
var BasicSword_1 = __importDefault(require("./weapons/BasicSword"));
var StabAttack_1 = __importDefault(require("./abilities/StabAttack"));
var swordUsingStab = new BasicSword_1.default();
swordUsingStab.switchAttackStrategy(new StabAttack_1.default());
var swordsman = new Swordsman_1.default('Maxwell');
var warlock = new Warlock_1.default('Martin');
// 使用初始化時的 BasicSword，其中 BasicSword 綁定的是 MeleeAttack
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);
// 改變武器，使用綁定為 StabAttack 模式的 BasicSword
console.log('Using Dagger - StabAttack');
swordsman.equip(swordUsingStab);
swordsman.attack(warlock);
// // 切換成 BasicWand 會丟出例外，因為 Swordsman 不能使用
// try {
//   swordsman.equip(new BasicWand());
// } catch (err) {
//   console.log(err);
// }

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Swordsman_1 = __importDefault(require("./characters/Swordsman"));
var Warlock_1 = __importDefault(require("./characters/Warlock"));
// 武器的載入根本不需要了！
// import BasicSword from './weapons/BasicSword';
// import BasicWand from './weapons/BasicWand';
// import Dagger from './weapons/Dagger';
// 只需要載入工廠以及武器列表
var Weapons_1 = __importDefault(require("./weapons/Weapons"));
var WeaponFactory_1 = __importDefault(require("./weapons/WeaponFactory"));
var swordsman = new Swordsman_1.default('Maxwell');
var warlock = new Warlock_1.default('Martin');
// 建立武器的工廠
var weaponFactory = new WeaponFactory_1.default();
// 使用 Swordsman 預設的武器 BasicSword 進行攻擊
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);
// 建立 Dagger 並更換武器
var dagger = weaponFactory.createWeapon(Weapons_1.default.Dagger);
swordsman.equip(dagger);
// 使用 Dagger 進行攻擊
console.log('Using Dagger - StabAttack:');
swordsman.attack(warlock);

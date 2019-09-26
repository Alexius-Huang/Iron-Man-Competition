"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MeleeAttack_1 = __importDefault(require("../abilities/MeleeAttack"));
// 我們將原本是介面的 Weapon 晉升為抽象類別後，使用 abstract class
var Weapon = /** @class */ (function () {
    function Weapon() {
        // 武器的攻擊策略，為 Weapon 與 Attack 之間的連結
        // 由於被註記為 abstract，子類別強制要實踐這個成員
        this.attackStrategy = new MeleeAttack_1.default();
    }
    // 類別裡正常的功能實踐，子類別一但繼承就擁有這個功能
    Weapon.prototype.switchAttackStrategy = function (type) {
        this.attackStrategy = type;
    };
    Weapon.prototype.attack = function (self, target) {
        this.attackStrategy.attack(self, target);
    };
    return Weapon;
}());
exports.default = Weapon;

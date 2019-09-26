"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Character = /** @class */ (function () {
    function Character(name, role, 
    // 不需要再新增 attackRef，因為可以根據初始化的武器決定
    // 新增一個針對 Weapon 裝備的參考成員
    weaponRef) {
        this.name = name;
        this.role = role;
        this.weaponRef = weaponRef;
        this.attackRef = this.weaponRef.attackStrategy;
    }
    Character.prototype.introduce = function () {
        console.log("\n      Hi, I'm " + this.name + " the " + this.role + "!\n    ");
    };
    // 將角色的攻擊能力藉由參考點連結的策略進行實現的動作
    Character.prototype.attack = function (target) {
        // 別忘了，第一個參數要指定攻擊者，此時的攻擊者是自己
        // 第二個參數則是被攻擊者，所以是 target
        this.attackRef.attack(this, target);
    };
    // 對攻擊的策略進行更換：本功能應該不太需要了
    // public switchAttackStrategy(type: Attack) {
    //   this.attackRef = type;
    // }
    // 角色可以裝備東西
    Character.prototype.equip = function (weapon) {
        var roles = weapon.availableRoles;
        if (roles.length === 0 ||
            roles.indexOf(this.role) !== -1) {
            // 如果角色可以裝備，則改變武器的參考外
            // 順便改變攻擊策略！
            console.log(this.name + " has equipped \"" + weapon.name + "\"!");
            this.weaponRef = weapon;
            this.attackRef = this.weaponRef.attackStrategy;
        }
        else {
            // 不能裝備武器就丟出例外處理
            throw new Error(this.role + " cannot equip " + weapon.name + "!");
        }
    };
    return Character;
}());
exports.default = Character;

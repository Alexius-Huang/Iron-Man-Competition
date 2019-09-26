"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Character = /** @class */ (function () {
    function Character(name, role, 
    // 原本 attackRef 的參考點被替換成 weaponRef
    // 用來連結角色與武器 Weapon 之間的關係
    weaponRef) {
        this.name = name;
        this.role = role;
        this.weaponRef = weaponRef;
    }
    Character.prototype.introduce = function () {
        console.log("\n      Hi, I'm " + this.name + " the " + this.role + "!\n    ");
    };
    // equip 方法負責幫角色裝備武器
    // 這個方法也可以看成 switchWeaponStrategy —— 那是
    // 因為 Weapon 在策略模式裡，不同武器被視為不同的策略
    Character.prototype.equip = function (weapon) {
        var roles = weapon.availableRoles;
        // 確認武器是否能夠被裝備
        if (roles.length === 0 ||
            roles.indexOf(this.role) !== -1) {
            this.weaponRef = weapon;
        }
        else {
            throw new Error(this.role + " cannot equip " + weapon.name + "!");
        }
    };
    // 藉由 weaponRef 參考點呼叫 attack 方法
    Character.prototype.attack = function (target) {
        this.weaponRef.attack(this, target);
    };
    return Character;
}());
exports.default = Character;

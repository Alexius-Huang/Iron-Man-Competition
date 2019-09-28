"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Weapon_1 = __importDefault(require("../weapons/Weapon"));
var Armour_1 = __importDefault(require("../armours/Armour"));
var Character = /** @class */ (function () {
    function Character(name, role, 
    // 負責連結 Weapon 與 Armour 的成員
    weaponRef, armourRef) {
        this.name = name;
        this.role = role;
        this.weaponRef = weaponRef;
        this.armourRef = armourRef;
    }
    Character.prototype.equip = function (equipment) {
        var roles = equipment.availableRoles;
        // 確認該裝備是否能夠被角色使用
        if (roles.length === 0 ||
            roles.indexOf(this.role) !== -1) {
            // 確認裝備類型：使用 Type Guard
            if (equipment instanceof Weapon_1.default) {
                this.weaponRef = equipment;
            }
            else if (equipment instanceof Armour_1.default) {
                this.armourRef = equipment;
            }
        }
        else {
            throw new Error(this.role + " cannot equip " + equipment.name + "!");
        }
        console.log(this.name + " has equipped a " + equipment.type + " - " + equipment.name);
    };
    // 藉由 weaponRef 參考點呼叫 attack 方法
    Character.prototype.attack = function (target) {
        this.weaponRef.attack(this, target);
    };
    return Character;
}());
exports.default = Character;

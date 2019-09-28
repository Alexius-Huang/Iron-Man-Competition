"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// weapons/Weapon.ts
var Equipments_1 = __importDefault(require("../equipments/Equipments"));
var Weapon = /** @class */ (function () {
    function Weapon() {
        this.type = Equipments_1.default.Weapon;
    }
    Weapon.prototype.switchAttackStrategy = function (type) {
        this.attackStrategy = type;
    };
    Weapon.prototype.attack = function (self, target) {
        this.attackStrategy.attack(self, target);
    };
    return Weapon;
}());
exports.default = Weapon;

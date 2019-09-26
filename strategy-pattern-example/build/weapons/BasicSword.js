"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MeleeAttack_1 = __importDefault(require("../abilities/MeleeAttack"));
var Role_1 = __importDefault(require("../characters/Role"));
var BasicSword = /** @class */ (function () {
    function BasicSword() {
        this.name = 'Basic Sword';
        // 基本的劍只能簡單地揮擊
        this.attackStrategy = new MeleeAttack_1.default();
        // 可以被 Swordsman 或 Highwayman 使用
        this.availableRoles = [
            Role_1.default.Swordsman,
            Role_1.default.Highwayman
        ];
    }
    return BasicSword;
}());
exports.default = BasicSword;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MeleeAttack_1 = __importDefault(require("../abilities/MeleeAttack"));
var Role_1 = __importDefault(require("../characters/Role"));
var BasicWand = /** @class */ (function () {
    function BasicWand() {
        this.name = 'Basic Wand';
        // 基本的劍只能簡單地揮擊
        this.attackStrategy = new MeleeAttack_1.default();
        // 只能被 Warlock 使用
        this.availableRoles = [
            Role_1.default.Warlock
        ];
    }
    return BasicWand;
}());
exports.default = BasicWand;

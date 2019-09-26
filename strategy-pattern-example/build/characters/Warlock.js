"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// characters/Warlock.ts
var Role_1 = __importDefault(require("./Role"));
var Character_1 = __importDefault(require("./Character"));
// 不需要再用攻擊的策略，而是藉由武器的選擇自動選擇攻擊策略
// import MagicAttack from '../abilities/MagicAttack';
var BasicWand_1 = __importDefault(require("../weapons/BasicWand"));
var Warlock = /** @class */ (function (_super) {
    __extends(Warlock, _super);
    function Warlock(name) {
        return _super.call(this, name, Role_1.default.Warlock, 
        // 選擇初始化的武器！
        new BasicWand_1.default()) || this;
    }
    return Warlock;
}(Character_1.default));
exports.default = Warlock;

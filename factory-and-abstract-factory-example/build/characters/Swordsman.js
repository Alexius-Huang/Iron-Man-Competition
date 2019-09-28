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
// characters/Swordsman.ts
var Role_1 = __importDefault(require("./Role"));
var Character_1 = __importDefault(require("./Character"));
var SwordsmanEquipmentFactory_1 = __importDefault(require("../equipments/SwordsmanEquipmentFactory"));
var Swordsman = /** @class */ (function (_super) {
    __extends(Swordsman, _super);
    function Swordsman(name) {
        var _this = this;
        var SEF = new SwordsmanEquipmentFactory_1.default();
        _this = _super.call(this, name, Role_1.default.Swordsman, 
        // 由工廠幫我們製作武器跟防具
        SEF.createWeapon(), SEF.createArmour()) || this;
        return _this;
    }
    return Swordsman;
}(Character_1.default));
exports.default = Swordsman;

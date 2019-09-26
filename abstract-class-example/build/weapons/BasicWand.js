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
// weapons/BasicWand.ts
var Weapon_1 = __importDefault(require("./Weapon"));
var Role_1 = __importDefault(require("../characters/Role"));
var MagicAttack_1 = __importDefault(require("../abilities/MagicAttack"));
var BasicWand = /** @class */ (function (_super) {
    __extends(BasicWand, _super);
    function BasicWand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Basic Wand';
        _this.availableRoles = [
            Role_1.default.Warlock
        ];
        // 為連結 Attack 策略的參考點
        _this.attackStrategy = new MagicAttack_1.default();
        return _this;
    }
    return BasicWand;
}(Weapon_1.default));
exports.default = BasicWand;

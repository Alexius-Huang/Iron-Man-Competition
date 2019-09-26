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
// weapons/Dagger.ts
var Weapon_1 = __importDefault(require("./Weapon"));
var StabAttack_1 = __importDefault(require("../abilities/StabAttack"));
var Dagger = /** @class */ (function (_super) {
    __extends(Dagger, _super);
    function Dagger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Dagger';
        _this.availableRoles = [];
        // 為連結 Attack 策略的參考點
        _this.attackStrategy = new StabAttack_1.default();
        return _this;
    }
    return Dagger;
}(Weapon_1.default));
exports.default = Dagger;

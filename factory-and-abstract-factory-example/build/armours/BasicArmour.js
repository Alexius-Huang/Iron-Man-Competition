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
var Armour_1 = __importDefault(require("./Armour"));
var Role_1 = __importDefault(require("../characters/Role"));
var BasicArmour = /** @class */ (function (_super) {
    __extends(BasicArmour, _super);
    function BasicArmour() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Basic Armour';
        _this.availableRoles = [
            Role_1.default.Swordsman,
            Role_1.default.BountyHunter
        ];
        return _this;
    }
    return BasicArmour;
}(Armour_1.default));
exports.default = BasicArmour;

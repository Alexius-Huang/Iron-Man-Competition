"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicWand_1 = __importDefault(require("../weapons/BasicWand"));
var BasicRobe_1 = __importDefault(require("../armours/BasicRobe"));
var WarlockEquipmentFactory = /** @class */ (function () {
    function WarlockEquipmentFactory() {
    }
    WarlockEquipmentFactory.prototype.createWeapon = function () {
        return new BasicWand_1.default();
    };
    WarlockEquipmentFactory.prototype.createArmour = function () {
        return new BasicRobe_1.default();
    };
    return WarlockEquipmentFactory;
}());
exports.default = WarlockEquipmentFactory;

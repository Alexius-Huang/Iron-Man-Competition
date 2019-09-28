"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicSword_1 = __importDefault(require("../weapons/BasicSword"));
var BasicArmour_1 = __importDefault(require("../armours/BasicArmour"));
var SwordsmanEquipmentFactory = /** @class */ (function () {
    function SwordsmanEquipmentFactory() {
    }
    SwordsmanEquipmentFactory.prototype.createWeapon = function () {
        return new BasicSword_1.default();
    };
    SwordsmanEquipmentFactory.prototype.createArmour = function () {
        return new BasicArmour_1.default();
    };
    return SwordsmanEquipmentFactory;
}());
exports.default = SwordsmanEquipmentFactory;

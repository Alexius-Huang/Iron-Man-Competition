"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// armours/Armour.ts
var Equipments_1 = __importDefault(require("../equipments/Equipments"));
var Armour = /** @class */ (function () {
    function Armour() {
        this.type = Equipments_1.default.Armour;
    }
    return Armour;
}());
exports.default = Armour;

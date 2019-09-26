"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StabAttack_1 = __importDefault(require("../abilities/StabAttack"));
var Dagger = /** @class */ (function () {
    function Dagger() {
        this.name = 'Dagger';
        // 匕首可以進行刺擊的動作
        this.attackStrategy = new StabAttack_1.default();
        // 任何職業都可以進行刺級，在此留為空陣列
        this.availableRoles = [];
    }
    return Dagger;
}());
exports.default = Dagger;

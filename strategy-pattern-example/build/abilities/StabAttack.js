"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 本攻擊策略為 StabAttack，並且綁定 Attack 這個介面 */
var StabAttack = /** @class */ (function () {
    function StabAttack() {
    }
    StabAttack.prototype.attack = function (self, target) {
        console.log(self.name + " stabs through " + target.name + " with his sword!");
    };
    return StabAttack;
}());
exports.default = StabAttack;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 本攻擊策略為 MeleeAttack，並且綁定 Attack 這個介面 */
var MeleeAttack = /** @class */ (function () {
    function MeleeAttack() {
    }
    MeleeAttack.prototype.attack = function (self, target) {
        console.log(self.name + " strikes " + target.name + " with a big sword!");
    };
    return MeleeAttack;
}());
exports.default = MeleeAttack;

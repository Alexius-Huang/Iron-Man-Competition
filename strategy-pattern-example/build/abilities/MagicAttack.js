"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 本攻擊策略為 MagicAttack，並且綁定 Attack 這個介面 */
var MagicAttack = /** @class */ (function () {
    function MagicAttack() {
    }
    MagicAttack.prototype.attack = function (self, target) {
        console.log(self.name + " casts magic and pierces through " + target.name + "!");
    };
    return MagicAttack;
}());
exports.default = MagicAttack;

"use strict";
// weapons/Weapons
Object.defineProperty(exports, "__esModule", { value: true });
// 所有武器的列舉
var Weapons;
(function (Weapons) {
    Weapons[Weapons["BasicSword"] = 0] = "BasicSword";
    Weapons[Weapons["BasicWand"] = 1] = "BasicWand";
    Weapons[Weapons["Dagger"] = 2] = "Dagger";
    // 更多武器可以進行擴充...
})(Weapons || (Weapons = {}));
;
exports.default = Weapons;

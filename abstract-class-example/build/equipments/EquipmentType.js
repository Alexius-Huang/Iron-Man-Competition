"use strict";
// equipments/EquipmentType.ts
Object.defineProperty(exports, "__esModule", { value: true });
// 角色可以穿上的裝備類型很多種
var EquipmentType;
(function (EquipmentType) {
    EquipmentType[EquipmentType["Weapon"] = 0] = "Weapon";
    EquipmentType[EquipmentType["Armour"] = 1] = "Armour";
    EquipmentType[EquipmentType["Helmet"] = 2] = "Helmet";
    // 讀者可以自行發揮...
})(EquipmentType || (EquipmentType = {}));
exports.default = EquipmentType;

import Weapon from "../weapons/Weapon";
import Armour from '../armours/Armour';

// 每一種裝備的工廠必須符合 EquipmentFactory 的規格
export default interface EquipmentFactory {
  createWeapon(): Weapon;
  createArmour(): Armour;
}

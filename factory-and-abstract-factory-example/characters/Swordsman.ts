// characters/Swordsman.ts
import Role from './Role';
import Character from './Character';
import SwordsmanEquipmentFactory from '../equipments/SwordsmanEquipmentFactory';

export default class Swordsman extends Character {
  constructor(name: string) {
    let SEF = new SwordsmanEquipmentFactory();

    super(
      name,
      Role.Swordsman,

      // 由工廠幫我們製作武器跟防具
      SEF.createWeapon(),
      SEF.createArmour(),
    );
  }
}
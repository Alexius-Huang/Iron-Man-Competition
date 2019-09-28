// characters/Warlock.ts
import Role from './Role';
import Character from './Character';
import WarlockEquipmentFactory from '../equipments/WarlockEquipmentFactory';

export default class Warlock extends Character {
  constructor(name: string) {
    let WEF = new WarlockEquipmentFactory();

    super(
      name,
      Role.Warlock,

      // 由工廠幫我們製作武器跟防具
      WEF.createWeapon(),
      WEF.createArmour(),
    );
  }
}
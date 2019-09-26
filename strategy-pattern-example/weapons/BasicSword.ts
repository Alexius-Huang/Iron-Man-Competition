// weapons/BasicSwords.ts
import Weapon from './Weapon';
import MeleeAttack from '../abilities/MeleeAttack';
import Role from '../characters/Role';

export default class BasicSword implements Weapon {
  public readonly name = 'Basic Sword';

  // 基本的劍只能簡單地揮擊
  public attackStrategy = new MeleeAttack();

  // 可以被 Swordsman 或 Highwayman 使用
  public availableRoles = [
    Role.Swordsman,
    Role.Highwayman
  ];
}

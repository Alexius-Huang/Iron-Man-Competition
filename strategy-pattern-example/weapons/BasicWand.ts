// weapons/BasicWand.ts
import Weapon from './Weapon';
import MagicAttack from '../abilities/MeleeAttack';
import Role from '../characters/Role';

export default class BasicWand implements Weapon {
  public readonly name = 'Basic Wand';

  // 基本的劍只能簡單地揮擊
  public attackStrategy = new MagicAttack();

  // 只能被 Warlock 使用
  public availableRoles = [
    Role.Warlock
  ];
}

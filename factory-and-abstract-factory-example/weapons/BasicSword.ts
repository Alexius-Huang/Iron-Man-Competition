// weapon/BasicSword.ts
import Weapon from "./Weapon";
import Role from "../characters/Role";
import MeleeAttack from "../abilities/MeleeAttack";

// 原本是 implements Weapon 介面，變成類別繼承
export default class BasicSword extends Weapon {
  public readonly name = 'Basic Sword';

  public availableRoles = [
    Role.Swordsman,
    Role.Highwayman,
  ];

  // 為連結 Attack 策略的參考點
  public attackStrategy = new MeleeAttack();

  // switchAttackStrategy 與 attack 方法由父類別提供！
}

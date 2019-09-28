// weapons/BasicWand.ts
import Weapon from "./Weapon";
import Role from "../characters/Role";
import MagicAttack from "../abilities/MagicAttack";

export default class BasicWand extends Weapon {
  public readonly name = 'Basic Wand';

  public availableRoles = [
    Role.Warlock
  ];

  // 為連結 Attack 策略的參考點
  public attackStrategy = new MagicAttack();
}

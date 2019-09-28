// weapons/Dagger.ts
import Weapon from "./Weapon";
import Role from "../characters/Role";
import StabAttack from "../abilities/StabAttack";

export default class Dagger extends Weapon {
  public readonly name = 'Dagger';

  public availableRoles: Role[] = [];

  // 為連結 Attack 策略的參考點
  public attackStrategy = new StabAttack();
}

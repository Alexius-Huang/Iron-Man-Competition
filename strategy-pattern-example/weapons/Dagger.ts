// weapons/Dagger.ts
import Weapon from './Weapon';
import StabAttack from '../abilities/StabAttack';

export default class Dagger implements Weapon {
  public readonly name = 'Dagger';

  // 匕首可以進行刺擊的動作
  public attackStrategy = new StabAttack();

  // 任何職業都可以進行刺級，在此留為空陣列
  public availableRoles = [];
}

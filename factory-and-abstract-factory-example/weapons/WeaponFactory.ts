// weapons/WeaponFactory.ts
import Weapons from './Weapons';
import Weapon from './Weapon';

// 各種不同的武器
import BasicSword from './BasicSword';
import BasicWand from './BasicWand';
import Dagger from './Dagger';

// 負責建構武器的工廠
export default abstract class WeaponFactory {
  public createWeapon(type: Weapons): Weapon {
    switch (type) {
      case Weapons.BasicSword: return new BasicSword();
      case Weapons.BasicWand:  return new BasicWand();
      case Weapons.Dagger:     return new Dagger();
      // 更多不同的武器可以再進行擴充

      default:
        throw new Error(`${Weapons[type]} isn't registered!`);
    }
  }
}

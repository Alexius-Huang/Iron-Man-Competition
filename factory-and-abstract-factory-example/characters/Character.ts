// characters/Character
import Role from './Role';
import Weapon from '../weapons/Weapon';
import Armour from '../armours/Armour';
import Equipment from '../equipments/Equipment';

export default class Character {
  constructor(
    public readonly name: string,
    public readonly role: Role,

    // 負責連結 Weapon 與 Armour 的成員
    private weaponRef: Weapon,
    private armourRef: Armour,
  ) {}

  public equip(equipment: Equipment) {
    const { availableRoles: roles } = equipment;

    // 確認該裝備是否能夠被角色使用
    if (
      roles.length === 0 ||
      roles.indexOf(this.role) !== -1
    ) {
      // 確認裝備類型：使用 Type Guard
      if (equipment instanceof Weapon) {
        this.weaponRef = equipment;
      } else if (equipment instanceof Armour) {
        this.armourRef = equipment;
      }
    } else {
      throw new Error(`${this.role} cannot equip ${equipment.name}!`);
    }

    console.log(
      `${this.name} has equipped a ${equipment.type} - ${equipment.name}`
    );
  }

  // 藉由 weaponRef 參考點呼叫 attack 方法
  public attack(target: Character) {
    this.weaponRef.attack(this, target);
  }
}

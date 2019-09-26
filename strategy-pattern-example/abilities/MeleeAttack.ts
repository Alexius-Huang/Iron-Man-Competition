// abilities/MeleeAttack.ts
import Character from '../characters/Character';
import Attack from './Attack';

/* 本攻擊策略為 MeleeAttack，並且綁定 Attack 這個介面 */
export default class MeleeAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} strikes ${target.name} with a big sword!`);
  }
}

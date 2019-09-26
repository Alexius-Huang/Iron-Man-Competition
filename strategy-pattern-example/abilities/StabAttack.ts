// abilities/StabAttack.ts
import Character from '../characters/Character';
import Attack from './Attack';

/* 本攻擊策略為 StabAttack，並且綁定 Attack 這個介面 */
export default class StabAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} stabs through ${target.name} with his sword!`);
  }
}

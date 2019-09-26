// abilities/MagicAttack.ts
import Character from '../characters/Character';
import Attack from './Attack';

/* 本攻擊策略為 MagicAttack，並且綁定 Attack 這個介面 */
export default class MagicAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} casts magic and pierces through ${target.name}!`);
  }
}

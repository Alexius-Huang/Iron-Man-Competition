// abilities/Attack.ts
import Character from '../characters/Character';

export default interface Attack {
  attack(self: Character, target: Character): void;
}

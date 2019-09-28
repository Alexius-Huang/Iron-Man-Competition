// weapons/Weapon.ts
import Equipments from "../equipments/Equipments";
import Equipment from "../equipments/Equipment";
import Attack from "../abilities/Attack";
import Character from "../characters/Character";
import Role from "../characters/Role";

export default abstract class Weapon implements Equipment {
  abstract name: string;

  public type = Equipments.Weapon;

  abstract availableRoles: Role[];

  abstract attackStrategy: Attack;

  public switchAttackStrategy(type: Attack) {
    this.attackStrategy = type;
  }

  public attack(self: Character, target: Character) {
    this.attackStrategy.attack(self, target);
  }
}
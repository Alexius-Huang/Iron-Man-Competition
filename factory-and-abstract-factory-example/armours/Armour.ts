// armours/Armour.ts
import Equipments from "../equipments/Equipments";
import Equipment from "../equipments/Equipment";
import Role from "../characters/Role";

export default abstract class Armour implements Equipment {
  abstract name: string;

  public type = Equipments.Armour;

  abstract availableRoles: Role[];
}

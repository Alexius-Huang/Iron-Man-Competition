import Armour from "./Armour";
import Role from "../characters/Role";

export default class BasicRobe extends Armour {
  public readonly name = 'Basic Robe';

  public availableRoles = [
    Role.Warlock
  ];
}

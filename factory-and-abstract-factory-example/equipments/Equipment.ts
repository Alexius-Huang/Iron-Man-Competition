// equipments/Equipment.ts
import Equipments from "./Equipments";
import Role from "../characters/Role";

// 任何裝備必須擁有的特性
export default interface Equipment {
  name: string;
  type: Equipments;
  availableRoles: Role[];
}

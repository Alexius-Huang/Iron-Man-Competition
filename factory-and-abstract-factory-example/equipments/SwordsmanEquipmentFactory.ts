import EquipmentFactory from "./EquipmentFactory";
import BasicSword from "../weapons/BasicSword";
import BasicArmour from "../armours/BasicArmour";

class SwordsmanEquipmentFactory implements EquipmentFactory {
  public createWeapon() {
    return new BasicSword();
  }

  public createArmour() {
    return new BasicArmour();
  }
}

export default SwordsmanEquipmentFactory;
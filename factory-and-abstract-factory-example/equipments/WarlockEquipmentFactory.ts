import EquipmentFactory from "./EquipmentFactory";
import BasicWand from "../weapons/BasicWand";
import BasicRobe from "../armours/BasicRobe";

class WarlockEquipmentFactory implements EquipmentFactory {
  public createWeapon() {
    return new BasicWand();
  }

  public createArmour() {
    return new BasicRobe();
  }
}

export default WarlockEquipmentFactory;

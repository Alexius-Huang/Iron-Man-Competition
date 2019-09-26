// equipments/Equipment.ts
import EquipmentType from './EquipmentType';
import Role from '../characters/Role';

export default interface Equipment {
  // 裝備類型有很多種
  type: EquipmentType;

  // 有些裝備會限制哪些職業的角色使用
  // 如果是 'ALL' 代表任何職業都可以使用
  // 這個設計當然不是最好的設計，將就一下 XD
  availableRoles: Role[] | 'ALL';
}

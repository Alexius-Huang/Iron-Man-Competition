// weapons/Weapon.ts
import Attack from '../abilities/Attack';
import Role from '../characters/Role';

export default interface Weapon {
  // 裝備當然要有名稱～
  readonly name: string;

  // 有些裝備會限制哪些職業的角色使用
  // 如果是空代表任何職業都可以使用
  // 這個設計當然不是最好的設計，將就一下 XD
  availableRoles: Role[];

  // 綁定的基礎攻擊方式
  attackStrategy: Attack;
}

// characters/Swordsman.ts
import Role from './Role';
import Character from './Character';

// 不需要再用攻擊的策略，而是藉由武器的選擇自動選擇攻擊策略
// import MeleeAttack from '../abilities/MeleeAttack';
import BasicSword from '../weapons/BasicSword';

export default class Swordsman extends Character {
  constructor(name: string) {
    super(
      name,
      Role.Swordsman,

      // 選擇初始化的武器！
      new BasicSword()
    );
  }
}
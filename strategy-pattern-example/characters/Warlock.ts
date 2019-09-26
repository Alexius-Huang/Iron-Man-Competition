// characters/Warlock.ts
import Role from './Role';
import Character from './Character';

// 不需要再用攻擊的策略，而是藉由武器的選擇自動選擇攻擊策略
// import MagicAttack from '../abilities/MagicAttack';
import BasicWand from '../weapons/BasicWand';

export default class Warlock extends Character {
  constructor(name: string) {
    super(
      name,
      Role.Warlock,

      // 選擇初始化的武器！
      new BasicWand()
    );
  }
}
// characters/Warlock.ts
import Role from './Role';
import Character from './Character';
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
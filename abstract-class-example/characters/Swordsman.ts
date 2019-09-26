// characters/Swordsman.ts
import Role from './Role';
import Character from './Character';
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
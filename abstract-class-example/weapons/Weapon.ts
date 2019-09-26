// weapons/Weapon.ts
import Attack from "../abilities/Attack";
import Character from "../characters/Character";
import Role from "../characters/Role";
import MeleeAttack from "../abilities/MeleeAttack";

// 我們將原本是介面的 Weapon 晉升為抽象類別後，使用 abstract class
export default abstract class Weapon {
  // 武器的名稱～
  // 由於被註記為 abstract，子類別強制要實踐這個成員
  abstract name: string;

  // 武器可以被裝備的許可職業，若陣列為空，則代表所有職業都可以被裝備
  // 由於被註記為 abstract，子類別強制要實踐這個成員
  abstract availableRoles: Role[];

  // 武器的攻擊策略，為 Weapon 與 Attack 之間的連結
  // 由於被註記為 abstract，子類別強制要實踐這個成員
  abstract attackStrategy = new MeleeAttack();

  // 類別裡正常的功能實踐，子類別一但繼承就擁有這個功能
  public switchAttackStrategy(type: Attack) {
    this.attackStrategy = type;
  }

  public attack(self: Character, target: Character) {
    this.attackStrategy.attack(self, target);
  }
}

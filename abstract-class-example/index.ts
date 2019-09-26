import Swordsman from './characters/Swordsman';
import Warlock from './characters/Warlock';

import BasicSword from './weapons/BasicSword';
import StabAttack from './abilities/StabAttack';

const swordUsingStab = new BasicSword();
swordUsingStab.switchAttackStrategy(new StabAttack());

const swordsman = new Swordsman('Maxwell');
const warlock = new Warlock('Martin');

// 使用初始化時的 BasicSword，其中 BasicSword 綁定的是 MeleeAttack
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);

// 改變武器，使用綁定為 StabAttack 模式的 BasicSword
console.log('Using Dagger - StabAttack');
swordsman.equip(swordUsingStab);
swordsman.attack(warlock);

// // 切換成 BasicWand 會丟出例外，因為 Swordsman 不能使用
// try {
//   swordsman.equip(new BasicWand());
// } catch (err) {
//   console.log(err);
// }

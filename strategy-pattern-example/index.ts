import Swordsman from './characters/Swordsman';
import Warlock from './characters/Warlock';

// 記得要載入的武器
import Dagger from './weapons/Dagger';
import BasicWand from './weapons/BasicWand';

const swordsman = new Swordsman('Maxwell');
const warlock = new Warlock('Martin');

// 使用初始化時的 BasisSword
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);

// 切換成匕首 Dagger
swordsman.equip(new Dagger());

console.log('Using Dagger - StabAttack:');
swordsman.attack(warlock);

// 切換成 BasicWand 會丟出例外，因為 Swordsman 不能使用
try {
  swordsman.equip(new BasicWand());
} catch (err) {
  console.log(err);
}

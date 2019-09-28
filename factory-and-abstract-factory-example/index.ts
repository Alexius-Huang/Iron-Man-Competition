import Swordsman from './characters/Swordsman';
import Warlock from './characters/Warlock';

// 武器的載入根本不需要了！
// import BasicSword from './weapons/BasicSword';
// import BasicWand from './weapons/BasicWand';
// import Dagger from './weapons/Dagger';

// 只需要載入工廠以及武器列表
import Weapons from './weapons/Weapons';
import WeaponFactory from './weapons/WeaponFactory';

let swordsman = new Swordsman('Maxwell');
let warlock = new Warlock('Martin');

// 建立武器的工廠
const weaponFactory = new WeaponFactory();

// 使用 Swordsman 預設的武器 BasicSword 進行攻擊
console.log('Using BasicSword - MeleeAttack:');
swordsman.attack(warlock);

// 建立 Dagger 並更換武器
const dagger = weaponFactory.createWeapon(Weapons.Dagger);
swordsman.equip(dagger);

// 使用 Dagger 進行攻擊
console.log('Using Dagger - StabAttack:');
swordsman.attack(warlock);

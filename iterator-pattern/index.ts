/* 一般宣告鏈結串列的介面 */
// interface LinkedListNode {
//   value: any;
//   next: LinkedListNode | null;
// }

// interface LinkedList {
//   head: LinkedListNode | null;
//   length(): number;
//   at(index: number): LinkedListNode | null;
//   insert(index: number, value: any): void;
//   remove(index: number): void;
// }

/* 使用泛用參數的方式宣告泛用介面 */
interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
}

interface LinkedList<U> {
  head: LinkedListNode<U> | null;
  length(): number;
  at(index: number): LinkedListNode<U> | null;
  insert(index: number, value: U): void;
  remove(index: number): void;
}

/* 泛用類別宣告 */
class C<T> {
  // 宣告一個成員變數，其型別為型別參數 T
  constructor(public memberProp: T) {}

  // 宣告一個成員方法 memberFunc 主要是回傳 memberProp 的值
  public memberFunc() { return this.memberProp; }

  // 宣告一個取值方法 Getter，輸出為 memberProp
  get value() { return this.memberProp; }

  // 宣告一個存值方法 Setter，修改 memberProp 的值
  set value(input: T) { this.memberProp = input; }
}

/*
 * 情形 1.
 *
 * 不註記在變數上，建立物件時顯性填入
 * 型別參數，以下為 `number` 的範例
 * 
 */
let instanceOfC1 = new C<number>(614);

// 呼叫成員變數
instanceOfC1.memberProp;

// 呼叫成員方法
instanceOfC1.memberFunc();

// 呼叫 Getter 取值方法
instanceOfC1.value;

// 呼叫 Setter 存值方法
instanceOfC1.value = 416;


/*
 * 情形 2.
 *
 * 註記在變數上，建立物件時不註記在類別化名旁的
 * 型別參數，以下為 `number` 的範例
 * 
 */
let instanceOfC2: C<number> = new C(614);

// 呼叫成員變數
instanceOfC2.memberProp;

// 呼叫成員方法
instanceOfC2.memberFunc();

// 呼叫 Getter 取值方法
instanceOfC2.value;

// 呼叫 Setter 存值方法
instanceOfC2.value = 416;

/*
 * 情形 3.
 *
 * 不註記在變數上，建立物件時也不註記在類別化名旁的
 * 型別參數，但仍然可以推論出型別參數為 `number` 的範例
 * 
 */
let instanceOfC3 = new C(614);

// 呼叫成員變數
instanceOfC3.memberProp;

// 呼叫成員方法
instanceOfC3.memberFunc();

// 呼叫 Getter 取值方法
instanceOfC3.value;

// 呼叫 Setter 存值方法
instanceOfC3.value = 416;

/* 子類別繼承父類別，且父類別為泛用類別的狀況 */
// D 繼承 C<T>
class D extends C<number> {}

// E<T> 繼承 C<T>
class E<T> extends C<T> {}

// 宣告某一個類別具有兩個型別參數
class Cparent<T, U> {
  constructor(
    public member1: T,
    public member2: U
  ) {}

  /* 讀者自行發揮剩下的功能 */
}

// 試問以下的狀況會出現什麼樣的情形：
class Cchild1<T, U>           extends Cparent<T, U> {}
class Cchild2<T, U = T>       extends Cparent<T, U> {}
class Cchild3<T, U extends T> extends Cparent<T, U> {}

/* 類別綁定介面，且介面為泛用介面的狀況 */
// MyLinkedList 為普通類別，綁定 LinkedList<T>
// class MyLinkedList implements LinkedList<T> {}

// MyGenericLinkedList 為泛用類別，綁定 LinkedList<T>
// class MyGenericLinkedList<T> implements LinkedList<T> {}

// 實踐 LinkedListNode<T> 介面
class GenericLinkedListNode<T> implements LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null;

  constructor(public value: T) {}
}

// 實踐 LinkedList<T> 介面
class GenericLinkedList<T> implements LinkedList<T> {
  public head: LinkedListNode<T> | null = null;

  public length() {
    // 如果連 head Node 都為 null 就代表沒有長度
    if (this.head === null) return 0;

    let count = 0;
    let currentNode: LinkedListNode<T> | null = this.head;

    // 使用 while-loop 進行計算 LinkedList 長度的迭代
    while(currentNode !== null) {
      currentNode = currentNode.next;
      count++;
    }
    return count;
  }

  public at(index: number): LinkedListNode<T> | null {
    const length = this.length();

    // 如果長度小於 index 則無條件視為 out of bound，
    // 直接丟出 Error
    //
    // index 由 0 開始計算，跟陣列的概念一模一樣
    // 如：
    // - 長度為 0 的鏈結串列，index 為 0 必須丟出 error
    // - 長度為 3 的鏈結串列，index 為 2 是最後一個值，
    //   但 3 以上則必須丟出 error 
    if (index >= length) throw new Error('Index out of bound');

    // 以下取得實際的 LinkedListNode 值
    let currentIndex = 0;
    let currentNode = this.head as LinkedListNode<T>;
    while (currentIndex !== index) {
      currentNode = currentNode.next as LinkedListNode<T>;
      currentIndex++; 
    }

    return currentNode;
  }

  public insert(index: number, value: T) {
    const length = this.length();
    const newNode = new GenericLinkedListNode(value);

    // 如果長度小於 index 值就選擇丟出 'Out of bound' Error
    if (length < index) throw new Error('Index out of bound');

    // 但是若剛好等於 index 值，代表要插入新的節點
    else if (length === index) {
      if (index === 0) {
        this.head = newNode;
      } else {
        const node = this.at(index - 1) as LinkedListNode<T>;
        node.next = newNode;  
      }
    }

    // 長度大於 index 值，就代表從中插入新的 LinkedListNode
    else {
      if (index === 0) {
        const originalHead = this.head;
        this.head = newNode;
        this.head.next = originalHead;
      } else {
        const prevNode = this.at(index - 1) as LinkedListNode<T>;
        const originalNode = prevNode.next as LinkedListNode<T>;
        prevNode.next = newNode;
        newNode.next = originalNode;
      }
    }
  }

  public remove(index: number): void {
    // 由讀者自行試試看
    throw new Error("Method not implemented.");
  }

  public getInfo() {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null) {
      console.log(`Index ${currentIndex}: ${currentNode.value}`);
      currentNode = currentNode.next;
      currentIndex++;
    }
  }
}

// 宣告一個新的鏈結串列，型別參數的值為 number 型別
const l = new GenericLinkedList<number>();

// 插入 123 在 index = 0 的位置，此時鏈結串列為：
// [123]
l.insert(0, 123);

// 插入 456 在 index = 1 的位置，此時鏈結串列為：
// [123] -> [456]
l.insert(1, 456);

// 插入 789 在 index = 2 的位置，此時鏈結串列為：
// [123] -> [456] -> [789]
l.insert(2, 789);

// 插入 12321 在 index = 1 的位置，此時鏈結串列為：
// [123] -> [12321] -> [456] -> [789]
l.insert(1, 12321);

// 檢視結果
// l.getInfo();

// 檢視鏈結串列中 index = 0 ~ 3 的元素之值：
// 由於我們確定 l.at(index) where index = 0 ~ 3
// 100% 絕對是 LinkedListNode<number>，而非 null，
// 因此採取顯性註記的動作
// console.log((l.at(0) as LinkedListNode<number>).value);
// console.log((l.at(1) as LinkedListNode<number>).value);
// console.log((l.at(2) as LinkedListNode<number>).value);
// console.log((l.at(3) as LinkedListNode<number>).value);

// 如果超出範圍應該會直接彈出錯誤訊息，這裡用 try...catch...
// 來確認是否有觸發 Out of bound ... 訊息
try {
  l.at(4);
} catch(err) {
  // console.log('Out of bound error caught');
}

// 建立 GenericLinkedList 物件但是不指派型別值到型別參數
// const unspecifiedTypeParamLinkedList = new GenericLinkedList();

// 建立 GenericLinkedList 物件，並且有指派型別值到型別參數
// const specifiedTypeParamLinkedList = new GenericLinkedList<Tany>();

interface Iterator<T> {
  // 事實上原著還有多一個 first 方法代表取得聚合物的第一個值，不過
  // 筆者認為本篇沒有需求，因此選擇不設定為 Iterator<T> 的規格
  // first(): T | null;

  // next 方法為巡訪下一個元素，輸出為 void 的理由則是因為，如果想要
  // 讀取該迭代器的內容，你必須使用 currentItem 這個屬性
  next(): void;

  // 確認迭代器是否到終點
  isDone(): boolean;

  // 迭代器目前迭代到的值，也可能為 null 也說不定
  currentItem: T | null;
}

interface Iterable<T> {
  // 為 Factory Method，專門創建對應的 Iterator<T> 物件
  createIterator(): Iterator<T>;
}

// 建立普通的 Iterator，傳入陣列型資料並進行普通迭代
class NormalIterator<T> implements Iterator<T> {
  public currentItem: T | null = null;
  private currentIndex = 0;

  constructor(private items: Array<T>) {
    this.currentItem = items[0];
  }

  public isDone() {
    // 若 index 值超出 items 大小範圍則代表迭代結束
    return this.currentIndex > this.items.length - 1;
  }

  public next() {
    // 如果早就 isDone，就拋出 Out of bound 相關的錯誤訊息
    if (this.isDone()) throw new Error('Iterator out of bound.');

    // 正常迭代到下個元素
    this.currentIndex++;
    this.currentItem = this.items[this.currentIndex];
  }
}

// 建立 MyArray，不過跟 Array 本身差不多，只是多實踐了
// Iterable<T> 介面
class MyArray<T> implements Iterable<T> {
  constructor(public items: Array<T>) {}

  // 此為 Factory Method，專門建立 MyArray 的迭代器
  createIterator() {
    return new NormalIterator<T>(this.items);
  }
}

// 建立一個簡單的聚合物
let aCollection = new MyArray<number>([1, 2, 3, 4, 5]);

// 建立該聚合物的迭代器
let anIterator = aCollection.createIterator();

// 迴圈遍歷該迭代器
// while(!anIterator.isDone()) {
//   console.log(`Iterated value: ${anIterator.currentItem}`);
//   anIterator.next();
// }

// 如果硬要在呼叫 next，就會觸發 Out of bound 錯誤
// try {
//   anIterator.next();
// } catch (err) {
//   console.log('Out of bound error caught!');
// }

class IterableLinkedList<T>
  extends GenericLinkedList<T>
  implements Iterable<T> {
    // 實踐建立迭代器的工廠方法
    public createIterator() {
      // 記得：空陣列是必須積極註記的案例
      const elements: Array<T> = [];

      let currentNode = this.head;
      while (currentNode !== null) {
        elements.push(currentNode.value);
        currentNode = currentNode.next;
      }

      return new NormalIterator(elements);
    }
  }

// 任何為 Iterator<T> 型別的東西都可以被遍歷
function foreach<T>(iter: Iterator<T>, callback: (v: T) => void) {
  while(!iter.isDone()) {
    callback(iter.currentItem as T);
    iter.next();
  }
}


// 建立兩種不同的聚合物
let collection1 = new MyArray([1, 2, 3]);
let collection2 = new IterableLinkedList<number>();
collection2.insert(0, 1);
collection2.insert(1, 2);
collection2.insert(2, 3);

// 建立兩種相同的迭代器來各自不同的聚合物
let iter1 = collection1.createIterator();
let iter2 = collection2.createIterator();

// 兩個迭代器儘管來源不同，但都可以動作
// foreach(iter1, v => console.log(`v from collection1: ${v}`));
// foreach(iter2, v => console.log(`v from collection2: ${v}`));

/* 陽春版的 BinaryTree 與 TreeNode 的實踐 */
// BinaryTree 為主要的二元樹物件
class BinaryTree<T> implements Iterable<T> {
  constructor(public root: TreeNode<T>) {}

  // 宣告前序走訪的成員方法
  public preorderTraversal(callback: (el: TreeNode<T>) => void) {
    this.preorderRecursive(this.root, callback);
  }

  // 此為 private 成員，目的是用遞迴實現前序走訪
  private preorderRecursive(
    node: TreeNode<T>,
    callback: (el: TreeNode<T>) => void
  ) {
    callback(node);
    if (node.leftNode !== null) {
      this.preorderRecursive(node.leftNode, callback);
    }
    
    if (node.rightNode !== null) {
      this.preorderRecursive(node.rightNode, callback);
    }
  }

  // 實踐 Iterable<T> 的介面
  public createIterator() {
    const elements: Array<T> = [];

    // 使用 preorderTraversal 將值都丟進陣列
    this.preorderTraversal(node => {
      elements.push(node.value);
    });

    // 建構迭代器
    return new NormalIterator(elements);
  }
}

// TreeNode 為樹裡面的節點
class TreeNode<T> {
  public leftNode: TreeNode<T> | null = null;
  public rightNode: TreeNode<T> | null = null;
  public parent: TreeNode<T> | null = null;

  constructor(public value: T) {}

  // 存值方法 —— 存放左節點
  set left(value: T) {
    this.leftNode = new TreeNode(value);

    // 順便對子節點進行父子關係的連結
    this.leftNode.parent = this;    
  }

  // 存值方法 —— 存放右節點
  set right(value: T) {
    this.rightNode = new TreeNode(value);

    // 順便對子節點進行父子關係的連結
    this.rightNode.parent = this;    
  }
}

// 宣告 TN 為 TreeNode<number> 的化名
type TN = TreeNode<number>;

// 建構樹的根節點外，將該節點設為二元樹的點
const root = new TreeNode(1);
const aBTree = new BinaryTree(root);

// 建構樹的內部結構
root.left = 2;
(root.leftNode as TN).left = 3;
(root.leftNode as TN).right = 4;
((root.leftNode as TN).rightNode as TN).left = 5;

root.right = 6;
(root.rightNode as TN).left = 7;
((root.rightNode as TN).leftNode as TN).left = 8;
((root.rightNode as TN).leftNode as TN).right = 9;
(((root.rightNode as TN).leftNode as TN).rightNode as TN).left = 10;

// 一般使用手法
console.log('Normal Usage:');
const valueCumulation1: Array<number> = [];

aBTree.preorderTraversal(n => valueCumulation1.push(n.value));
console.log(valueCumulation1);

// 多型巡訪下的手法
console.log('Polymorphic Iteration:');
const valueCumulation2: Array<number> = [];
const aBTreeIter = aBTree.createIterator();

foreach(aBTreeIter, v => valueCumulation2.push(v));
console.log(valueCumulation2);
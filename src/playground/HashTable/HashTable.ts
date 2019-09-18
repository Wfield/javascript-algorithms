import LinkedList from '../LinkedList/LinkedList';
// import './ArrayPolyfill';

const defaultHashTableSize = 32;

export default class HashTable {

  buckets: Array<LinkedList>; // 每个 hash key 对应的值都是一个链表
  keys: object;

  constructor(hashTableSize: number = defaultHashTableSize) {
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
    this.keys = {};
  }

  // 生成 hash key 和访问每个 bucket 的 索引 对应关系
  hash(key: string):number {
    // 本例中的关系是：取 key 的每个字母的编码之和并 % 上 size

    const hash = Array.from(key).reduce((accumulator, curr) => {
      return accumulator + curr.charCodeAt(0);
    }, 0);

    return hash % this.buckets.length;
  }

  set(key: string, value: any):void {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash]; // 由于生成的 keyHash 的范围在 [0, this.buckets.length）之间，所以一定会对应一个 bucket
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });
    if(!node) {
      bucketLinkedList.append({key, value});
    } else {
      node.value.value = value;
    }
  }

  delete(key: string):any {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });
    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key: string):any {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if(!node) {
      return undefined;
    }

    return node.value.value;
  }

  has(key: string):boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys():string[] {
    return Object.keys(this.keys);
  }
}

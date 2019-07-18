import LinkedList from '../LinkedList/LinkedList';
import LinkedListNode from '../LinkedList/LinkedListNode'

export default class Stack {

  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): string {
    if(!this.linkedList.head) {
      return null;
    } else {
      return this.linkedList.head.value;
    }
  }

  push(value: string): LinkedListNode {
    return this.linkedList.prepend(value);
  }

  pop() {
    return this.linkedList.deleteHead();
  }

  toArray(): any[] {
    return this.linkedList.toArray();
  }

  toString(callback?: any): string {
    return this.linkedList.toString(callback);
  }
}

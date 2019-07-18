import LinkedList from '../LinkedList/LinkedList';

export default class Queue {

  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek() {
    if(!this.linkedList.head) {
      return null;
    } else {
      return this.linkedList.head.value;
    }
  }

  enqueue(value: string) {
    return this.linkedList.append(value);
  }

  dequeue() {
    if(!this.linkedList.head) {
      return null;
    }
    
    const headValue = this.linkedList.head.value;
    this.linkedList.head = this.linkedList.head.next;

    return headValue;
  }

  toString(callback?: any) {
    return this.linkedList.toString(callback);
  }
}

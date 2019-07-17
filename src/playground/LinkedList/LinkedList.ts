import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;
  compare: Comparator;

  constructor(comparatorFunction?: any) {
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: string) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if(!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  append(value: string) {
    const newNode = new LinkedListNode(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode
  }

  delete(value: string) {
    if(!this.head) {
      return null;
    }

    let deleteNode = null;
    while(this.head && this.compare.equal(this.head.value, this.head)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if(currentNode !== null) {
      while(currentNode.next) {
        if(currentNode.next && this.compare.equal(currentNode.next.value, currentNode)){
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
          break;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if(this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }
  
  find({ value, callback}: { value: string, callback: any }) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;

    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode;
      }

      if(value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deleteTail = this.tail;
    if(this.head === this.tail) {
      this.head = null;
      this.tail ==null;

      return deleteTail;
    }

    let currentNode = this.head;
    while(currentNode.next) {
      if(!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deleteTail;
  }

  deleteHead() {
    if(!this.head) {
      return null;
    }

    const deleteNode = this.head;
    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteNode;
  }

  fromArray(values: Array<string>) {
    values.forEach(value => this.append(value));

    return this;
  }

  toArray() {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    const nodes = [];
    while(currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback: any) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while(currNode) {
      nextNode = currNode.next;
      
      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

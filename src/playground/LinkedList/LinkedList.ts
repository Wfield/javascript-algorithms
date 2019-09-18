import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;
  compare: Comparator;

  constructor(comparatorFunction?: any) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: any): LinkedListNode {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if(!this.tail) {
      this.tail = newNode;
    }
    return newNode;
  }

  append(value: any): LinkedList {
    const newNode = new LinkedListNode(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode
    
    return this;
  }

  delete(value: any) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }
  
  find({ value, callback}: { value?: any, callback: any }) {
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

  deleteHead(): LinkedListNode {
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

  toArray(): any[] {
    if(!this.head) {
      return [];
    }

    let currentNode = this.head;
    const nodes = [];
    while(currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: any) {
    return this.toArray().map(node => node.toString()).toString();
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

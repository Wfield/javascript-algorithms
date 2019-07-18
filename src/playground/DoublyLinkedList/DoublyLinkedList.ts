import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class DoublyLinkedList {

  head: DoublyLinkedListNode;
  tail: DoublyLinkedListNode;
  comparator: Comparator;

  constructor(comparatorFunction?: any) {
    this.head = null;
    this.tail = null;
    this.comparator = new Comparator(comparatorFunction);
  }

  prepend(value: string) {
    let newNode = new DoublyLinkedListNode(value, this.head);

    if(this.head) {
      this.head.previous = newNode;
    }

    this.head = newNode;

    if(!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: string) {
    let newNode = new DoublyLinkedListNode(value, undefined, this.tail);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;

    return this;
  }

  delete(value: string) {
    if(!this.head) {
      return null
    }

    let deleteNode = null;
    let currentNode = this.head;

    while(currentNode) {
      if(this.comparator.equal(currentNode.value, value)) {
        deleteNode = currentNode;

        if(deleteNode === this.head) {
          this.head.previous = null;
          this.head = this.head.next;

          if(deleteNode === this.tail) {
            this.tail = null;
          }
        } else if(deleteNode === this.tail) {
          this.tail = this.tail.previous;
          this.tail.next = null;

          if(deleteNode === this.head) {
            this.head = null;
          }
        } else {
          let prevNode = currentNode.previous;
          let nextNode = currentNode.next;
          prevNode.next = nextNode;
          nextNode.previous = prevNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deleteNode;
  }

  find({ value, callback }: { value: string, callback: any}) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head
    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode;
      }

      if(this.comparator.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    let deleteNode = this.tail;

    if(this.head === this.tail) {
      this.head = null;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deleteNode;

  }

  deleteHead() {
    let deleteNode = this.head;

    if(this.head === this.tail) {
      this.tail = null;
    }

    this.head = this.head.next;
    this.head.previous = null;

    return deleteNode;
  }

  toArray() {
    let nodes = [];
    let currNode = this.head;
    while(currNode) {
      nodes.push(currNode.value);
      currNode = currNode.next;
    }

    return nodes;
  }

  fromArray(values: Array<string>) {
    values.map(val => this.append(val));

    return this;
  }

  toString(callback?: any) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while(currNode) {
      prevNode = currNode.previous;
      nextNode = currNode.next;

      currNode.previous = nextNode;
      currNode.next = prevNode;

      currNode = currNode.previous;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

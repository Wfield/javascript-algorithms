export default class DoublyLinkedListNode {
  value: string;
  next: any;
  previous: any;

  constructor(value: string, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?: any) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

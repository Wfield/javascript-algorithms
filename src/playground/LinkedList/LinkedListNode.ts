export default class LinkedListNode {
  value: string;
  next: any;

  constructor(value: string, next: any = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

import Comparator from '../../utils/comparator/Comparator';

export default class Heap {

  heapContainer: Array<Heap>;
  comparator: Comparator;

  constructor(comparatorFunction?) {
    if(new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    this.heapContainer = [];
    this.comparator = new Comparator(comparatorFunction);
  }

  getLeftChildIndex(parentIndex:number):number {
    return (2 * parentIndex) + 1; // heap 树的索引从根节点引索 0 开始，依次是 1，2，3....
  }

  getRightChildIndex(parentIndex:number):number {
    return (2 * parentIndex ) + 2;
  }

  getParentIndex(childIndex:number):number {
    return Math.floor((childIndex -1)/2);
  }

  hasParent(childIndex:number):boolean {
    return Math.floor((childIndex -1)/2) >= 0;
  }

  hasLeftChild(parentIndex:number):boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex:number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex:number):any {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex:number):any {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex:number):any {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo):void {
    const temp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = temp;
  }

  peek():any {
    return this.heapContainer[0] || null;
  }

  /**
   * 返回堆顶节点，同时将其从堆中取出，类似于 pop
   * 通常的做法是将堆顶节点与末尾节点对调，取出末尾节点后将新的堆顶节点与其子节点不断比较和对调，直到将其置于正确的位置中
   */
  poll():any {
    if(this.heapContainer.length === 0) {
      return null;
    } else if(this.heapContainer.length == 1) {
      return this.heapContainer.pop();
    } else {
      const item = this.heapContainer[0];

      this.heapContainer[0] = this.heapContainer.pop();

      this.heapifyDown();

      return item;
    }
  }

  add(item):Heap {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item:any, comparator:Comparator = this.comparator):Heap {
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for(let iteration = 0; iteration < numberOfItemsToRemove; iteration ++) {
      const indexToRemove = this.find(item, comparator).pop();

      if(indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        const parentItem = this.parent(indexToRemove);
        if(this.hasLeftChild(indexToRemove) && (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  find(item:any, comparator:Comparator = this.comparator):Array<any> {
    const findItemIndics = [];

    for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex ++) {
      if(comparator.equal(item, this.heapContainer[itemIndex])) {
        findItemIndics.push(itemIndex);
      }
    }

    return findItemIndics;
  }

  isEmpty():boolean {
    return !this.heapContainer.length;
  }

  toString():string {
    return this.heapContainer.toString();
  }

  /**
   * 将子节点和父节点不断比较和对调，直到将其置于正确的位置
   */
  heapifyUp(customStartIndex?:number) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while(this.hasParent(currentIndex) && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * 将变换过后的新的父节点逾期子节点不断比较和对调，直到将其置于正确的位置中
   */
  heapifyDown(customStartIndex:number = 0):void {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while(this.hasLeftChild(currentIndex)) {
      if(this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if(this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement):boolean {
    console.log('heap');
    return this.comparator.lessThanOrEqual(firstElement, secondElement);
  }
}

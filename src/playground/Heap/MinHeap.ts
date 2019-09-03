import Heap from './Heap';

export default class MinHeap extends Heap {

  pareseInCorrectOrder(firstElement:any, secondElement:any):boolean {
    return this.comparator.lessThanOrEqual(firstElement, secondElement);
  }
}

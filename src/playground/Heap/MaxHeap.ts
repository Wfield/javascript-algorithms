import Heap from './Heap';

export default class MaxHeap extends Heap {

  parseInCorrectOrder(firstElement:any, secondElement:any):boolean {
    return this.comparator.greaterThanOrEqual(firstElement, secondElement);
  }
}

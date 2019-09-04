import Heap from './Heap';

export default class MinHeap extends Heap {

  pairIsInCorrectOrder(firstElement:any, secondElement:any):boolean {
    return this.comparator.lessThanOrEqual(firstElement, secondElement);
  }
}

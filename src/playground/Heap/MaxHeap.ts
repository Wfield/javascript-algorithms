import Heap from './Heap';

export default class MaxHeap extends Heap {

  // 重写基类 Heap 的 pairIsInCorrectOrder 方法
  pairIsInCorrectOrder(firstElement:any, secondElement:any):boolean {
    return this.comparator.greaterThanOrEqual(firstElement, secondElement);
  }
}

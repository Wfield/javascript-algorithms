import MinHeap from '../Heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

export default class PriorityQueue extends MinHeap {

  priorities: Map<any, number>;
  compare: Comparator;

  constructor() {
    super();

    this.priorities = new Map();

    this.compare = new Comparator(this.comparePriority.bind(this));

  }

  add(item:any, priority:number = 0):PriorityQueue {
    this.priorities.set(item, priority);
    this.add(item);
    return this;
  }

  remove(item:any, customFindingComparator:Comparator):PriorityQueue {
    this.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  changePriority(item:any, priority:number):PriorityQueue {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  findByValue(item:any):number[] {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item:any):boolean {
    return this.findByValue(item).length > 0;
  }

  comparePriority(a:any, b:any):number {
    if(this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    } else {
      return this.priorities.get(a) > this.priorities.get(b) ? 1 : -1;
    }
  }

  compareValue(a:any, b:any):number {
    if(a === b) {
      return 0;
    } else {
      return a > b ? 1 : -1;
    }
  }
}

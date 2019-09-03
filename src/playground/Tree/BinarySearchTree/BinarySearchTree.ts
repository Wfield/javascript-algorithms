import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree {

  root: BinarySearchTreeNode;
  nodeComparator: any;

  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

    this.nodeComparator = this.root.nodeComparator;
  }

  insert(value:any):BinarySearchTreeNode {
    return this.root.insert(value);
  }

  contains(value:any): boolean {
    return this.root.contains(value);
  }

  remove(value:any):boolean {
    return this.root.remove(value);
  }

  toString():string {
    return this.root.toString();
  }
}

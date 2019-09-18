import BinarySearchTree from '../BinarySearchTree/BinarySearchTree';
import BinarySearchTreeNode from '../BinarySearchTree/BinarySearchTreeNode';

export default class AvlTree extends BinarySearchTree {

  insert(value:any):BinarySearchTreeNode {
    let insertValue = super.insert(value);

    let currentNode = this.root.find(value);
    while(currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }

    return insertValue;
  }

  remove(value:any):boolean {
    let removeFlag = super.remove(value);

    this.balance(this.root);

    return removeFlag;
  }

  balance(node:BinarySearchTreeNode):void {
    if(node.balanceFactor > 1) {
      if(node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node);
      } else if(node.left.balanceFactor < 0) {
        this.rotateLeftRight(node);
      }
    } else if(node.balanceFactor < -1) {
      if(node.right.balanceFactor < 0) {
        this.rotateRightRight(node);
      } else if(node.right.balanceFactor > 0) {
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(rootNode:BinarySearchTreeNode):void {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    if(rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if(rootNode === this.root) {
      this.root = leftNode;
    }

    if(leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    leftNode.setRight(rootNode);
  }

  rotateLeftRight(rootNode:BinarySearchTreeNode):void {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);
    
    if(leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    rootNode.setLeft(leftRightNode);

    leftRightNode.setLeft(leftNode);

    this.rotateLeftLeft(rootNode);
  }

  rotateRightLeft(rootNode:BinarySearchTreeNode):void {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setRight(null);

    if(rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    rootNode.setRight(rightLeftNode);

    rightLeftNode.setRight(rightNode);

    this.rotateRightRight(rootNode);
  }

  rotateRightRight(rootNode:BinarySearchTreeNode):void {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    if(rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if(rootNode == this.root) {
      this.root = rightNode;
    }

    if(rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    rightNode.setLeft(rootNode);
  }
}

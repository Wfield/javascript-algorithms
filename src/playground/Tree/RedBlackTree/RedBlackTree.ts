import BinaryTreeNode from '../BinaryTreeNode';
import BinarySearchTree from '../BinarySearchTree/BinarySearchTree';
import BinarySearchTreeNode from '../BinarySearchTree/BinarySearchTreeNode';

enum colors {
  red,
  black,
}

const COLOR_PROP_NAME: string = 'color';

export default class RedBlackTree extends BinarySearchTree {

  insert(value):BinarySearchTreeNode {
    const insertedNode = super.insert(value);

    if(this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode);
    } else {
      this.makeNodeRed(insertedNode);
    }

    this.balance(insertedNode);

    return insertedNode;
  }

  balance(node:BinarySearchTreeNode) {
    // if it is a root node then nothing to balance here
    if(this.nodeComparator.equal(node, this.root)) {
      return;
    }

    // if the parent is black then done, Nothing to balance here
    if(this.isNodeBlack(node.parent)) {
      return;
    }

    const grandParent = node.parent.parent;

    if(node.uncle && this.isNodeRed(node.uncle)) {
      // if node has red uncle the we need to do RECOLORING

      // Recolor parent and uncle to black
      this.makeNodeBlack(node.uncle);
      this.makeNodeBlack(node.parent);

      if(!this.nodeComparator.equal(grandParent, this.root)) {
        // Recolor grand-parent to red if it is not root
        this.makeNodeRed(grandParent);
      } else {
        // if grand-parent is black root don't do anything
        // Since root already has two black sibling that we've just recolored
        return;
      }

      // Now do further checking for recolored grand-parent
      this.balance(grandParent);
    } else if(!node.uncle || this.isNodeBlack(node.uncle)) {
      // If node uncle is black or absent then we need to do ROTATIONS

      if(grandParent) {
        // Grand parent that we will receive after rotations
        let newGrandParent;

        if(this.nodeComparator.equal(grandParent.left, node.parent)) {
          // left case
          if(this.nodeComparator.equal(grandParent.left, node.parent)) {
            // left-left case
            newGrandParent = this.leftLeftRotation(grandParent);
          } else {
            // left-right case
            newGrandParent = this.leftRightRotation(grandParent);
          }
        } else {
          // Right case
          if(this.nodeComparator.equal(node.parent.right, node)) {
            // right-right case
            newGrandParent = this.rightRightRotation(grandParent);
          } else {
            // right-left case
            newGrandParent = this.rightLeftRotation(grandParent);
          }
        }

        // Set newGrandParent as a root if it dosen't have parent
        if(newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent;

          // Recolor root into black
          this.makeNodeBlack(this.root);
        }

        // Check if new grand parent don't violate red-black-tree rules
        this.balance(newGrandParent);
      }
    }
  }

  leftLeftRotation(grandParentNode:BinarySearchTreeNode|BinaryTreeNode):BinarySearchTreeNode {
    // Memorize the parent of grand-parent node.
    const grandGrandParent = grandParentNode.parent;

    // Check what type of sibling is our grandParentNode is (left or right).
    let grandParentNodeIsLeft;
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(grandGrandParent.left, grandParentNode);
    }

    // Memorize grandParentNode's left node.
    const parentNode = grandParentNode.left;

    // Memorize parent's right node since we're going to transfer it to
    // grand parent's left subtree.
    const parentRightNode = parentNode.right;

    // Make grandParentNode to be right child of parentNode.
    parentNode.setRight(grandParentNode);

    // Move child's right subtree to grandParentNode's left subtree.
    grandParentNode.setLeft(parentRightNode);

    // Put parentNode node in place of grandParentNode.
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode);
      } else {
        grandGrandParent.setRight(parentNode);
      }
    } else {
      // Make parent node a root
      parentNode.parent = null;
    }

    // Swap colors of granParent and parent nodes.
    this.swapNodeColors(parentNode, grandParentNode);

    // Return new root node.
    return parentNode;
  }

  leftRightRotation(grandParentNode: BinarySearchTreeNode | BinaryTreeNode): BinarySearchTreeNode {
    // Memorize left and left-right nodes.
    const parentNode = grandParentNode.left;
    const childNode = parentNode.right;

    // We need to memorize child left node to prevent losing
    // left child subtree. Later it will be re-assigned to
    // parent's right sub-tree.
    const childLeftNode = childNode.left;

    // Make parentNode to be a left child of childNode node.
    childNode.setLeft(parentNode);

    // Move child's left subtree to parent's right subtree.
    parentNode.setRight(childLeftNode);

    // Put left-right node in place of left node.
    grandParentNode.setLeft(childNode);

    // Now we're ready to do left-left rotation.
    return this.leftLeftRotation(grandParentNode);
  }

  rightRightRotation(grandParentNode:BinarySearchTreeNode|BinaryTreeNode):BinarySearchTreeNode {
    // Memorize the parent of grand-parent node
    const grandGrandParent = grandParentNode.parent;

    // Check what type of sibling is our grandParentNode is (left or right)
    let grandParentNodeIsLeft;
    if(grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(grandGrandParent.lefe, grandParentNode);
    }

    // Memorize grandParentNode's right node
    const parentNode= grandParentNode.right;

    // Memorize parent's left Node since we're going to transfer it to
    // grand parent's right subtree
    const parentLeftNode = parentNode.left;

    // Make grandParentNode to be left child of parentNode
    parentNode.setLeft(grandParentNode);

    // Transfer all left nodes from parent to right sub-tree of grandparent
    grandParentNode.setRight(parentLeftNode);

    // Put parentNode node in place of grandParentNode
    if(grandGrandParent) {
      if(grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode);
      } else {
        grandGrandParent.setRight(parentNode);
      }
    } else {
      // Malke parent node a root
      parentNode.parent = null;
    }

    // Swap colors of grandPreant and parent nodes
    this.swapNodeColors(parentNode, grandParentNode);

    // Return new root node
    return parentNode;
  }

  rightLeftRotation(grandParentNode:BinarySearchTreeNode|BinaryTreeNode): BinarySearchTreeNode {
    // Memorize right and right-left nodes.
    const parentNode = grandParentNode.right;
    const childNode = parentNode.left;

    // We need to memorize child right node to prevent losing
    // right child subtree. Later it will be re-assigned to
    // parent's left sub-tree.
    const childRightNode = childNode.right;

    // Make parentNode to be a right child of childNode.
    childNode.setRight(parentNode);

    // Move child's right subtree to parent's left subtree.
    parentNode.setLeft(childRightNode);

    // Put childNode node in place of parentNode.
    grandParentNode.setRight(childNode);

    // Now we're ready to do right-right rotation.
    return this.rightRightRotation(grandParentNode);
  }

  makeNodeRed(node:BinarySearchTreeNode|BinaryTreeNode): BinarySearchTreeNode|BinaryTreeNode {
    node.meta.set(COLOR_PROP_NAME, colors[0]);

    return node;
  }

  makeNodeBlack(node:BinarySearchTreeNode|BinaryTreeNode): BinarySearchTreeNode|BinaryTreeNode {
    node.meta.set(COLOR_PROP_NAME, colors[1]);

    return node;
  }

  isNodeRed(node:BinarySearchTreeNode|BinaryTreeNode):boolean {
    return node.meta.get(COLOR_PROP_NAME) === colors[0];
  }

  isNodeBlack(node:BinarySearchTreeNode|BinaryTreeNode):boolean {
    return node.meta.get(COLOR_PROP_NAME) === colors[1];
  }

  isNodeColored(node:BinarySearchTreeNode|BinaryTreeNode):boolean {
    return this.isNodeRed(node) || this.isNodeBlack(node);
  }

  swapNodeColors(firstNode: BinarySearchTreeNode|BinaryTreeNode, secondNode: BinarySearchTreeNode|BinaryTreeNode) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME);
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME);

    firstNode.meta.set(COLOR_PROP_NAME, secondColor);
    secondNode.meta.set(COLOR_PROP_NAME, firstColor);
  }
}
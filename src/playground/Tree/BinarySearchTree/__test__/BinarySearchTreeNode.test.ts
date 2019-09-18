import BinarySearchTreeNode from '../BinarySearchTreeNode';

describe('BinarySearchTreeNode', () => {
  it('create binary search tree node ', () => {
    const node = new BinarySearchTreeNode(8);

    expect(node.value).toBe(8);
  });

  it('should insert a node with specific value', () => {
    const node = new BinarySearchTreeNode(8);
    node.insert(3);
    node.insert(10);

    expect(node.left.value).toBe(3);
    expect(node.right.value).toBe(10);
  });

  it('should find a value', () => {
    const node = new BinarySearchTreeNode(8);
    node.insert(3);
    node.insert(10);
    node.insert(2);
    node.insert(6);
    node.insert(7);
    node.insert(4);
    node.insert(14);

    expect(node.find(4).parent.value).toBe(6);
  });

  it('should contain a value', () => {
    const node = new BinarySearchTreeNode(8);
    node.insert(3);
    node.insert(10);
    node.insert(2);
    node.insert(6);
    node.insert(7);
    node.insert(4);
    node.insert(14);

    expect(node.contains(4)).toBe(true);
  });

  it('should remove a value and reset the tree', () => {
    const node = new BinarySearchTreeNode(8);
    node.insert(3);
    node.insert(10);
    node.insert(2);
    node.insert(6);
    node.insert(7);
    node.insert(4);
    node.insert(14);

    expect(node.remove(6)).toBe(true);
    expect(node.toString()).toEqual("2,3,4,7,8,10,14");
  })

  it('should find the min node in the tree', () => {
    const node = new BinarySearchTreeNode(8);
    node.insert(3);
    node.insert(10);
    node.insert(2);
    node.insert(6);
    node.insert(7);
    node.insert(4);
    node.insert(14);
    expect(node.findMin().value).toBe(2);
  })
})
import BinarySearchTree from '../BinarySearchTree';

describe('BinarySearchTree', () => {
  it('should create a binary search tree', () => {
    const tree = new BinarySearchTree();
    
    expect(tree).toBeDefined();
    expect(tree.root).toBeDefined();
    expect(tree.root.value).toBeNull();
    expect(tree.root.left).toBeNull();
    expect(tree.root.right).toBeNull();
  });

  it('should insert value', () => {
    const tree = new BinarySearchTree();
    const node1 = tree.insert(8);
    const node2 = tree.insert(3);
    const node3 = tree.insert(10);

    expect(tree.toString()).toBe('3,8,10');
    expect(node1.left.value).toBe(3);
    expect(node1.right.value).toBe(10);
  });

  it('should tell if a value contains in the tree', () => {
    const tree = new BinarySearchTree();
    tree.insert(10);
    tree.insert(19);
    tree.insert(4);

    expect(tree.contains(4)).toBe(true);
    expect(tree.contains(18)).toBe(false);
  })

  it('should remove a node ', () => {
    const tree = new BinarySearchTree();
    tree.insert(10);
    tree.insert(19);
    tree.insert(4);
    tree.insert(7);
    tree.insert(8);

    expect(tree.remove(4)).toBe(true);
    expect(tree.toString()).toEqual('7,8,10,19');
    // expect(tree.remove(18)).toThrow();
  })
})
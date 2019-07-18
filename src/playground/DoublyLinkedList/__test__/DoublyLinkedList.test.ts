import DoublyLinkedList from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    expect(linkedList.toString()).toBe('');
  });

  it('should prepend node to list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.prepend('prepend');
    expect(linkedList.head.toString()).toBe('prepend');
  })

  it('should append node to list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.append('append');
    expect(linkedList.tail.toString()).toBe('append');
  })

  it('should delete the specific node', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.append('appendNode');
    const deleteNode = linkedList.delete('appendNode');
    expect(deleteNode.toString()).toBe('appendNode');
  })

  it('should convert array to node list', () => {
    const linkedList = new DoublyLinkedList();

    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    linkedList.fromArray(arr);
    
    expect(linkedList.toString()).toBe('a,b,c,d,e,f,g');
  })
})

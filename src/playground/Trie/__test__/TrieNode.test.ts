import TrieNode from '../TrieNode';

describe('TrieNode', () => {
  it('should create a trie node', () => {
    const tnode = new TrieNode('c', true);

    expect(tnode.character).toBe('c');
    expect(tnode.isComplete).toBe(true);
    expect(tnode.toString()).toBe('c*');
  });

  it('should add child node', () => {
    const tnode = new TrieNode('c');
    
    tnode.addChild('a', true);
    tnode.addChild('o');

    expect(tnode.toString()).toBe('c:a,o');
  });

  it('should get child nodes', () => {
    const tnode = new TrieNode('c');
    
    tnode.addChild('a');
    tnode.addChild('o');

    expect(tnode.getChild('a').toString()).toBe('a');
    expect(tnode.getChild('a').character).toBe('a');
    expect(tnode.getChild('o').toString()).toBe('o');
    expect(tnode.getChild('b')).toBeUndefined();
  });

  it('should check if node has specific child', () => {
    const tnode = new TrieNode('c');

    tnode.addChild('a');
    tnode.addChild('o');

    expect(tnode.hasChild('a')).toBe(true);
    expect(tnode.hasChild('o')).toBe(true);
    expect(tnode.hasChild('b')).toBe(false);
  });
  
  it('should suggest next children', () => {
    const tnode = new TrieNode('c');

    tnode.addChild('a');
    tnode.addChild('o');

    expect(tnode.suggestChildren()).toEqual(['a', 'o']);
  });

  it('should delete child node if the child node has No children', () => {
    const tnode = new TrieNode('c');

    tnode.addChild('a');
    expect(tnode.hasChild('a')).toBe(true);

    tnode.removeChild('a');
    expect(tnode.hasChild('a')).toBe(false);
  });

  it('should NOT delete child node if the child node has children', () => {
    const tnode = new TrieNode('c');

    tnode.addChild('a');
    expect(tnode.hasChild('a')).toBe(true);

    const cnode = tnode.getChild('a');
    cnode.addChild('r');
    expect(cnode.hasChild('r')).toBe(true);

    tnode.removeChild('a');
    expect(tnode.hasChild('a')).toBe(true);
  })
})
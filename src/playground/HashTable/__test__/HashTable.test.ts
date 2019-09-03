import HashTable from '../HashTable';

describe('HashTable', () => {
  it('should create a HashTable', () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.buckets.length).toBe(32);

    const hashTable = new HashTable(64);
    expect(hashTable.buckets.length).toBe(64);
  });
  
  it('should generate proper hash for specified key', () => {
    const hashTable = new HashTable();
    expect(hashTable.hash('a')).toBe(1);
    expect(hashTable.hash('abc')).toBe(6);
  })

  it('should set, read and delete data with collisions', () => {
    const hashTable = new HashTable(3);

    expect(hashTable.hash('a')).toBe(1);
    expect(hashTable.hash('b')).toBe(2);
    expect(hashTable.hash('c')).toBe(0);
    expect(hashTable.hash('d')).toBe(1);

    hashTable.set('a', 'sky-old');
    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');
    hashTable.set('d', 'ocean');

    // expect(hashTable.has('x')).toBe(false);
    // expect(hashTable.has('b')).toBe(true);
    // expect(hashTable.has('c')).toBe(true);

    // const stringifier = value => `${value.key}:${value.value}`;
    // expect(hashTable.buckets[0].toString(stringifier)).toBe('c:earth');
    // expect(hashTable.buckets[1].toString(stringifier)).toBe('a:sky,d:ocean');
    // expect(hashTable.buckets[2].toString(stringifier)).toBe('b:sea');

    // expect(hashTable.get('a')).toBe('shy');
    // expect(hashTable.get('b')).toBe('ocean');
    // expect(hashTable.get('x')).not.toBeDefined();

    // hashTable.delete('a');
    
    // expect(hashTable.delete('not-existing')).toBeNull();
    // expect(hashTable.get('a')).not.toBeDefined();
    // expect(hashTable.get('d')).toBe('ocean');

    // hashTable.set('d', 'ocean-new');
    // expect(hashTable.get('d')).toBe('ocean-new');
  })
})

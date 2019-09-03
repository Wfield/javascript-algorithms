import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should create a list of null', () => {
    const list = new LinkedList();

    expect(list.head).toBe(null);
  })

  it('should return a LinkedList with append value', () => {
    const list = new LinkedList();
    list.append('1');

    const resList = list.append({a: 'value'});
    expect(resList.tail.value.a).toBe('value');
  })
})

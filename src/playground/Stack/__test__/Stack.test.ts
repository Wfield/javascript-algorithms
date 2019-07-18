import Stack from '../Stack';

describe('Stack', () => {
  it('should create an empty stack', () => {
    const stack = new Stack();
    expect(stack.linkedList.head).toBe(null);
    expect(stack.isEmpty()).toBe(true);
  });

  it('should add a node at the head of stack', () => {
    const stack = new Stack();
    stack.push('first');
    expect(stack.peek()).toBe('first');

    stack.push('second');
    expect(stack.peek()).toBe('second');
  });


  it('should delete a node at the head of stack', () => {
    const stack = new Stack();
    stack.push('A');
    stack.push('B');
    stack.push('C');

    expect(stack.pop().value).toBe('C');
    expect(stack.peek()).toBe('B');
  });

  it('should return an array from the stack', () => {
    const stack = new Stack();

    stack.push('A');
    stack.push('B');
    stack.push('C');


    expect(stack.toArray().toString()).toBe('C,B,A');
  });
})

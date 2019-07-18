import Queue from '../Queue';

describe('Queue', () => {
  it('should create a queue', () => {
    const queue = new Queue();
    expect(queue.linkedList.head).toBe(null);
  })

  it('should create a empty queue', () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
  })

  it('should enqueue a value to the queue', () => {
    const queue = new Queue();
    queue.enqueue('enqueue');
    expect(queue.linkedList.head.value).toBe('enqueue');
  })

  it('should return the peek value of queue', () => {
    const queue= new Queue();
    queue.enqueue('enqueue');
    expect(queue.peek()).toBe('enqueue');
  })

  it('should dequeue the queue', () => {
    const queue = new Queue();
    queue.enqueue('first');
    queue.enqueue('second');

    expect(queue.dequeue()).toBe('first');
    expect(queue.linkedList.head.value).toBe('second');
  })
})

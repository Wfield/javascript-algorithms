import PriorityQueue from '../PriorityQueue';

describe('PriorityQueue', () => {
  it('should create a default priority queue', () => {
    const priority = new PriorityQueue();

    expect(priority).toBeDefined();
  })

  it('should insert items to the queue and respect priorities', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    expect(priorityQueue.peek()).toBe(10);

    priorityQueue.add(5, 2);
    expect(priorityQueue.peek()).toBe(10);

    priorityQueue.add(100, 0);
    expect(priorityQueue.peek()).toBe(100);
  })

  // it('should be possible to use object in priority queue', () => {
  //   const priorityQueue = new PriorityQueue();

  //   const user1 = { name: 'Mike' };
  //   const user2 = { name: 'Bill' };
  //   const user3 = { name: 'Jane' };

  //   priorityQueue.add(user1, 1);
  //   expect(priorityQueue.peek()).toBe(user1);

  //   priorityQueue.add(user2, 2);
  //   expect(priorityQueue.peek()).toBe(user1);

  //   priorityQueue.add(user3, 0);
  //   expect(priorityQueue.peek()).toBe(user3);
  // })
})

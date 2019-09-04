import Heap from '../Heap';

describe('Heap', () => {
  it('should not allow to create instance of the Heap directly', () => {
    const instantiateHeap = () => {
      const heap = new Heap();
      // heap.add(5);
    };

    // 期望是：如果创建的实例是 Heap 的实例，就会抛出错误
    expect(instantiateHeap).toThrow();
  });
});

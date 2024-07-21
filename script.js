function mincost(arr) {
    if (arr.length === 0) {
        return 0;
    }

    // Min-heap class implementation
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        size() {
            return this.heap.length;
        }

        insert(value) {
            this.heap.push(value);
            this._heapifyUp(this.heap.length - 1);
        }

        extractMin() {
            if (this.size() === 0) {
                throw new Error('Heap is empty');
            }
            const min = this.heap[0];
            const end = this.heap.pop();
            if (this.size() > 0) {
                this.heap[0] = end;
                this._heapifyDown(0);
            }
            return min;
        }

        _heapifyUp(index) {
            let parent = Math.floor((index - 1) / 2);
            while (index > 0 && this.heap[index] < this.heap[parent]) {
                [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
                index = parent;
                parent = Math.floor((index - 1) / 2);
            }
        }

        _heapifyDown(index) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.size() && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            if (rightChild < this.size() && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this._heapifyDown(smallest);
            }
        }
    }

    // Create a min-heap and add all ropes to it
    const minHeap = new MinHeap();
    for (const length of arr) {
        minHeap.insert(length);
    }

    let totalCost = 0;

    // Connect ropes until only one rope is left
    while (minHeap.size() > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    return totalCost;
}

module.exports = mincost;

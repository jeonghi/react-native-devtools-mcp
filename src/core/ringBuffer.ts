export class RingBuffer<T> {
  private readonly capacity: number;
  private readonly values: T[] = [];

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new Error('capacity must be >= 1');
    }
    this.capacity = capacity;
  }

  push(value: T): void {
    if (this.values.length === this.capacity) {
      this.values.shift();
    }
    this.values.push(value);
  }

  snapshot(limit?: number): T[] {
    if (!limit || limit >= this.values.length) {
      return [...this.values];
    }
    return this.values.slice(this.values.length - limit);
  }

  size(): number {
    return this.values.length;
  }
}

import { describe, expect, it } from 'vitest';
import { RingBuffer } from '../src/core/ringBuffer';

describe('RingBuffer', () => {
  it('keeps latest N items only', () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.push(4);
    expect(buf.snapshot()).toEqual([2, 3, 4]);
  });

  it('supports limit on snapshot', () => {
    const buf = new RingBuffer<number>(5);
    [1, 2, 3, 4, 5].forEach((n) => buf.push(n));
    expect(buf.snapshot(2)).toEqual([4, 5]);
  });
});

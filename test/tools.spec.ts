import { describe, expect, it } from 'vitest';
import {
  CDP_ALIAS_TOOLS,
  CORE_TOOL_NAMES,
  TOOL_NAMES,
} from '../src/server/tools';

describe('tool registration', () => {
  it('registers core and alias tool sets', () => {
    expect(TOOL_NAMES).toEqual([
      ...CORE_TOOL_NAMES,
      ...CDP_ALIAS_TOOLS.map((tool) => tool.name),
    ]);
  });

  it('has no duplicate tool names', () => {
    expect(new Set(TOOL_NAMES).size).toBe(TOOL_NAMES.length);
  });
});

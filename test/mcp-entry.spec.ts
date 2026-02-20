import { describe, expect, it } from 'vitest';
import { MCP_SERVER_INFO } from '../src/index';

describe('MCP entry', () => {
  it('exports server metadata', () => {
    expect(MCP_SERVER_INFO.name).toBe('rn-devtools-mcp');
    expect(MCP_SERVER_INFO.version).toMatch(/^0\.1\./);
  });
});

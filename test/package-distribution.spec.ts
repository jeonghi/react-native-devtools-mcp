import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(repoRoot, 'package.json');

type PackageJsonShape = {
  private?: boolean;
  bin?: Record<string, string>;
  files?: string[];
  main?: string;
  exports?: unknown;
  publishConfig?: {
    access?: string;
  };
};

function readPackageJson(): PackageJsonShape {
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJsonShape;
}

describe('package distribution metadata', () => {
  it('is configured for npx usage and npm publication', () => {
    const pkg = readPackageJson();

    expect(pkg.private).not.toBe(true);
    expect(pkg.bin?.['rn-devtools-mcp']).toBe('dist/index.js');
    expect(pkg.files).toEqual(expect.arrayContaining(['dist']));
    expect(pkg.main).toBe('dist/index.js');
    expect(pkg.publishConfig?.access).toBe('public');

    expect(pkg.exports).toEqual(
      expect.objectContaining({
        '.': expect.objectContaining({
          import: './dist/index.js',
        }),
      })
    );
  });
});

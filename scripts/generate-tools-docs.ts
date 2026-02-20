import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CDP_ALIAS_TOOLS, CORE_TOOL_NAMES } from '../src/server/tools';

type CoreToolName = (typeof CORE_TOOL_NAMES)[number];
type AliasTool = (typeof CDP_ALIAS_TOOLS)[number];

type CoreDoc = {
  name: CoreToolName;
  category: string;
  summary: string;
  inputs: string[];
  errors: string[];
};

const coreDocs: CoreDoc[] = [
  {
    name: 'rn_list_targets',
    category: 'Target & session',
    summary: 'List RN CDP targets from Metro inspector.',
    inputs: ['metroUrl?: string'],
    errors: ['RN_METRO_UNREACHABLE'],
  },
  {
    name: 'rn_connect',
    category: 'Target & session',
    summary: 'Connect to an RN target using targetId or WebSocket URL.',
    inputs: [
      'metroUrl?: string',
      'webSocketDebuggerUrl?: string',
      'targetId?: string',
      'sessionKey?: string',
    ],
    errors: ['RN_TARGET_NOT_FOUND', 'RN_WS_CONNECT_FAILED'],
  },
  {
    name: 'rn_disconnect',
    category: 'Target & session',
    summary: 'Disconnect and remove session state.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND'],
  },
  {
    name: 'rn_reconnect',
    category: 'Target & session',
    summary: 'Reconnect after reload/disconnect using target fingerprint matching.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_TARGET_NOT_FOUND'],
  },
  {
    name: 'rn_session_status',
    category: 'Target & session',
    summary: 'Return state, target metadata, capabilities, and buffer counts.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND'],
  },
  {
    name: 'rn_eval',
    category: 'Runtime & debugger control',
    summary: 'Run Runtime.evaluate in Hermes.',
    inputs: [
      'sessionKey: string',
      'expression: string',
      'awaitPromise?: boolean',
      'returnByValue?: boolean',
    ],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_INVALID_PARAMS', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_debugger_enable',
    category: 'Runtime & debugger control',
    summary: 'Enable Debugger domain.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_pause',
    category: 'Runtime & debugger control',
    summary: 'Pause JS execution.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_resume',
    category: 'Runtime & debugger control',
    summary: 'Resume JS execution.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_step_over',
    category: 'Runtime & debugger control',
    summary: 'Step over current statement.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_step_into',
    category: 'Runtime & debugger control',
    summary: 'Step into current call.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_step_out',
    category: 'Runtime & debugger control',
    summary: 'Step out of current frame.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_set_breakpoint_by_url',
    category: 'Runtime & debugger control',
    summary: 'Set breakpoint by url/line/column.',
    inputs: [
      'sessionKey: string',
      'url: string',
      'lineNumber: number',
      'columnNumber?: number',
      'condition?: string',
    ],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_INVALID_PARAMS', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_network_enable',
    category: 'Network & evidence',
    summary: 'Enable Network domain events.',
    inputs: ['sessionKey: string'],
    errors: ['RN_SESSION_NOT_FOUND', 'RN_CDP_COMMAND_FAILED'],
  },
  {
    name: 'rn_get_recent_console',
    category: 'Network & evidence',
    summary: 'Get buffered recent console events.',
    inputs: ['sessionKey: string', 'limit?: number'],
    errors: ['RN_SESSION_NOT_FOUND'],
  },
  {
    name: 'rn_get_recent_network',
    category: 'Network & evidence',
    summary: 'Get buffered recent network events.',
    inputs: ['sessionKey: string', 'limit?: number'],
    errors: ['RN_SESSION_NOT_FOUND'],
  },
  {
    name: 'rn_get_recent_exceptions',
    category: 'Network & evidence',
    summary: 'Get buffered recent runtime exception events.',
    inputs: ['sessionKey: string', 'limit?: number'],
    errors: ['RN_SESSION_NOT_FOUND'],
  },
  {
    name: 'rn_cdp_call',
    category: 'Generic CDP',
    summary: 'Send arbitrary CDP command to connected session.',
    inputs: ['sessionKey: string', 'method: string', 'params?: Record<string, unknown>'],
    errors: [
      'RN_SESSION_NOT_FOUND',
      'RN_CDP_METHOD_NOT_FOUND',
      'RN_CDP_INVALID_REQUEST',
      'RN_CDP_INVALID_PARAMS',
      'RN_CDP_COMMAND_FAILED',
    ],
  },
];

const aliasCategoryConfig: Array<{ label: string; match: (name: string) => boolean }> = [
  { label: 'Runtime aliases', match: (name) => name.startsWith('rn_runtime_') },
  { label: 'Debugger aliases', match: (name) => name.startsWith('rn_debugger_') },
  { label: 'Profiler aliases', match: (name) => name.startsWith('rn_profiler_') },
  { label: 'Heap profiler aliases', match: (name) => name.startsWith('rn_heap_profiler_') },
  { label: 'Network aliases', match: (name) => name.startsWith('rn_network_') && name !== 'rn_network_enable' },
  { label: 'IO aliases', match: (name) => name.startsWith('rn_io_') },
  { label: 'Tracing aliases', match: (name) => name.startsWith('rn_tracing_') },
  { label: 'Log aliases', match: (name) => name.startsWith('rn_log_') },
  { label: 'Host aliases', match: (name) => name === 'rn_page_reload' || name.startsWith('rn_overlay_') },
  {
    label: 'ReactNativeApplication aliases',
    match: (name) => name.startsWith('rn_react_native_application_'),
  },
];

const aliasCommonErrors = [
  'RN_SESSION_NOT_FOUND',
  'RN_CDP_METHOD_NOT_FOUND',
  'RN_CDP_INVALID_REQUEST',
  'RN_CDP_INVALID_PARAMS',
  'RN_CDP_COMMAND_FAILED',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const readmePath = path.join(repoRoot, 'README.md');
const toolRefPath = path.join(repoRoot, 'docs', 'tool-reference.md');

function replaceBetween(text: string, beginMarker: string, endMarker: string, generated: string): string {
  const begin = text.indexOf(beginMarker);
  const end = text.indexOf(endMarker);

  if (begin === -1 || end === -1 || end < begin) {
    throw new Error(`Markers not found or invalid: ${beginMarker} .. ${endMarker}`);
  }

  const start = begin + beginMarker.length;
  return `${text.slice(0, start)}\n${generated}\n${text.slice(end)}`;
}

function toAnchor(name: string): string {
  return `#${name}`;
}

function readmeToolLink(name: string): string {
  return `docs/tool-reference.md#${name}`;
}

function pluralizeTools(count: number): string {
  return count === 1 ? 'tool' : 'tools';
}

function buildCoreGroups(): Array<{ label: string; names: string[] }> {
  const groups = new Map<string, string[]>();
  for (const tool of coreDocs) {
    if (!groups.has(tool.category)) {
      groups.set(tool.category, []);
    }
    groups.get(tool.category)!.push(tool.name);
  }

  return Array.from(groups.entries()).map(([label, names]) => ({ label, names }));
}

function buildAliasGroups(): Array<{ label: string; names: string[] }> {
  return aliasCategoryConfig
    .map((config) => ({
      label: config.label,
      names: CDP_ALIAS_TOOLS.filter((tool) => config.match(tool.name)).map((tool) => tool.name),
    }))
    .filter((group) => group.names.length > 0);
}

function renderGroupedList(
  groups: Array<{ label: string; names: string[] }>,
  linkForName: (name: string) => string
): string {
  return groups
    .map((group) => {
      const lines = [`- **${group.label}** (${group.names.length} ${pluralizeTools(group.names.length)})`];
      for (const name of group.names) {
        lines.push(`  - [\`${name}\`](${linkForName(name)})`);
      }
      return lines.join('\n');
    })
    .join('\n');
}

function renderCoreDetails(): string {
  return coreDocs
    .map((tool) => {
      const lines: string[] = [];
      lines.push(`### \`${tool.name}\``);
      lines.push(`- Category: ${tool.category}`);
      lines.push(`- Summary: ${tool.summary}`);
      lines.push('- Input schema:');
      for (const input of tool.inputs) {
        lines.push(`  - \`${input}\``);
      }
      lines.push('- Common errors:');
      for (const error of tool.errors) {
        lines.push(`  - \`${error}\``);
      }
      return lines.join('\n');
    })
    .join('\n\n');
}

function createAliasLookup(): Map<string, AliasTool> {
  return new Map<string, AliasTool>(
    CDP_ALIAS_TOOLS.map((tool) => [tool.name as string, tool as AliasTool])
  );
}

function renderAliasDetails(aliasGroups: Array<{ label: string; names: string[] }>): string {
  const aliasByName = createAliasLookup();

  return aliasGroups
    .map((group) => {
      const lines: string[] = [];
      lines.push(`### ${group.label}`);
      lines.push('- Input schema:');
      lines.push('  - `sessionKey: string`');
      lines.push('  - `params?: Record<string, unknown>`');
      lines.push('- Common errors:');
      for (const error of aliasCommonErrors) {
        lines.push(`  - \`${error}\``);
      }
      lines.push('- Tools:');

      for (const name of group.names) {
        const alias = aliasByName.get(name);
        if (!alias) continue;
        lines.push(`  - [\`${name}\`](${toAnchor(name)}) -> \`${alias.method}\``);
      }

      return lines.join('\n');
    })
    .join('\n\n');
}

function renderIndividualAliasDetails(aliasGroups: Array<{ label: string; names: string[] }>): string {
  const aliasByName = createAliasLookup();
  const blocks: string[] = [];

  for (const group of aliasGroups) {
    for (const name of group.names) {
      const alias = aliasByName.get(name);
      if (!alias) continue;
      blocks.push(
        [
          `### \`${name}\``,
          `- Category: ${group.label}`,
          `- CDP method: \`${alias.method}\``,
          `- Summary: ${alias.description}`,
          '- Input schema:',
          '  - `sessionKey: string`',
          '  - `params?: Record<string, unknown>`',
          '- Common errors:',
          ...aliasCommonErrors.map((error) => `  - \`${error}\``),
        ].join('\n')
      );
    }
  }

  return blocks.join('\n\n');
}

function main(): void {
  const coreGroups = buildCoreGroups();
  const aliasGroups = buildAliasGroups();

  const readmeGenerated = [
    ...renderGroupedList(coreGroups, readmeToolLink).split('\n'),
    '',
    '- **CDP alias families**',
    ...renderGroupedList(aliasGroups, readmeToolLink)
      .split('\n')
      .map((line) => (line.startsWith('- **') ? line.replace('- **', '  - **') : `  ${line}`)),
  ].join('\n');

  const toolIndexGenerated = [
    ...renderGroupedList(coreGroups, toAnchor).split('\n'),
    '',
    '- **CDP alias families**',
    ...renderGroupedList(aliasGroups, toAnchor)
      .split('\n')
      .map((line) => (line.startsWith('- **') ? line.replace('- **', '  - **') : `  ${line}`)),
  ].join('\n');

  const toolDetailsGenerated = [
    '## Core tools',
    '',
    renderCoreDetails(),
    '',
    '## Alias tools',
    '',
    renderAliasDetails(aliasGroups),
    '',
    renderIndividualAliasDetails(aliasGroups),
  ].join('\n');

  const readmeOriginal = fs.readFileSync(readmePath, 'utf8');
  const readmeUpdated = replaceBetween(
    readmeOriginal,
    '<!-- BEGIN AUTO GENERATED TOOLS -->',
    '<!-- END AUTO GENERATED TOOLS -->',
    readmeGenerated
  );

  const toolRefOriginal = fs.readFileSync(toolRefPath, 'utf8');
  let toolRefUpdated = replaceBetween(
    toolRefOriginal,
    '<!-- BEGIN AUTO GENERATED TOOL INDEX -->',
    '<!-- END AUTO GENERATED TOOL INDEX -->',
    toolIndexGenerated
  );

  toolRefUpdated = replaceBetween(
    toolRefUpdated,
    '<!-- BEGIN AUTO GENERATED TOOL DETAILS -->',
    '<!-- END AUTO GENERATED TOOL DETAILS -->',
    toolDetailsGenerated
  );

  fs.writeFileSync(readmePath, readmeUpdated);
  fs.writeFileSync(toolRefPath, toolRefUpdated);

  const coreNamesFromDocs = new Set(coreDocs.map((tool) => tool.name));
  for (const name of CORE_TOOL_NAMES) {
    if (!coreNamesFromDocs.has(name)) {
      throw new Error(`Missing core doc metadata for ${name}`);
    }
  }

  console.log(`Updated tools docs: core=${CORE_TOOL_NAMES.length}, aliases=${CDP_ALIAS_TOOLS.length}`);
}

main();

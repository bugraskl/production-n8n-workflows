import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const workflowDir = fileURLToPath(new URL('../workflows/', import.meta.url));
const files = (await readdir(workflowDir)).filter((file) => file.endsWith('.json')).sort();
const forbidden = [
  /gh[oprsu]_[A-Za-z0-9_]{20,}/,
  /sk-[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

if (!files.length) throw new Error('No workflow JSON files found');

for (const file of files) {
  const raw = await readFile(join(workflowDir, file), 'utf8');
  const workflow = JSON.parse(raw);
  if (!workflow.name || !Array.isArray(workflow.nodes) || !workflow.nodes.length) {
    throw new Error(`${file}: missing name or nodes`);
  }
  if (!workflow.connections || typeof workflow.connections !== 'object') {
    throw new Error(`${file}: missing connections`);
  }

  const ids = new Set();
  const names = new Set();
  for (const node of workflow.nodes) {
    if (!node.id || !node.name || !node.type || !Array.isArray(node.position)) {
      throw new Error(`${file}: malformed node ${node.name || node.id || '<unknown>'}`);
    }
    if (ids.has(node.id)) throw new Error(`${file}: duplicate node id ${node.id}`);
    if (names.has(node.name)) throw new Error(`${file}: duplicate node name ${node.name}`);
    ids.add(node.id);
    names.add(node.name);
    if (node.type === 'n8n-nodes-base.code' && typeof node.parameters?.jsCode === 'string') {
      try {
        new Function(node.parameters.jsCode);
      } catch (error) {
        throw new Error(`${file}: invalid JavaScript in ${node.name}: ${error.message}`);
      }
    }
  }

  for (const [source, outputs] of Object.entries(workflow.connections)) {
    if (!names.has(source)) throw new Error(`${file}: unknown connection source ${source}`);
    for (const output of outputs.main || []) {
      for (const edge of output || []) {
        if (!names.has(edge.node)) throw new Error(`${file}: unknown connection target ${edge.node}`);
      }
    }
  }

  if (workflow.nodes.some((node) => node.credentials)) {
    throw new Error(`${file}: exported credential references are not allowed`);
  }
  for (const pattern of forbidden) {
    if (pattern.test(raw)) throw new Error(`${file}: possible secret detected (${pattern})`);
  }
}

console.log(`Validated ${files.length} workflow files: ${files.join(', ')}`);

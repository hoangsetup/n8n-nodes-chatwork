import { defineConfig, globalIgnores } from 'eslint/config';
import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import tsESLint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/eslint.config.mjs',
    '**/*.js',
    '**/node_modules/**/*',
    '**/dist/**/*',
  ]),
  tsESLint.config(
    eslint.configs.recommended,
    tsESLint.configs.recommended,
  ),
  {
    files: ['**/package.json'],
    extends: compat.extends('plugin:n8n-nodes-base/community'),
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      'n8n-nodes-base/community-package-json-name-still-default': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['./src/credentials/**/*.ts'],
    extends: compat.extends('plugin:n8n-nodes-base/credentials'),
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
      'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
    },
  },
  {
    files: ['./src/nodes/**/*.ts'],
    extends: compat.extends('plugin:n8n-nodes-base/nodes'),
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
      'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
      'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
    },
  },
]);

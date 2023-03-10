import { test, expect } from '@jest/globals';
import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const firstPlain = getFixturePath('file1.json');
  const secondPlain = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');
  const actual = gendiff(firstPlain, secondPlain);
  expect(actual).toEqual(expected);
});

test('yaml', () => {
  const firstPlain = getFixturePath('file1.yml');
  const secondPlain = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');
  const actual = gendiff(firstPlain, secondPlain);
  expect(actual).toEqual(expected);
});

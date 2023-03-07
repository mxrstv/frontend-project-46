import { test, expect } from '@jest/globals';
import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain object json', () => {
  const firstPlain = getFixturePath('first_plain.json');
  const secondPlain = getFixturePath('second_plain.json');
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const actual = gendiff(firstPlain, secondPlain);
  expect(actual).toEqual(expected);
});

test('plain object yaml', () => {
  const firstPlain = getFixturePath('first_plain.yml');
  const secondPlain = getFixturePath('second_plain.yml');
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const actual = gendiff(firstPlain, secondPlain);
  expect(actual).toEqual(expected);
});

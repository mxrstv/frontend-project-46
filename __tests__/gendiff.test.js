import { test, expect } from '@jest/globals';
import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json stylish', () => {
  const first = getFixturePath('file1.json');
  const second = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const actual = gendiff(first, second);
  expect(actual).toEqual(expected);
});

test('yaml stylish', () => {
  const first = getFixturePath('file1.yml');
  const second = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const actual = gendiff(first, second);
  expect(actual).toEqual(expected);
});

test('json plain', () => {
  const first = getFixturePath('file1.json');
  const second = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const actual = gendiff(first, second);
  expect(actual).toEqual(expected);
});

test('yaml plain', () => {
  const first = getFixturePath('file1.yml');
  const second = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const actual = gendiff(first, second);
  expect(actual).toEqual(expected);
});

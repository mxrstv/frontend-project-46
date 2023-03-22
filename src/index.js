import path from 'node:path';
import * as fs from 'node:fs';
import parseObj from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatDiff from './formatters/index.js';

const normalizePath = (str) => path.resolve(process.cwd(), str);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });
const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const objects = [filepath1, filepath2]
    .map((filepath) => normalizePath(filepath))
    .map((normPath) => [readFile(normPath), path.extname(normPath)])
    .map(([strObj, ext]) => parseObj(strObj, ext));
  const [firstObj, secondObj] = objects;
  return formatDiff(buildDiffTree(firstObj, secondObj), format);
};

export default gendiff;

import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parseObj from './parsers.js';
import formatDiff from './formatters/index.js';

const normalizePath = (str) => path.resolve(process.cwd(), str);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const buildDiffTree = (first, second) => {
  const keys = _.sortBy(_.union(_.keys(first), _.keys(second)));
  const diffTree = keys.map((key) => {
    if (!_.has(second, key)) {
      return { key, state: 'deleted', value: first[key] };
    }
    if (!_.has(first, key)) {
      return { key, state: 'added', value: second[key] };
    }
    if (_.isPlainObject(first[key]) && _.isPlainObject(second[key])) {
      return { key, state: 'nested', children: buildDiffTree(first[key], second[key]) };
    }
    if (_.isEqual(first[key], second[key])) {
      return { key, state: 'unchanged', value: first[key] };
    }
    return {
      key, state: 'changed', value: second[key], oldValue: first[key],
    };
  });
  return diffTree;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const objects = [filepath1, filepath2]
    .map((filepath) => normalizePath(filepath))
    .map((normPath) => [readFile(normPath), path.extname(normPath)])
    .map(([strObj, ext]) => parseObj(strObj, ext));
  const [firstObj, secondObj] = objects;
  return formatDiff(buildDiffTree(firstObj, secondObj), format);
};

export default gendiff;

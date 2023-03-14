import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parseObj from './parsers.js';
import formatDiff from './stylish.js';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const [firstObject, secondObject] = [filepath1, filepath2]
    .map((filepath) => normalizePath(filepath))
    .map((normPath) => [fs.readFileSync(normPath, { encoding: 'utf8' }), path.extname(normPath)])
    .map(([strObj, ext]) => parseObj(strObj, ext));
  // console.log(firstObject, secondObject);
  const buildDiffTree = (first, second) => {
    const keys = _.sortBy(_.union(_.keys(first), _.keys(second)));
    const diffTree = keys.map((key) => {
      if (!_.has(second, key)) {
        return { name: [key], state: 'deleted', value: first[key] };
      }
      if (!_.has(first, key)) {
        return { name: [key], state: 'added', value: second[key] };
      }
      if (_.isPlainObject(first[key]) && _.isPlainObject(second[key])) {
        return { name: [key], state: 'nested', value: buildDiffTree(first[key], second[key]) };
      }
      return (_.isEqual(first[key], second[key]))
        ? { name: [key], state: 'unchanged', value: first[key] }
        : {
          name: [key],
          state: 'changed',
          value: second[key],
          oldValue: first[key],
        };
    });
    return diffTree;
  };
  return formatDiff(buildDiffTree(firstObject, secondObject));
};

export default gendiff;

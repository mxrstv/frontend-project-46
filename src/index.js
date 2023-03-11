import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parseObj from './parsers.js';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const gendiff = (filepath1, filepath2, format) => {
  const [firstObject, secondObject] = [filepath1, filepath2]
    .map((filepath) => normalizePath(filepath))
    .map((normPath) => [fs.readFileSync(normPath, { encoding: 'utf8' }), path.extname(normPath)])
    .map(([strObj, ext]) => parseObj(strObj, ext));
  // console.log(firstObject, secondObject);
  const buildDiffTree = (first, second) => {
    const keys = _.sortBy(_.union(_.keys(first), _.keys(second)));
    const diffTree = keys.map((key) => {
      if (_.has(first, key) && !_.has(second, key)) {
        return { node: [key], state: 'deleted', value: first[key] };
      }
      if (!_.has(first, key) && _.has(second, key)) {
        return { node: [key], state: 'added', value: second[key] };
      }
      if (_.isObject(first[key]) && _.isObject(second[key])) {
        return { node: [key], state: 'nested', value: buildDiffTree(first[key], second[key]) };
      }
      return (first[key] === second[key])
        ? { node: [key], state: 'unchanged', value: first[key] }
        : { node: [key], state: 'changed', value: second[key], ldValue: first[key] };
    });
    return diffTree;
  };
  console.log(buildDiffTree(firstObject, secondObject));
};

export default gendiff;

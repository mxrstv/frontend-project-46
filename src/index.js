import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parseObj from './parsers.js';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const gendiff = (filepath1, filepath2, format) => {
  // const ext = path.extname(filepath);
  // const normalized = normalizePath(filepath);
  // const strObj = fs.readFileSync(normalized, { encoding: 'utf8' });
  const [first, second] = [filepath1, filepath2]
    .map((filepath) => normalizePath(filepath))
    .map((normPath) => [fs.readFileSync(normPath, { encoding: 'utf8' }), path.extname(normPath)])
    .map(([strObj, ext]) => parseObj(strObj, ext));
  console.log(first, second);
  const keys = _.sortBy(_.union(_.keys(first), _.keys(second)));
  console.log(keys);
  const lines = [];
  keys.forEach((key) => {
    // console.log(`${key} first: ${first[key]} second: ${first[key]} `);
    if (Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      if (first[key] === second[key]) {
        lines.push(`  ${key}: ${first[key]}`);
      } else {
        lines.push(`- ${key}: ${first[key]}`);
        lines.push(`+ ${key}: ${second[key]}`);
      }
    }
    if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) {
      lines.push(`- ${key}: ${first[key]}`);
    }
    if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
      lines.push(`+ ${key}: ${second[key]}`);
    }
  });
  return ['{', ...lines.map((line) => `  ${line}`), '}'].join('\n');
};

export default gendiff;

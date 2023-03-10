import path from 'node:path';
import * as fs from 'node:fs';
import yaml from 'js-yaml';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const parseObj = (filepath) => {
  const ext = path.extname(filepath);
  //  console.log(`ext: ${ext}`);
  const parsers = {
    '.json': (strObj) => JSON.parse(strObj),
    '.yml': (strObj) => yaml.load(strObj),
    '.yaml': (strObj) => yaml.load(strObj),
  };
  const normalized = normalizePath(filepath);
  const strObj = fs.readFileSync(normalized, { encoding: 'utf8' });
  //  console.log(`strObj: ${strObj}`);
  return parsers[ext]?.(strObj) ?? `Format: ${ext} not supported`;
};

export default parseObj;

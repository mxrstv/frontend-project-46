import path from 'node:path';
import * as fs from 'node:fs';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const gendiff = (filepath1, filepath2, format) => {
  const [first, second] = [filepath1, filepath2]
    .map((str) => normalizePath(str))
    .map((filePath) => fs.readFileSync(filePath, { encoding: 'utf8' }))
    .map((strObj) => JSON.parse(strObj));
  const keys = [first, second]
    .flatMap((obj) => Object.keys(obj))
    .filter((item, index, items) => items.indexOf(item) === index)
    .sort();
  // console.log(first, second);
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

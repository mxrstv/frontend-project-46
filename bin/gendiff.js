#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import * as fs from 'node:fs';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const compareObjects = (filepath1, filepath2, format) => {
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
  console.log(['{', ...lines.map((line) => `  ${line}`), '}'].join('\n'));
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  // .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    compareObjects(filepath1, filepath2, options.format);
  })
  .parse(process.argv);

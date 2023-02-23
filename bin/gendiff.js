#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import * as fs from 'node:fs';

const normalizePath = (str) => {
  const cwd = process.cwd();
  return path.isAbsolute(str) ? str : path.resolve(cwd, str);
};

const getObjects = (filepath1, filepath2, format) => {
  const [first, second] = [filepath1, filepath2]
    .map((str) => normalizePath(str))
    .map((filePath) => fs.readFileSync(filePath, { encoding: 'utf8' }))
    .map((strObj) => JSON.parse(strObj));
  console.log(first, second);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    getObjects(filepath1, filepath2, options.format);
  })
  .parse(process.argv);

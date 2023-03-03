#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  // .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(gendiff(filepath1, filepath2, options.format));
  })
  .parse(process.argv);

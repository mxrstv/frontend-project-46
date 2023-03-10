import parseObj from './parsers.js';

const gendiff = (filepath1, filepath2, format) => {
  const [first, second] = [filepath1, filepath2]
    .map((file) => parseObj(file));
  const keys = [first, second]
    .flatMap((obj) => Object.keys(obj))
    .filter((item, index, items) => items.indexOf(item) === index)
    .sort();
  // console.log(keys);
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

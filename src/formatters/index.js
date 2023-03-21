import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, format) => {
  if (!formatters[format]) {
    throw new Error(`Format: ${format} not supported`);
  }
  return formatters[format](diffTree);
};

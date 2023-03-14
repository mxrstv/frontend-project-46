import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDiff = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      return `Format: ${format} not supported`;
  }
};

export default formatDiff;

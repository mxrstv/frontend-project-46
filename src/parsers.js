import yaml from 'js-yaml';

const formats = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};
//  return formats[ext]?.(strObj) ?? `Format: ${ext} not supported`;

export default (strObj, ext) => formats[ext](strObj);

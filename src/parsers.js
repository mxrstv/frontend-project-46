import yaml from 'js-yaml';

const parseObj = (strObj, ext) => {
  const formats = {
    '.json': (format) => JSON.parse(format),
    '.yml': (format) => yaml.load(format),
    '.yaml': (format) => yaml.load(format),
  };
  return formats[ext]?.(strObj) ?? `Format: ${ext} not supported`;
};

export default parseObj;

import yaml from 'js-yaml';

const formats = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (strObj, ext) => formats[ext](strObj);

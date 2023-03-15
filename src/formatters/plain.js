import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (diffTree) => {
  const iter = (node, path) => {
    const lines = node
      .filter((item) => item.state !== 'unchanged')
      .map((diffKey) => {
        const { name, state, value } = diffKey;
        switch (state) {
          case 'nested':
            return iter(diffKey.children, `${path}${name}.`);
          case 'changed':
            return `Property '${path}${name}' was updated. From ${formatValue(diffKey.oldValue, path)} to ${formatValue(value, path)}`;
          case 'added':
            return `Property '${path}${name}' was added with value: ${formatValue(value, path)}`;
          case 'deleted':
            return `Property '${path}${name}' was removed`;
          default:
            throw new Error(`Unexpected state: ${state}`);
        }
      });
    return [...lines].join('\n');
  };
  return iter(diffTree, '');
};

export default plain;

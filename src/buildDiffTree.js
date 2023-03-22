import _ from 'lodash';

const buildDiffTree = (first, second) => {
  const keys = _.sortBy(_.union(_.keys(first), _.keys(second)));
  const diffTree = keys.map((key) => {
    if (!_.has(second, key)) {
      return { key, state: 'deleted', value: first[key] };
    }
    if (!_.has(first, key)) {
      return { key, state: 'added', value: second[key] };
    }
    if (_.isPlainObject(first[key]) && _.isPlainObject(second[key])) {
      return { key, state: 'nested', children: buildDiffTree(first[key], second[key]) };
    }
    if (_.isEqual(first[key], second[key])) {
      return { key, state: 'unchanged', value: first[key] };
    }
    return {
      key, state: 'changed', value: second[key], oldValue: first[key],
    };
  });
  return diffTree;
};

export default buildDiffTree;

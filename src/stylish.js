import _ from 'lodash';

const changeTabByState = (state, tab) => {
  const stateChars = {
    deleted: '- ',
    added: '+ ',
    changed: '  ',
    unchanged: '  ',
    nested: '  ',
  };
  return tab.substring(0, tab.length - 2).concat(stateChars[state]);
};

const calcTab = (level, baseTab = '    ') => baseTab.repeat(level);

const formatValue = (value, level) => {
  if (!_.isObject(value)) return `${value}`;
  const lines = Object.entries(value)
    .map(([key, val]) => `${calcTab(level + 1)}${key}: ${formatValue(val, level + 1)}`);
  return ['{', ...lines, `${calcTab(level)}}`].join('\n');
};

const formatDiff = (diffTree) => {
  const iter = (node, level) => {
    const levelTab = calcTab(level);
    const bracketTab = calcTab(level - 1);
    const lines = node.map((diffKey) => {
      const { state, name, value } = diffKey;
      const currentTab = changeTabByState(state, levelTab);
      if (state === 'nested') {
        return `${currentTab}${name}: ${iter(value, level + 1)}`;
      }
      if (state === 'changed') {
        const newValueTab = changeTabByState('added', currentTab);
        const oldValueTab = changeTabByState('deleted', currentTab);
        return `${oldValueTab}${name}: ${formatValue(diffKey.oldValue, level)}\n${newValueTab}${name}: ${formatValue(value, level)}`;
      }
      return `${currentTab}${name}: ${formatValue(value, level)}`;
    });
    return ['{', ...lines, `${bracketTab}}`].join('\n');
  };
  return iter(diffTree, 1);
};

export default formatDiff;
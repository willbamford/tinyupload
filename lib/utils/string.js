export var stringIf = function stringIf(condition, str) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return condition ? str : def;
};

export var pluralIf = function pluralIf(condition, singular) {
  var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return (typeof condition === 'number' ? condition !== 1 : condition) ? plural || singular + 's' : singular;
};
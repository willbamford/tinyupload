export var stringIf = function stringIf(condition, str) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return condition ? str : def;
};

export var pluralIf = function pluralIf(count, singular) {
  var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return count === 1 ? singular : plural || singular + 's';
};
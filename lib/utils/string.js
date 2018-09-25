export var stringIf = function stringIf(condition, str, def) {
  if (def === void 0) {
    def = '';
  }

  return condition ? str : def;
};
export var pluralIf = function pluralIf(condition, singular, plural) {
  if (plural === void 0) {
    plural = null;
  }

  return (typeof condition === 'number' ? condition !== 1 : condition) ? plural || singular + "s" : singular;
};
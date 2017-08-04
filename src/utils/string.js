export const stringIf = (condition, str, def = '') => (condition ? str : def)

export const pluralIf = (condition, singular, plural = null) =>
  ((typeof condition === 'number' ? condition !== 1 : condition)
    ? (plural || `${singular}s`)
    : singular)

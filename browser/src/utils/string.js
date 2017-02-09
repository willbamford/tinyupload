export const stringIf = (condition, str, def = '') => condition ? str : def

export const pluralIf = (count, singular, plural = null) =>
  count === 1 ? singular : (plural || `${singular}s`)

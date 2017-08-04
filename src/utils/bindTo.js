export const on = (element, names, fn) => {
  names.split(' ').forEach((name) => {
    element.addEventListener(name, fn)
  })
}

export const off = (element, names, fn) => {
  names.split(' ').forEach((name) => {
    element.removeEventListener(name, fn)
  })
}

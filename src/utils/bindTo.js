export const on = (element, names, fn) => {
  names.split(' ').map((name) => {
    element.addEventListener(name, fn)
  })
}

export const off = (element, names, fn) => {
  names.split(' ').map((name) => {
    element.removeEventListener(name, fn)
  })
}

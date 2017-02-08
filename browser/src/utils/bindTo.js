export const on = (element, names, fn) => {
  names.split(' ').map((name) => {
    element.addEventListener(name, fn)
  })
}

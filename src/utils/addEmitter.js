import Emitter from 'tiny-emitter'

const addEmitter = (instance) => {
  const emitter = new Emitter()
  const emit = emitter.emit.bind(emitter)

  const on = (name, fn) => {
    emitter.on(name, fn)
    return instance
  }
  const once = (name, fn) => {
    emitter.once(name, fn)
    return instance
  }
  const off = (name, fn) => {
    emitter.off(name, fn)
    return instance
  }

  /* eslint-disable no-param-reassign */
  instance.on = on
  instance.once = once
  instance.off = off
  /* eslint-enable no-param-reassign */

  return emit
}

export default addEmitter

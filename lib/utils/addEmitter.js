import Emitter from 'tiny-emitter';

var addEmitter = function addEmitter(instance) {
  var emitter = new Emitter();
  var emit = emitter.emit.bind(emitter);

  var on = function on(name, fn) {
    emitter.on(name, fn);
    return instance;
  };

  var once = function once(name, fn) {
    emitter.once(name, fn);
    return instance;
  };

  var off = function off(name, fn) {
    emitter.off(name, fn);
    return instance;
  };
  /* eslint-disable no-param-reassign */


  instance.on = on;
  instance.once = once;
  instance.off = off;
  /* eslint-enable no-param-reassign */

  return emit;
};

export default addEmitter;
var hasDnd = function hasDnd() {
  var div = document.createElement('div');
  return 'draggable' in div || 'ondragstart' in div && 'ondrop' in div;
};

export default hasDnd;
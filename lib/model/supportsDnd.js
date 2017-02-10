var supportsDnd = function supportsDnd() {
  var div = document.createElement('div');
  return 'draggable' in div || 'ondragstart' in div && 'ondrop' in div;
};

export default supportsDnd;
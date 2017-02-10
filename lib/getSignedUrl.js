export var getSignedRequest = function getSignedRequest(_ref, cb) {
  var name = _ref.name,
      type = _ref.type,
      baseUrl = _ref.baseUrl;

  var xhr = new window.XMLHttpRequest();

  var qs = '?name=' + file.name + '&type=' + file.type;
  var url = baseUrl + qs;

  xhr.open('GET', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          cb(null, JSON.parse(xhr.responseText));
        } catch (err) {
          cb(err);
        }
      } else {
        cb({
          message: 'Could not get signed URL',
          status: xhr.status
        });
      }
    }
  };
  xhr.send();
};
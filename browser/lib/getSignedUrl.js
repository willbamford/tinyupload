export var getSignedRequest = function getSignedRequest(_ref) {
  var file = _ref.file,
      cb = _ref.cb;

  var xhr = new window.XMLHttpRequest();

  var baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda';
  var qs = '?name=' + file.name + '&type=' + file.type;
  var url = baseUrl + qs;

  xhr.open('GET', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // console.log(response)
        // uploadFile(file, response.signedUrl, response.url)
      } else {
        window.alert('Could not get signed URL');
      }
    }
  };
  xhr.send();
};
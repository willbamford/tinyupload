var uploadFile = function uploadFile(file, signedRequest, url) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var image = new window.Image();
        image.src = url;
        document.body.appendChild(image);
      } else {
        window.alert('Could not upload file');
      }
    }
  };
  xhr.send(file);
};

export default uploadFile;
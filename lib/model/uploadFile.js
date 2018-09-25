var uploadFile = function uploadFile(file, signedUrl, url, cb) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('PUT', signedUrl);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, {
          file: file,
          url: url
        });
      } else {
        cb({
          message: 'Could not upload file',
          status: xhr.status
        });
      }
    }
  };

  xhr.send(file);
};

export default uploadFile;
var upload = function upload(file, url, cb) {
  var formData = new FormData();
  formData.append('file', file); // formData.append('file', files[0])

  fetch(url, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (success) {
    return cb(null, success);
  }).catch(function (error) {
    return cb(error);
  });
};

export default upload;
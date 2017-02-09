import getSignedUrl from './getSignedUrl';
import uploadFile from './uploadFile';

var processFile = function processFile(baseUrl, file, cb) {
  getSignedUrl({ name: file.name, type: file.type, baseUrl: baseUrl }, function (err, res) {
    var signedUrl = res.signedUrl,
        url = res.url;

    if (err) {
      return cb(err);
    }
    uploadFile(file, signedUrl, url, function (err, res) {
      if (err) {
        return cb(err);
      }
      cb(null, res);
    });
  });
};

var processFiles = function processFiles(baseUrl, files, cb) {
  var count = 0;
  var total = files.length;
  var errors = [];
  var responses = [];
  for (var i = 0; i < files.length; i += 1) {
    processFile(baseUrl, files[i], function (err, res) {
      count += 1;
      err ? errors.push(err) : responses.push(res);

      if (count === total) {
        if (errors.length) {
          return cb(errors);
        }
        cb(null, responses);
      }
    });
  }
};

export default processFiles;
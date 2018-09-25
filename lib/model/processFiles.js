import getSignedUrl from './getSignedUrl';
import uploadFile from './uploadFile';
import uploadFileRaw from './uploadFileRaw';
var SIGN_URLS = true;

var processFile = function processFile(baseUrl, file, cb) {
  if (SIGN_URLS) {
    getSignedUrl({
      name: file.name,
      type: file.type,
      baseUrl: baseUrl
    }, function (err, res) {
      if (err) {
        cb(err);
        return;
      }

      var signedUrl = res.signedUrl,
          url = res.url;
      uploadFile(file, signedUrl, url, function (uploadErr, uploadRes) {
        if (uploadErr) {
          cb(uploadErr);
          return;
        }

        cb(null, uploadRes);
      });
    });
  } else {
    uploadFileRaw(file, baseUrl, function (uploadErr, uploadRes) {
      if (uploadErr) {
        cb(uploadErr);
        return;
      }

      cb(null, uploadRes);
    });
  }
};

var processFiles = function processFiles(baseUrl, files, cb) {
  var count = 0;
  var total = files.length;
  var errors = [];
  var responses = [];

  var handler = function handler(err, res) {
    count += 1;

    if (err) {
      errors.push(err);
    } else {
      responses.push(res);
    }

    if (count === total) {
      if (errors.length) {
        cb(errors);
        return;
      }

      cb(null, responses);
    }
  };

  for (var i = 0; i < files.length; i += 1) {
    processFile(baseUrl, files[i], handler);
  }
};

export default processFiles;
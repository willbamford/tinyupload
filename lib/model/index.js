import supportsDnd from './supportsDnd';
import processFiles from './processFiles';
import addEmitter from '../utils/addEmitter';

var create = function create(_ref) {
  var baseUrl = _ref.baseUrl,
      mimeTypes = _ref.mimeTypes;

  var instance = {};
  var emit = addEmitter(instance);
  var dnd = supportsDnd();

  // State transitions:
  // WAITING -> UPLOADING -> (SUCCESS -> WAITING | ERROR -> WAITING)

  var status = WAITING;
  var method = null;
  var files = [];

  var getMimeTypes = function getMimeTypes() {
    return mimeTypes;
  };

  var getStatus = function getStatus() {
    return status;
  };

  var setFiles = function setFiles(f, m) {
    if (status !== WAITING) {
      return console.log('Invalid status for setting files: ' + status);
    }
    files = f;
    method = m;
    emit(FILES_CHANGE, files);
  };

  var getFiles = function getFiles() {
    return files;
  };

  var getMethod = function getMethod() {
    return method;
  };

  var upload = function upload() {
    if (!files.length) {
      return console.log('No files to upload');
    }

    if (status !== WAITING) {
      return console.log('Invalid status for upload: ' + status);
    }

    status = UPLOADING;
    emit(UPLOADING, files);

    processFiles(baseUrl, files, function (errors, responses) {
      if (errors) {
        status = ERROR;
        emit(ERROR, errors);
      } else {
        status = SUCCESS;
        emit(SUCCESS, responses);
      }
    });
  };

  var reset = function reset() {
    if (!(status === ERROR || status === SUCCESS)) {
      return console.log('Invalid status for reset: ' + status);
    }
    status = WAITING;
    emit(WAITING);
  };

  Object.assign(instance, {
    setFiles: setFiles,
    getStatus: getStatus,
    getFiles: getFiles,
    getMimeTypes: getMimeTypes,
    getMethod: getMethod,
    upload: upload,
    reset: reset,
    hasDnd: function hasDnd() {
      return dnd;
    }
  });

  return instance;
};

export default create;

export var FILES_CHANGE = 'filesChange';
export var WAITING = 'waiting';
export var UPLOADING = 'uploading';
export var SUCCESS = 'success';
export var ERROR = 'error';
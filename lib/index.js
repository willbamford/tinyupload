import addEmitter from './utils/addEmitter';
import createUI, { UI_FILES_CHANGE, UI_SUBMIT, UI_RESET } from './ui';
import createModel, { FILES_CHANGE, WAITING, UPLOADING, SUCCESS, ERROR } from './model';
export var UPLOAD_FILES_CHANGE = 'uploadFilesChange';
export var UPLOAD_WAITING = 'uploadWaiting';
export var UPLOAD_UPLOADING = 'uploadUploading';
export var UPLOAD_SUCCESS = 'uploadSuccess';
export var UPLOAD_ERROR = 'uploadError';

var create = function create(_ref) {
  var mount = _ref.mount,
      baseUrl = _ref.baseUrl,
      mimeTypes = _ref.mimeTypes,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$autoSubmit = _ref.autoSubmit,
      autoSubmit = _ref$autoSubmit === void 0 ? true : _ref$autoSubmit;
  var instance = {};
  var emit = addEmitter(instance);
  var model = createModel({
    baseUrl: baseUrl,
    mimeTypes: mimeTypes
  });
  var ui = createUI({
    mount: mount,
    mimeTypes: model.getMimeTypes(),
    hasDnd: model.hasDnd(),
    autoSubmit: autoSubmit,
    multiple: multiple
  });
  ui.on(UI_FILES_CHANGE, model.setFiles).on(UI_SUBMIT, model.upload).on(UI_RESET, model.reset);
  model.on(FILES_CHANGE, function (files) {
    ui.setFiles(files);
    emit(UPLOAD_FILES_CHANGE, files);
  }).on(WAITING, function () {
    ui.setWaiting();
    emit(UPLOAD_WAITING);
  }).on(UPLOADING, function (file) {
    ui.setUploading(file);
    emit(UPLOAD_UPLOADING, file);
  }).on(SUCCESS, function (responses) {
    ui.setSuccess(responses);
    emit(UPLOAD_SUCCESS, responses);
  }).on(ERROR, function (errors) {
    ui.setError(errors);
    emit(UPLOAD_ERROR, errors);
  });
  return instance;
};

export default create;
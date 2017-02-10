import './style.css';

import createUI, { UI_FILES_CHANGE, UI_SUBMIT, UI_RESET } from './ui';

import createModel, { FILES_CHANGE, WAITING, UPLOADING, SUCCESS, ERROR } from './model';

var create = function create(_ref) {
  var baseUrl = _ref.baseUrl,
      mimeTypes = _ref.mimeTypes;

  var model = createModel({ baseUrl: baseUrl, mimeTypes: mimeTypes });

  var mount = document.getElementById('mount');
  var ui = createUI({
    mount: mount,
    mimeTypes: model.getMimeTypes(),
    hasDnd: model.hasDnd(),
    autoSubmit: true,
    multiple: true
  });

  ui.on(UI_FILES_CHANGE, model.setFiles).on(UI_SUBMIT, model.upload).on(UI_RESET, model.reset);

  model.on(FILES_CHANGE, ui.setFiles).on(WAITING, ui.setWaiting).on(UPLOADING, ui.setUploading).on(SUCCESS, ui.setSuccess).on(ERROR, ui.setError);
};

export default create;
import './style.css';
import createUI, { UI_FILES_CHANGE, UI_SUBMIT } from './ui';
import createModel from './model';

var baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda';

var model = createModel({ baseUrl: baseUrl });

var mount = document.getElementById('mount');
var ui = createUI({
  mount: mount,
  hasDnd: model.hasDnd
});

ui.on(UI_FILES_CHANGE, model.setFiles).on(UI_SUBMIT, model.upload);
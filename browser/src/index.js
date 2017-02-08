import './style.css'

import createUI, {
  UI_FILES_CHANGE,
  UI_SUBMIT
} from './ui'

import createModel, {
  FILES_CHANGE,
  UPLOADING,
  UPLOADED
} from './model'

const baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda'

const model = createModel({ baseUrl })

const mount = document.getElementById('mount')
const ui = createUI({
  mount,
  hasDnd: model.hasDnd
})

ui
  .on(UI_FILES_CHANGE, model.setFiles)
  .on(UI_SUBMIT, model.upload)

model
  .on(FILES_CHANGE, ui.setFiles)
  .on(UPLOADING, ui.setUploading)
  .on(UPLOADED, ui.setUploaded)

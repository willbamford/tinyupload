import './style.css'

import { baseUrl, mimeTypes } from './config'

import createUI, {
  UI_FILES_CHANGE,
  UI_SUBMIT
} from './ui'

import createModel, {
  FILES_CHANGE,
  UPLOADING,
  UPLOADED
} from './model'

const model = createModel({ baseUrl, mimeTypes })

const mount = document.getElementById('mount')
const ui = createUI({
  mount,
  mimeTypes: model.getMimeTypes(),
  hasDnd: model.hasDnd()
})

ui
  .on(UI_FILES_CHANGE, model.setFiles)
  .on(UI_SUBMIT, model.upload)

model
  .on(FILES_CHANGE, ui.setFiles)
  .on(UPLOADING, ui.setUploading)
  .on(UPLOADED, ui.setUploaded)

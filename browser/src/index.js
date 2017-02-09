import './style.css'

import { baseUrl, mimeTypes } from './config'

import createUI, {
  UI_FILES_CHANGE,
  UI_SUBMIT,
  UI_TRY_AGAIN
} from './ui'

import createModel, {
  FILES_CHANGE,
  WAITING,
  UPLOADING,
  SUCCESS,
  ERROR
} from './model'

const model = createModel({ baseUrl, mimeTypes })

const mount = document.getElementById('mount')
const ui = createUI({
  mount,
  mimeTypes: model.getMimeTypes(),
  hasDnd: model.hasDnd(),
  autoSubmit: true,
  multiple: true
})

ui
  .on(UI_FILES_CHANGE, model.setFiles)
  .on(UI_SUBMIT, model.upload)
  .on(UI_TRY_AGAIN, model.tryAgain)

model
  .on(FILES_CHANGE, ui.setFiles)
  .on(WAITING, ui.setWaiting)
  .on(UPLOADING, ui.setUploading)
  .on(SUCCESS, ui.setSuccess)
  .on(ERROR, ui.setError)

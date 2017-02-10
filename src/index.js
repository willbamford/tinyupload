import './style.css'

import createUI, {
  UI_FILES_CHANGE,
  UI_SUBMIT,
  UI_RESET
} from './ui'

import createModel, {
  FILES_CHANGE,
  WAITING,
  UPLOADING,
  SUCCESS,
  ERROR
} from './model'

const create = ({ mount, baseUrl, mimeTypes }) => {
  const model = createModel({ baseUrl, mimeTypes })

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
    .on(UI_RESET, model.reset)

  model
    .on(FILES_CHANGE, ui.setFiles)
    .on(WAITING, ui.setWaiting)
    .on(UPLOADING, ui.setUploading)
    .on(SUCCESS, ui.setSuccess)
    .on(ERROR, ui.setError)
}

export default create

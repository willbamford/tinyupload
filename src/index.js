import './style.css'

import addEmitter from './utils/addEmitter'

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

const create = ({
  mount,
  baseUrl,
  mimeTypes,
  multiple = false,
  autoSubmit = true
}) => {
  const instance = {}
  const emit = addEmitter(instance)

  const model = createModel({ baseUrl, mimeTypes })

  const ui = createUI({
    mount,
    mimeTypes: model.getMimeTypes(),
    hasDnd: model.hasDnd(),
    autoSubmit,
    multiple
  })

  ui
    .on(UI_FILES_CHANGE, model.setFiles)
    .on(UI_SUBMIT, model.upload)
    .on(UI_RESET, model.reset)

  model
    .on(FILES_CHANGE, (files) => {
      ui.setFiles(files)
      emit(UPLOAD_FILES_CHANGE, files)
    })
    .on(WAITING, () => {
      ui.setWaiting()
      emit(UPLOAD_WAITING)
    })
    .on(UPLOADING, (file) => {
      ui.setUploading(file)
      emit(UPLOAD_UPLOADING, file)
    })
    .on(SUCCESS, (responses) => {
      ui.setSuccess(responses)
      emit(UPLOAD_SUCCESS, responses)
    })
    .on(ERROR, (errors) => {
      ui.setError(errors)
      emit(UPLOAD_ERROR, errors)
    })

  return instance
}

export default create

export const UPLOAD_FILES_CHANGE = 'uploadFilesChange'
export const UPLOAD_WAITING = 'uploadWaiting'
export const UPLOAD_UPLOADING = 'uploadUploading'
export const UPLOAD_SUCCESS = 'uploadSuccess'
export const UPLOAD_ERROR = 'uploadError'

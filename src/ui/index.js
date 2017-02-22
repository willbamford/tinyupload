import addEmitter from '../utils/addEmitter'
import { on } from '../utils/bindTo'
import { stringIf, pluralIf } from '../utils/string'
import svg from './upload.svg'

const create = ({
  mount,
  mimeTypes,
  hasDnd,
  autoSubmit = true,
  multiple = true
}) => {
  const instance = {}
  const emit = addEmitter(instance)

  const WAITING_CLASS = 'tu--is-waiting'
  const UPLOADING_CLASS = 'tu--is-uploading'
  const SUCCESS_CLASS = 'tu--is-success'
  const ERROR_CLASS = 'tu--is-error'
  const HAS_DND_CLASS = 'tu--has-dnd'
  const AUTO_SUBMIT_CLASS = 'tu--auto-submit'

  // TODO: data-multiple-caption="{count} files selected"

  const html = `
    <form
      class="tu ${WAITING_CLASS} ${stringIf(hasDnd, HAS_DND_CLASS)} ${stringIf(autoSubmit, AUTO_SUBMIT_CLASS)}"
      method="post"
      action=""
      enctype="multipart/form-data"
    >
      <div class="tu__input">
        ${svg}
        <input
          class="tu__file"
          type="file"
          name="files[]"
          id="tu-files-input"
          accept="${mimeTypes.join(', ')}"
          ${stringIf(multiple, 'multiple')}
        />
        <label for="tu-files-input">
          <span class="tu__dnd">Drop ${pluralIf(multiple, 'file')} here or</span>
          <strong>browse</strong>
        </label>
        <button class="tu__button" type="submit">Upload</button>
      </div>
      <div class="tu__uploading">Uploading&hellip;</div>
      <div class="tu__success">Done! <span></span> <a href="javascript:void(0)">Try again</a></div>
      <div class="tu__error">Error! <span></span> <a href="javascript:void(0)">Try again</a></div>
    </form>
  `

  const container = document.createElement('div')
  container.innerHTML = html
  mount.appendChild(container)

  const form = container.querySelector('.tu')
  const filesInput = container.querySelector('#tu-files-input')
  const successMessageSpan = container.querySelector('.tu__success span')
  const successRetryLink = container.querySelector('.tu__success a')
  const errorMessageSpan = container.querySelector('.tu__error > span')
  const errorRetryLink = container.querySelector('.tu__error > a')

  const onFilesChange = (e, files, method) => {
    e.preventDefault()
    emit(UI_FILES_CHANGE, files, method)
    if (autoSubmit) {
      emit(UI_SUBMIT)
    }
  }

  if (!autoSubmit) {
    on(form, 'submit', (e) => {
      e.preventDefault()
      emit(UI_SUBMIT)
      return false
    })
  }

  on(filesInput, 'change', (e) => onFilesChange(e, filesInput.files, METHOD_FILE_INPUT))

  if (hasDnd) {
    const swallow = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    on(form, 'drag dragstart dragend dragover dragenter dragleave drop', swallow)
    on(form, 'dragover dragenter', () => form.classList.add('tu--is-dragover'))
    on(form, 'dragleave dragend drop', () => form.classList.remove('tu--is-dragover'))
    on(form, 'drop', (e) => onFilesChange(e, e.dataTransfer.files, METHOD_DRAG_AND_DROP))
  }

  const reset = (e) => {
    e.preventDefault()
    emit(UI_RESET)
  }

  on(successRetryLink, 'click', reset)
  on(errorRetryLink, 'click', reset)

  const setFiles = (files) => {}

  const setWaiting = () => {
    form.classList.add(WAITING_CLASS)
    form.classList.remove(SUCCESS_CLASS)
    form.classList.remove(ERROR_CLASS)
  }

  const setUploading = () => {
    form.classList.remove(WAITING_CLASS)
    form.classList.add(UPLOADING_CLASS)
  }

  const setSuccess = (responses) => {
    console.log('Responses', responses)
    const count = responses.length
    successMessageSpan.innerHTML = `${count} ${pluralIf(count, 'file')} uploaded`
    form.classList.remove(UPLOADING_CLASS)
    form.classList.add(SUCCESS_CLASS)
  }

  const setError = (errors) => {
    console.log('Errors', errors)
    const count = errors.length
    errorMessageSpan.innerHTML = `${count} ${pluralIf(count, 'error')}`
    form.classList.remove(UPLOADING_CLASS)
    form.classList.add(ERROR_CLASS)
  }

  Object.assign(instance, {
    setFiles,
    setWaiting,
    setUploading,
    setSuccess,
    setError
  })

  return instance
}

export default create

export const METHOD_FILE_INPUT = 'filesInput'
export const METHOD_DRAG_AND_DROP = 'dragAndDrop'

export const UI_SUBMIT = 'submit'
export const UI_FILES_CHANGE = 'filesChange'
export const UI_RESET = 'reset'

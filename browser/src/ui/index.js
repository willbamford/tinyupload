import addEmitter from '../utils/addEmitter'
import { on } from '../utils/bindTo'
import { stringIf, pluralIf } from '../utils/string'

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

  // TODO: data-multiple-caption="{count} files selected"

  const html = `
    <form
      class="tu tu--is-waiting ${stringIf(hasDnd, 'tu--has-dnd')} ${stringIf(autoSubmit, 'tu--auto-submit')}"
      method="post"
      action=""
      enctype="multipart/form-data"
    >
      <div class="tu__input">
        <svg class="tu__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
        <input
          class="tu__file"
          type="file"
          name="files[]"
          id="tu-files-input"
          accept="${mimeTypes.join(', ')}"
          ${stringIf(multiple, 'multiple')}
        />
        <label for="tu-files-input">
          <strong>${stringIf(multiple, 'Choose files', 'Choose a file')}</strong>
          <span class="tu__dnd"> or drag here</span>
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

  const tryAgain = (e) => {
    e.preventDefault()
    emit(UI_TRY_AGAIN)
  }

  on(successRetryLink, 'click', tryAgain)
  on(errorRetryLink, 'click', tryAgain)

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
export const UI_TRY_AGAIN = 'tryAgain'

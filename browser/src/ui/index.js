import addEmitter from '../utils/addEmitter'
import { on } from '../utils/bindTo'

const create = ({ mount, mimeTypes, hasDnd }) => {
  const instance = {}
  const emit = addEmitter(instance)

  const UPLOADING_CLASS = 'tu--is-uploading'
  const SUCCESS_CLASS = 'tu--is-success'
  const ERROR_CLASS = 'tu--is-error'

  const html = `
    <form class="tu${hasDnd ? ' tu--has-dnd' : ''}" method="post" action="" enctype="multipart/form-data">
      <div class="tu__input">
        <svg class="tu__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
        <input
          class="tu__file"
          type="file"
          name="files[]"
          id="tu-file-input"
          data-multiple-caption="{count} files selected"
          accept="${mimeTypes.join(', ')}"
          multiple
        />
        <label for="tu-file-input"><strong>Choose a file</strong><span class="tu__dnd"> or drag it here</span></label>
        <button class="tu__button" type="submit">Upload</button>
      </div>
      <div class="tu__uploading">Uploading&hellip;</div>
      <div class="tu__success">Done!</div>
      <div class="tu__error">Error! <span></span></div>
    </form>
  `

  const container = document.createElement('div')
  container.innerHTML = html
  mount.appendChild(container)

  const form = container.querySelector('.tu')
  const fileInput = container.querySelector('#tu-file-input')
  const errorSpan = container.querySelector('.tu__error > span')

  on(fileInput, 'change', (e) => emit(UI_FILES_CHANGE, fileInput.files, METHOD_FILE_INPUT))

  if (hasDnd) {
    const swallow = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    on(form, 'drag dragstart dragend dragover dragenter dragleave drop', swallow)
    on(form, 'dragover dragenter', () => form.classList.add('tu--is-dragover'))
    on(form, 'dragleave dragend drop', () => form.classList.remove('tu--is-dragover'))
    on(form, 'drop', (e) => emit(UI_FILES_CHANGE, e.dataTransfer.files, METHOD_DRAG_AND_DROP))
  }

  on(form, 'submit', (e) => {
    e.preventDefault()
    emit(UI_SUBMIT)
  })

  const setFiles = (files) => {}

  const setUploading = () => {
    form.classList.add(UPLOADING_CLASS)
  }

  const setUploaded = (errors, responses) => {
    form.classList.remove(UPLOADING_CLASS)
    if (errors) {
      errorSpan.innerHTML = `${errors.length} error(s)`
      form.classList.add(ERROR_CLASS)
    } else {
      console.log('Responses', responses)
      form.classList.add(SUCCESS_CLASS)
    }
  }

  Object.assign(instance, {
    setFiles,
    setUploading,
    setUploaded
  })

  return instance
}

export default create

export const METHOD_FILE_INPUT = 'fileInput'
export const METHOD_DRAG_AND_DROP = 'dragAndDrop'

export const UI_SUBMIT = 'submit'
export const UI_FILES_CHANGE = 'filesChange'
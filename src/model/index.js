import supportsDnd from './supportsDnd'
import processFiles from './processFiles'
import addEmitter from '../utils/addEmitter'

const create = ({ baseUrl, mimeTypes }) => {
  const instance = {}
  const emit = addEmitter(instance)
  const dnd = supportsDnd()

  // State transitions:
  // WAITING -> UPLOADING -> (SUCCESS -> WAITING | ERROR -> WAITING)

  let status = WAITING
  let method = null
  let files = []

  const getMimeTypes = () => mimeTypes

  const getStatus = () => status

  const setFiles = (f, m) => {
    if (status !== WAITING) {
      return console.log(`Invalid status for setting files: ${status}`)
    }
    files = f
    method = m
    emit(FILES_CHANGE, files)
  }

  const getFiles = () => files

  const getMethod = () => method

  const upload = () => {
    if (!files.length) {
      return console.log('No files to upload')
    }

    if (status !== WAITING) {
      return console.log(`Invalid status for upload: ${status}`)
    }

    status = UPLOADING
    emit(UPLOADING, files)

    processFiles(baseUrl, files, (errors, responses) => {
      if (errors) {
        status = ERROR
        emit(ERROR, errors)
      } else {
        status = SUCCESS
        emit(SUCCESS, responses)
      }
    })
  }

  const reset = () => {
    if (!(status === ERROR || status === SUCCESS)) {
      return console.log(`Invalid status for reset: ${status}`)
    }
    status = WAITING
    emit(WAITING)
  }

  Object.assign(instance, {
    setFiles,
    getStatus,
    getFiles,
    getMimeTypes,
    getMethod,
    upload,
    reset,
    hasDnd: () => dnd
  })

  return instance
}

export default create

export const FILES_CHANGE = 'filesChange'
export const WAITING = 'waiting'
export const UPLOADING = 'uploading'
export const SUCCESS = 'success'
export const ERROR = 'error'

import supportsDnd from './supportsDnd'
import processFiles from './processFiles'
import addEmitter from '../utils/addEmitter'

const create = ({ baseUrl, mimeTypes }) => {
  const instance = {}
  const emit = addEmitter(instance)
  const dnd = supportsDnd()

  const STATUS_WAITING = 'waiting'
  const STATUS_UPLOADING = 'uploading'
  const STATUS_SUCCESS = 'success'
  const STATUS_ERROR = 'error'

  // State transitions:
  // WAITING -> UPLOADING -> (SUCCESS -> WAITING | ERROR -> WAITING)

  let status = STATUS_WAITING
  let method = null
  let files = []

  const getMimeTypes = () => mimeTypes

  const getStatus = () => status

  const setFiles = (f, m) => {
    files = f
    method = m
    emit(FILES_CHANGE, files, method)
  }

  const getFiles = () => files

  const getMethod = () => method

  const upload = () => {
    if (!files.length) {
      return console.log('No files to upload')
    }

    if (status !== STATUS_WAITING) {
      return console.log('Wrong status for upload', status)
    }

    status = STATUS_UPLOADING
    emit(UPLOADING, files)

    processFiles(baseUrl, files, (errors, responses) => {
      if (errors) {
        status = STATUS_ERROR
        emit(UPLOADED, errors)
      } else {
        status = STATUS_SUCCESS
        emit(UPLOADED, null, responses)
      }
    })
  }

  Object.assign(instance, {
    setFiles,
    getStatus,
    getFiles,
    getMimeTypes,
    getMethod,
    upload,
    hasDnd: () => dnd
  })

  return instance
}

export default create

export const FILES_CHANGE = 'filesChange'
export const UPLOADING = 'uploading'
export const UPLOADED = 'uploaded'

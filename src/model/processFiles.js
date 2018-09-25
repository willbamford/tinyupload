import getSignedUrl from './getSignedUrl'
import uploadFile from './uploadFile'
import uploadFileRaw from './uploadFileRaw'

const SIGN_URLS = true

const processFile = (baseUrl, file, cb) => {
  if (SIGN_URLS) {
    getSignedUrl({ name: file.name, type: file.type, baseUrl }, (err, res) => {
      if (err) {
        cb(err)
        return
      }
      const { signedUrl, url } = res
      uploadFile(file, signedUrl, url, (uploadErr, uploadRes) => {
        if (uploadErr) {
          cb(uploadErr)
          return
        }
        cb(null, uploadRes)
      })
    })
  } else {
    uploadFileRaw(file, baseUrl, (uploadErr, uploadRes) => {
      if (uploadErr) {
        cb(uploadErr)
        return
      }
      cb(null, uploadRes)
    })
  }
}

const processFiles = (baseUrl, files, cb) => {
  let count = 0
  const total = files.length
  const errors = []
  const responses = []

  const handler = (err, res) => {
    count += 1
    if (err) {
      errors.push(err)
    } else {
      responses.push(res)
    }

    if (count === total) {
      if (errors.length) {
        cb(errors)
        return
      }
      cb(null, responses)
    }
  }

  for (let i = 0; i < files.length; i += 1) {
    processFile(baseUrl, files[i], handler)
  }
}

export default processFiles

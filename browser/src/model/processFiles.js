import getSignedUrl from './getSignedUrl'
import uploadFile from './uploadFile'

const processFile = (baseUrl, file, cb) => {
  getSignedUrl({ name: file.name, type: file.type, baseUrl }, (err, res) => {
    console.log('res', res)
    const { signedUrl, url } = res
    if (err) {
      return cb(err)
    }
    uploadFile(file, signedUrl, url, (err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res)
    })
  })
}

const processFiles = (baseUrl, files, cb) => {
  let count = 0
  let total = files.length
  let errors = []
  let responses = []
  for (let i = 0; i < files.length; i += 1) {
    processFile(baseUrl, files[i], (err, res) => {
      count += 1
      err
        ? errors.push(err)
        : responses.push(res)

      if (count === total) {
        if (errors.length) {
          return cb(errors)
        }
        cb(null, responses)
      }
    })
  }
}

export default processFiles

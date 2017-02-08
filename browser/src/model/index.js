import supportsDnd from './supportsDnd'
import addEmitter from '../utils/addEmitter'

const create = ({ mount, hasDnd }) => {
  const instance = {}
  const emit = addEmitter(instance)
  const dnd = supportsDnd()

  let method = null
  let files = []
  let uploading = false

  const setFiles = (f, m) => {
    files = f
    method = m
    emit(FILES_CHANGE, files, method)
  }

  // const getFiles = () => files
  //
  // const getMethod = () => method

  const upload = () => {
    if (uploading) {
      return console.log('Already uploading')
    }
    uploading = true
    emit(UPLOADING, files)

    // console.log('Uploading...')
    // files.map((file) => {
    //   console.log('File', file)
    // })

    setTimeout(() => {
      uploading = false
      emit(UPLOADED, files)
    }, 2000)
  }

  const isUploading = () => uploading

  Object.assign(instance, {
    setFiles,
    // getFiles,
    // getMethod,
    upload,
    hasDnd: () => dnd,
    isUploading
  })

  return instance
}

export default create

export const FILES_CHANGE = 'filesChange'
export const UPLOADING = 'uploading'
export const UPLOADED = 'uploaded'

// import getSignedUrl from './getSignedUrl'

// const baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda'

// getSignedUrl({  })

//
// function getSignedRequest (file) {
//   var xhr = new window.XMLHttpRequest()
//
//   var baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda'
//   var qs = '?name=' + file.name + '&type=' + file.type
//   var url = baseUrl + qs
//
//   xhr.open('GET', url, true)
//   // xhr.setRequestHeader('Content-Type', 'application/json')
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         var response = JSON.parse(xhr.responseText)
//         // console.log(response)
//         uploadFile(file, response.signedUrl, response.url)
//       } else {
//         window.alert('Could not get signed URL')
//       }
//     }
//   }
//   xhr.send()
// }
//
// function uploadFile (file, signedRequest, url) {
//   const xhr = new window.XMLHttpRequest()
//   xhr.open('PUT', signedRequest)
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         console.log('Success')
//         console.log(url)
//
//         const image = new window.Image()
//         image.src = url
//         document.body.appendChild(image)
//       } else {
//         window.alert('Could not upload file')
//       }
//     }
//   }
//   xhr.send(file)
// }

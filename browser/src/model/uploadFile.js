const uploadFile = (file, signedUrl, url, cb) => {
  const xhr = new window.XMLHttpRequest()
  xhr.open('PUT', signedUrl)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, { file, url })
      } else {
        cb({
          message: 'Could not upload file',
          status: xhr.status
        })
      }
    }
  }
  xhr.send(file)
}

export default uploadFile

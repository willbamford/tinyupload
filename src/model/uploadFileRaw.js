const upload = (file, url, cb) => {
  const formData = new FormData()
  formData.append('file', file)
  // formData.append('file', files[0])

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(success => cb(null, success))
    .catch(error => cb(error))
}

export default upload

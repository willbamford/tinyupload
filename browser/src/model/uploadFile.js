const uploadFile = (file, signedRequest, url) => {
  const xhr = new window.XMLHttpRequest()
  xhr.open('PUT', signedRequest)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const image = new window.Image()
        image.src = url
        document.body.appendChild(image)
      } else {
        window.alert('Could not upload file')
      }
    }
  }
  xhr.send(file)
}

export default uploadFile

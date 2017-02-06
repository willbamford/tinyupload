(function () {
  var inputImage = document.getElementById('input-image')
  inputImage.onchange = function () {
    var files = inputImage.files

    console.log('Files changed...')
    console.log(files)

    if (files.length > 0) {
      getSignedRequest(files[0])
    }
  }
}())

function getSignedRequest (file) {
  var xhr = new window.XMLHttpRequest()

  var baseUrl = 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda'
  var qs = '?name=' + file.name + '&type=' + file.type
  var url = baseUrl + qs

  xhr.open('GET', url, true)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText)
        // console.log(response)
        uploadFile(file, response.signedUrl, response.url)
      } else {
        window.alert('Could not get signed URL')
      }
    }
  }
  xhr.send()
}

function uploadFile (file, signedRequest, url) {
  const xhr = new window.XMLHttpRequest()
  xhr.open('PUT', signedRequest)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Success')
        console.log(url)

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

const getSignedUrl = ({ name, type, baseUrl }, cb) => {
  const xhr = new window.XMLHttpRequest()

  const qs = `?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`
  const url = baseUrl + qs

  xhr.open('GET', url, true)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          cb(null, JSON.parse(xhr.responseText))
        } catch (err) {
          cb(err)
        }
      } else {
        cb({
          message: `Could not get signed URL for ${url}`,
          status: xhr.status
        })
      }
    }
  }
  xhr.send()
}

export default getSignedUrl

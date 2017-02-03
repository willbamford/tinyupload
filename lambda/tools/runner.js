const handler = require('../src').handler

// Uncomment to test the distribution:
// const handler = require('../bundle').handler

const event = {
  queryStringParameters: {
    filePath: 'img.jpg',
    contentType: 'image/jpeg'
  }
}

const header = (text) => {
  const line = (len) => {
    let s = ''
    for (let i = 0; i < len; i += 1) { s += '-' }
    return s
  }
  console.log('\n')
  console.log(line(text.length + 4))
  console.log('| ' + text + ' |')
  console.log(line(text.length + 4))
}

const callback = (err, result) => {
  if (err) {
    return console.log(err)
  }

  const params = JSON.parse(result.body)

  header('Copy-paste the following to test with CURL')
  console.log('curl -H "Content-Type: ' + params.contentType + '" -v --upload-file "' + params.filePath + '" "' + params.url + '"')

  header('Result')
  console.log(JSON.stringify(result, null, 2))
}

handler(event, null, callback)

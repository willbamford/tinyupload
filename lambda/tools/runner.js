/* eslint-disable no-console */
const handler = require('../src').handler

// Uncomment to test the distribution:
// const handler = require('../bundle').handler

const event = {
  queryStringParameters: {
    name: 'img.jpg',
    type: 'image/jpeg'
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
  console.log(`| ${text} |`)
  console.log(line(text.length + 4))
}

const callback = (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  const params = JSON.parse(result.body)

  header('Copy-paste the following to test with CURL')
  console.log(`curl -v -H "Content-Type: ${params.type}" -T "${params.name}" "${params.signedUrl}"`)

  header('Result')
  console.log(JSON.stringify(result, null, 2))
}

handler(event, null, callback)

const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const s3 = new AWS.S3()
const config = require('./config')

exports.handler = (event, context, callback) => {
  const qs = event.queryStringParameters || {}
  const type = qs.type || event.type
  const name = qs.name || event.name
  const headers = { 'Access-Control-Allow-Origin': '*' }

  const error = (err) => {
    const statusCode = 400
    const response = {
      statusCode,
      headers: headers,
      body: JSON.stringify({ error: err, statusCode })
    }
    callback(null, response)
  }

  const success = (params) => {
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params)
    }
    callback(null, response)
  }

  if (!type) {
    return error('Missing "type"')
  }

  if (config.mimeTypes.indexOf(type) === -1) {
    return error('Unsupported "type": ' + type)
  }

  if (!name) {
    return error('Missing "name"')
  }

  const key = uuid() + '_' + encodeURIComponent(name)

  const params = {
    Key: key,
    ContentType: type,
    Bucket: config.bucketName,
    Expires: config.expires,
    ACL: config.acl
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    return err
      ? error(err)
      : success({ url, type, name, params })
  })
}

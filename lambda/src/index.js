const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const s3 = new AWS.S3()
const config = require('./config')

exports.handler = (event, context, callback) => {
  const qs = event.queryStringParameters || {}
  const type = qs.type
  const path = qs.path

  const error = (err) => {
    const statusCode = 400
    const response = {
      statusCode,
      headers: {},
      body: JSON.stringify({ error: err, statusCode })
    }
    callback(null, response)
  }

  const success = (params) => {
    const response = {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(params)
    }
    callback(null, response)
  }

  if (!type) {
    return error('Missing "type"')
  }

  if (config.mimeTypes.indexOf(type) === -1) {
    return error('Unsupported "type": ' + event.type)
  }

  if (!path) {
    return error('Missing "path"')
  }

  const key = uuid() + '_' + encodeURIComponent(event.path)

  const params = {
    Key: key,
    ContentType: event.type,
    Bucket: config.bucketName,
    Expires: config.expires,
    ACL: config.acl
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    return err
      ? error(err)
      : success({ url, type, path, params })
  })
}

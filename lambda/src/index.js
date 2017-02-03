const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const s3 = new AWS.S3()
const config = require('./config')

exports.handler = (event, context, callback) => {
  const qs = event.queryStringParameters || {}
  const contentType = qs.contentType || event.contentType
  const filePath = qs.filePath || event.filePath

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

  if (!contentType) {
    return error('Missing "contentType"')
  }

  if (config.mimeTypes.indexOf(contentType) === -1) {
    return error('Unsupported "contentType": ' + contentType)
  }

  if (!filePath) {
    return error('Missing "filePath"')
  }

  const key = uuid() + '_' + encodeURIComponent(filePath)

  const params = {
    Key: key,
    ContentType: contentType,
    Bucket: config.bucketName,
    Expires: config.expires,
    ACL: config.acl
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    return err
      ? error(err)
      : success({ url, contentType, filePath, params })
  })
}

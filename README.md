# tinyupload

Browser image upload to S3 using AWS Lambda for pre-signed URLs.

## Usage 

```html
<div id="mount"></div>

<script>
  const uploader = tinyupload.default({
    mount: document.getElementById('mount'),
    baseUrl: 'https://ual17esjvc.execute-api.eu-west-1.amazonaws.com/dev/UniversalRenderImageUploadLambda',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/gif',
      'image/tiff'
    ]
  })
</script>
```

## Credits

* https://css-tricks.com/drag-and-drop-file-uploading/
* https://devcenter.heroku.com/articles/s3-upload-node

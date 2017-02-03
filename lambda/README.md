# tinyupload Lambda

This AWS Lambda function is responsible for creating a pre-signed URL for use by the browser when uploading (`PUT`ing) a file to S3.

Currently [AWS Lambda supports Node v4.3.2](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html), so ensure you are running the correct environment if testing locally (you can use `nvm use` inside the `/lambda` directory).

## Using

You will need your own AWS account in order to use API Gateway, Lambda, and S3.

### CORS support

Ensure the bucket has CORS support e.g.
```
aws s3api put-bucket-cors --bucket <INSERT_BUCKET_NAME> --cors-configuration file://cors.json
```

### Create IAM role (and test user)

Create a role (e.g. `UploadRole`) in IAM with the following custom policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::INSERT_BUCKET_NAME/*"
      ]
    }
  ]
}
```

## Testing locally

First ensure the bucket has CORS support (see above) and that AWS credentials have been setup on your machine.

Then run:

```
node runner.js
```

If you want to test against a specific profile e.g. the profile `upload-profile` linked to a user with `UploadRole` role:

```
AWS_PROFILE=upload-profile node runner.js
```

Copy the `curl` response into your terminal. It should look something like this...

```
curl -H "Content-Type: image/jpeg" -v --upload-file "test.jpg" "https://BUCKET_NAME.s3.amazonaws.com/8fb34447-4b8d-aaaa-9829-d338d3197418_test.jpg?AWSAccessKeyId=ACCESS_KEY_ID&Content-Type=image%2Fjpeg&Expires=1485870325&Signature=SIGNATURE&x-amz-acl=public-read"
```

## TODO

* Lambda update using CLI
* API Gateway enable CORS using CLI
* API Gateway configure Lambda

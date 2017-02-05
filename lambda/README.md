# tinyupload Lambda

This AWS Lambda function is responsible for creating a pre-signed URL for use by the browser when uploading (`PUT`ing) a file to S3.

Currently [AWS Lambda supports Node v4.3.2](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html), so ensure you are running the correct environment if testing locally (you can use `nvm use` inside the `/lambda` directory).

## Setup

You will need your own AWS account in order to use API Gateway, Lambda, and S3.

### S3

Create a bucket and ensure the bucket has CORS support if you want users to be able to access (`GET`) objects directly e.g.
```
aws s3api put-bucket-cors --bucket <INSERT_BUCKET_NAME> --cors-configuration file://cors.json
```

### IAM Role

It is recommended that you create a specific role which has restricted access to the bucket required for upload. For example, create a role called `UploadRole` in IAM with the following custom policy:

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

Then assign this role to your Lambda in the `Configuration`.

Note `s3:GetObject` isn't listed because if you upload files with a `public-read` ACL setting then users will access files outside of IAM.

### Lambda

Create a Lambda function using the AWS console or CLI.

Build the Lambda bundle file with:

```
yarn bundle
```

Swap out `yarn` for `npm` depending on your preference.

Deploying the bundle by uploading the resulting `index-<timestamp>.zip` file in `/bundle` using the AWS Lambda console or use the CLI.

### API Gateway

Setup a `GET` method then in the `Integration Request` select your Lambda function, choosing `Use Lambda Proxy integration`.

Ensure CORS is enabled on the API too (only applies to `OPTIONS` pre-flight request).

In `Method Request` add `name` and `type` to the `URL Query String Parameters`.

## Testing locally

First ensure the bucket has CORS support (see above) and that AWS credentials have been setup on your machine.

Then run:

```
yarn runner
```

This runs a really simple script which simulates the Lambda being invoked on AWS with some test parameters (signing `/img.jpg`).

Checkout `/tools/runner.js` to see what's going on here.

If you want to test against a specific profile e.g. the profile `upload-profile` linked to a user with `UploadRole` role then set the `AWS_PROFILE` environment variable when invoking the script:

```
AWS_PROFILE=upload-profile yarn runner
```

Copy the `curl` response into your terminal. It should look something like this...

```
curl -H "Content-Type: image/jpeg" -v --upload-file "test.jpg" "https://BUCKET_NAME.s3.amazonaws.com/8fb34447-4b8d-aaaa-9829-d338d3197418_test.jpg?AWSAccessKeyId=ACCESS_KEY_ID&Content-Type=image%2Fjpeg&Expires=1485870325&Signature=SIGNATURE&x-amz-acl=public-read"
```

## TODO

* Lambda update using CLI
* API Gateway enable CORS using CLI
* API Gateway configure Lambda

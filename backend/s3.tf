#4. S3, I create a S3 and use the local.account_id and local.component_nam
#define the name for the S3.
resource "aws_s3_bucket" "lambda" {
  bucket = "${local.account_id}-${local.component_name}"
}

#4.1 I'm defining the acl to be public only to make simple the project work, 
# but as best practice in a real project I would need specify only for the
#requests from the front-end.
resource "aws_s3_bucket_public_access_block" "lambda" {
  bucket = aws_s3_bucket.lambda.id

}
resource "aws_s3_bucket_acl" "lambda" {
  bucket = aws_s3_bucket.lambda.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "lambda" {
  bucket = aws_s3_bucket.lambda.id
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "lambda" {
  bucket = aws_s3_bucket.lambda.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

data "aws_iam_policy_document" "allow_public_access" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.lambda.arn}/*",
    ]
  }
}

#4.2 Creating the folder input/images and uploading the picture.
resource "aws_s3_object" "picture" {
  bucket       = aws_s3_bucket.lambda.id
  key          = "input/images/${local.image_file}"
  content_type = "image/jpeg"
  source       = local.image_file_path
}

#7. Trigger for all the time that some file be uplaoded to lambda
resource "aws_s3_bucket_notification" "s3_trigger" {
  bucket = aws_s3_bucket.lambda.id

  lambda_function {
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "input/images"
    filter_suffix       = ".jpg"
    lambda_function_arn = aws_lambda_function.s3_trigger.arn
  }

}
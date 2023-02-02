
#5. Lambda, Here I zip the file. After run terraform it will create
#the artefact.zip in /
data "archive_file" "s3_trigger" {
  type        = "zip"
  source_dir  = "${local.lambdas_path}/s3-trigger"
  output_path = "files/${local.component_name}-artefact.zip"
}

#5.1 Here where I create the lambda and in this case I'm using node, but
#probably if I have time I will use python for the resize images.
#the index.handler is the name of the file where Lambda will execute.
resource "aws_lambda_function" "s3_trigger" {
  function_name = local.component_name
  role          = aws_iam_role.s3_lambda.arn
  runtime       = "nodejs16.x"
  architectures = ["arm64"]
  handler       = "index.handler"

  #5.2 Upload the archive_file in the data to lambda, and using hash to
  # make sure that the files are the same
  filename         = data.archive_file.s3_trigger.output_path
  source_code_hash = data.archive_file.s3_trigger.output_base64sha256

}

#5.3 Allow S3 to invoke lambda function
resource "aws_lambda_permission" "s3" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.s3_trigger.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.lambda.arn

}
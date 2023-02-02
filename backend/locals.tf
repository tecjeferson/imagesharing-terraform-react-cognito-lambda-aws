locals {
  #3. Locals, I created an account ID to use later in the name
  account_id     = data.aws_caller_identity.current.account_id
  component_name = "bjss-tf-lambda-s3"

  #3.1 path.module will return to / and the go to lambda folder
  lambdas_path = "${path.module}/lambda"

  #3.2 Here I define the picture to be upload to S3
  image_file      = "picture.jpg"
  image_file_path = "${path.module}/${local.image_file}"
}
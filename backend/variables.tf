#2. The variables are necessary to easy change region, profile and any other variable in only one file.
variable "aws_region" {
  description = "The region where will be deployed in AWS"
  type        = string
  default     = "eu-west-2"
}

variable "aws_profile" {
  description = "Default profile to be used"
  #type        = string
  #default     = ""
}
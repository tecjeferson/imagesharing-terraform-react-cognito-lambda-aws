# 1. I started by defining version and provider.
terraform {
  required_version = "~> 1.3.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.51.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }


}


provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project     = "Bjss interview"
      ManagedBy   = "Terraform"
      CreatedAt   = "Jan 2023"
      Environment = "Dev"
    }
  }

}

data "aws_caller_identity" "current" {}
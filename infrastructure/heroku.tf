terraform {
  backend "s3" {
    bucket = "nthings-terraform-state"
    key    = "bot-er"
    region = "us-east-1"
  }
}

module "heroku-free-stack" {
  source = "git::https://github.com/NTHINGs/terraform-heroku-free-stack.git?ref=master"

  name = "bot-er"

  tar_build_path = "./bot-er.tar"
}

output "url" {
  value = module.heroku-free-stack.url
}

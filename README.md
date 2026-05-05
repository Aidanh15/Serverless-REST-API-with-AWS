# Serverless-REST-API-with-AWS
REST API for a simple CRUD notes app created using AWS serverless services and hosted on AWS API Gateway.

## Status

This repository is preserved as demo/reference code from an early AWS learning project. The original public AWS resources have been disabled and are not intended to serve production traffic.

The implementation demonstrates Lambda, API Gateway, DynamoDB, CodeBuild, CodePipeline, and the Serverless Framework. It is not production-ready as written: the original project used caller-provided `app_user_id` and `app_user_name` headers as identity hints, which is not real authentication. A production deployment should add an authorizer such as Cognito, IAM, or a custom JWT authorizer, and should restrict CORS to the actual frontend origin.

Services used:
AWS codecommit, codebuild, codepipeline -- all for version control - ci/cd  All of these were combined using an AWS CodePipeline to handle the CI/CD aspects in one go.
AWS Lambda - Node.js functions to perform tasks in conjunction with the API.
AWS APIGateway - Used to host the API and manage options, routes, stages.

AWS CLI - command line interface was used for easier task accomplishment, in conjunction with the serverless framework

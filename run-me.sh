# please run npm ci before running this script

export LOCALSTACK_API_KEY=xxxxxx
export DEFAULT_REGION=us-east-1
export AWS_DEFAULT_ACCOUNT=000000000000

# you can skip if you already run npm ci
npm ci

topic_arn="arn:aws:sns:us-east-1:000000000000:test-topic.fifo"

if [ "$LOCALSTACK_API_KEY" = "" ]; then
  echo "Please set LOCALSTACK_API_KEY"
  exit 1
fi

echo "***** starting localstack container *****"
docker-compose --project-directory localstack-pro up -d

sleep 10

echo "***** deploy serverless *****"
serverless deploy --stage local


import {
    SFNClient,
    StartExecutionCommand,
} from '@aws-sdk/client-sfn';


async function start() {
    const awsConfig = {
        region: 'us-east-1',
        endpoint: 'http://localhost:4566',
    }
    const stepFunctionsProvider = new SFNClient(awsConfig);

    const params = {
        stateMachineArn: `arn:aws:states:us-east-1:000000000000:stateMachine:wait-and-publish-local`,
        input: JSON.stringify({
            duration: 2,
            topicArn: `arn:aws:sns:us-east-1:000000000000:my-fifo-topic.fifo`,
            message: "test message",
            messageGroupId: "group-a",
            messageDeduplicationId: "5435435435",
        }),
    };

    const startExecutionCommand = new StartExecutionCommand(params);

    return stepFunctionsProvider.send(startExecutionCommand);
}

start();
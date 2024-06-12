// registerDeviceWithSNS.js
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'your-region',
});

const sns = new AWS.SNS();

async function registerDeviceWithSNS(token) {
    const params = {
        PlatformApplicationArn: 'your-platform-application-arn', // Replace with your actual platform application ARN
        Token: token,
    };

    try {
        const response = await sns.createPlatformEndpoint(params).promise();
        console.log('Endpoint ARN: ', response.EndpointArn);

        // Subscribe the endpoint to a topic
        const subscribeParams = {
            TopicArn: 'arn:aws:sns:us-east-1:499026303785:sample-topic', // Replace with your actual topic ARN
            Protocol: 'application',
            Endpoint: response.EndpointArn,
        };
        await sns.subscribe(subscribeParams).promise();
        console.log('Successfully subscribed to the topic!');
    } catch (error) {
        console.error('Error registering device with SNS: ', error);
    }
}

export default registerDeviceWithSNS;

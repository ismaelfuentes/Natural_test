const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' })

exports.handler = async (requestParams) => {
  // This is the lambda fast way to check we have body params
  if (requestParams !== null && requestParams !== undefined) {
    // No params check in order to go fast
    const params = {
      Item: { ...requestParams },
      TableName: 'Nature',
    }

    try {
      // It does create and update
      await docClient.put(params).promise()
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PUT,GET,OPTIONS',
        },
        body: {
          message: 'New element inserted',
        },
      }
      // We could return the new created element but whatever
      return response
    } catch (err) {
      console.warn('Failure', err.message)
      const response = {
        statusCode: 500,
        body: {
          message: err.message,
        },
      }
      return response
    }
  } else {
    // No body on request
    const response = {
      statusCode: 400,
      body: {
        message: Object.keys(event),
      },
    }
    return response
  }
}

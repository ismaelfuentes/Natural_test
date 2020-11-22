const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' })

exports.handler = (event, ctx, callback) => {
  const phoneNumber = event['queryStringParameters']['phoneNumber']
  const params = {
    Key: {
      phoneNumber: phoneNumber,
    },
    TableName: 'Nature',
  }
  docClient.get(params, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PUT,GET,OPTIONS',
        },
        body: JSON.stringify(data.Item || {}),
      })
    }
  })
}

/*
    Route: GET /note/N/{note_id}
 */
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const util = require('./util.js');
const _ = require('lodash');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;


exports.handler = async (event) => {
    try{
        let note_id = decodeURIComponent(event.pathParameters.note_id);
        let params = {
            TableName: tableName,
            IndexName: "note_id-index",
            KeyConditionExpression: "note_id = :note_id",
            ExpressionAttributeValues: {
                ":note_id": note_id
            },
            Limit: 1
        };

        let data = await dynamodb.query(params).promise();
        if(!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            };
        } else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders()
            };
        }
    } catch (err) {
        console.log("Error", err);
        return {
            satusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}


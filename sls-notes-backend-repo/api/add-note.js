/*
    Route: POST /note
 */
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');
const util = require('./util.js');

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({region: 'eu-west-1'}));
const tableName = process.env.NOTES_TABLE;


exports.handler = async (event) => {
    try{
        let item = JSON.parse(event.body).Item;
        const now = Math.floor(Date.now() / 1000);
        item.user_id = util.getUserId(event.headers);
        item.user_name = util.getUserName(event.headers);
        item.note_id = item.user_id + ':' + randomUUID()
        item.timestamp = now;
        item.expires = now + (90 * 24 * 60 * 60);

       await dynamodb.send(new PutCommand({
            TableName: tableName,
            Item: item
        }));

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
        }
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}

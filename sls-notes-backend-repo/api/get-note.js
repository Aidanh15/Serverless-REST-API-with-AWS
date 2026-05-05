/*
    Route: GET /note/N/{note_id}
 */
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const util = require('./util.js');
const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({region: 'eu-west-1'}));
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

        let data = await dynamodb.send(new QueryCommand(params));
        if(data.Items && data.Items.length > 0) {
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
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}

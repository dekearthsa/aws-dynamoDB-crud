const { request: Req } = require('express')
const { response: Res } = require('express')
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;
const accessKeyId =  process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const client = new DynamoDBClient({
    region: REGION,
    credentials:{
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
const docClient = DynamoDBDocumentClient.from(client);

// It is recommended that we instantiate AWS clients outside the scope of the handler 
// to take advantage of connection re-use.
// const docClient = new aws.DynamoDB.DocumentClient();

const controllerUpdate =  async (req: typeof Req, res: typeof Res) => {
    const {id, age} = req.body;

    const params = new UpdateCommand(
        {
            TableName: TABLE_NAME,
            Key: {'id':id},
            UpdateExpression: 'set age = :age',
            ExpressionAttributeValues:{
                ":age":age
            },
            ReturnValues: "ALL_NEW",
        }
    ) 
        

    try{
        const data = await docClient.send(params);
        res.status(200).send(data);
    }catch(err){
        console.log("catch err => ", err)
        res.status(500).send(err);
    }

}


export {controllerUpdate}
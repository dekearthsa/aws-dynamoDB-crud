const { request: Req } = require('express')
const { response: Res } = require('express')
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;
const accessKeyId =  process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const dynamodbClient = new DynamoDBClient({
    region: REGION,
    credentials:{
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});


const  controllerDelete = async (req: typeof Req, res: typeof Res) => {
    const {id} = req.body;

    const params = {
        TableName: TABLE_NAME,
        Key: {id: {"N": id.toString()}}
    }

    try{
        const command = new DeleteItemCommand(params);
        await dynamodbClient.send(command);
        res.status(200).send("deleted")
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
    
}

export {controllerDelete}
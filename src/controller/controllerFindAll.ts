const { request: Req } = require('express')
const { response: Res } = require('express')
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
// import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
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

const controllerFindAll =  async (req: typeof Req, res: typeof Res) => {
    const params = (
        {
            TableName: TABLE_NAME,
        }
    ) 
    try{
        const command = new ScanCommand(params)
        const data = await client.send(command)
        res.status(200).send(data);
    }catch(err){
        console.log("catch err => ", err)
        res.status(500).send(err);
    }

}


export {controllerFindAll}
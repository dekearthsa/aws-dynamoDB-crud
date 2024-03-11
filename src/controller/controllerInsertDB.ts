const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const { request: Req } = require('express')
const { response: Res } = require('express')

const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;
const accessKeyId =  process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

AWS.config.update({
    region: REGION,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

// var dynamoDB = new AWS.DynamoDB.DocumentClient({
//     region: REGION,
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
// });
const dynamodb = new AWS.DynamoDB();

const controllerInsertDB =  (req: typeof Req, res: typeof Res) => {
    const {username, age} = req.body;
    const date = new Date();
    const ms = date.getTime();
    const conStr = ms.toString();
    const params = {
        Item: {
            id:{
                N: conStr
            },
            username:{
                S:username
            },
            age:{
                N:age
            }
        },
        TableName: TABLE_NAME
    }

    try{
        dynamodb.putItem(params, (err:any, data:any) => {
            if (err) {
                console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
                res.status(500).json({ error: 'Unable to insert data into DynamoDB.' });
            } else {
                console.log('Added item:', JSON.stringify(data, null, 2));
                res.status(200).json({ success: true });
            }})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Unable to insert data into DynamoDB. catch' });
    }

}

export {controllerInsertDB}
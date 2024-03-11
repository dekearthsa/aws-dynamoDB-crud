"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerRead = void 0;
const { request: Req } = require('express');
const { response: Res } = require('express');
const AWS = require('aws-sdk');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
AWS.config.update({
    region: REGION,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
const dynamodb = new AWS.DynamoDB();
const controllerRead = (req, res) => {
    const { id } = req.body;
    // console.log("names => ", names)
    try {
        const params = {
            TableName: TABLE_NAME,
            ProjectionExpression: "id, age, username",
            // FilterExpression: "id = :u",
            KeyConditionExpression: "id = :i",
            ExpressionAttributeValues: { ':i': { 'N': id.toString() } }
        };
        dynamodb.query(params, function (err, data) {
            if (err) {
                console.log("error when query => ", err);
                res.status(500).send(err);
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    catch (err) {
        console.log("err when try => ", err);
        res.status(500).send(err);
    }
};
exports.controllerRead = controllerRead;

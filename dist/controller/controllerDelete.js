"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerDelete = void 0;
const { request: Req } = require('express');
const { response: Res } = require('express');
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });
const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const dynamodbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
const controllerDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const params = {
        TableName: TABLE_NAME,
        Key: { id: { "N": id.toString() } }
    };
    try {
        const command = new DeleteItemCommand(params);
        yield dynamodbClient.send(command);
        res.status(200).send("deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
exports.controllerDelete = controllerDelete;

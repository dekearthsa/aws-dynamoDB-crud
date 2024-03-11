const express = require("express");
const cors = require("cors");
const { controllerDebug } = require("../controller/controllerDebug");
const { controllerInsertDB } =require("../controller/controllerInsertDB");
const { controllerRead } =require("../controller/controllerRead");
const {controllerUpdate} = require("../controller/controllerUpdate");
const {controllerFindAll} = require("../controller/controllerFindAll");
const {controllerDelete} = require("../controller/controllerDelete");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {origin: '*'}
));

app.get("/api/debug", controllerDebug);
app.post("/api/aws/insert/db", controllerInsertDB);
app.post("/api/aws/read/db", controllerRead);
app.post("/api/aws/update/db", controllerUpdate);
app.get("/api/aws/findall/db", controllerFindAll);
app.post("/api/aws/delete/db",controllerDelete);

export { app }
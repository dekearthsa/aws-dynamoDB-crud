"use strict";
var _a;
const { app } = require("./router/app");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 2233;
app.listen(PORT, () => {
    console.log(`service haddle backend listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
});

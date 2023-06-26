"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class AfroHome {
    constructor() {
        this.app = express();
        this.app.use(express.json);
    }
    loadRoutes() {
        this.app.routes("/").get((req, res) => {
            res.redirect("/api");
        });
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(` Afro Home is runnig at the port: http://localhost:${port}`);
        });
    }
}
exports.default = new AfroHome;
//# sourceMappingURL=app.js.map
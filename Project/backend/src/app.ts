import * as express from "express";

class AfroHome {
    public app: express.Application;

    constructor() {
        this.app = express()
        this.app.use(express.json)
    }

    loadRoutes() {
        this.app.routes("/").get((req, res) => {
            res.redirect("/api");
        })
    }

    listen(port: string) {
        this.app.listen(port, () => {
            console.log(` Afro Home is runnig at the port: http://localhost:${port}`);
        });
    }

}

export default new AfroHome;
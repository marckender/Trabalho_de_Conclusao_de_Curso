const { name, version } = require("../../package.json");

class AppAction {
    getApiInfo() {
        return {
            name,
            version,
            frontEnd: "COMING SOON..."
        }    
    }
}

export default new AppAction();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { name, version } = require("../../package.json");
class AppAction {
    getApiInfo() {
        return {
            name,
            version,
            frontEnd: "COMING SOON..."
        };
    }
}
exports.default = new AppAction();
//# sourceMappingURL=app-action.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = __importDefault(require("./routes"));
class HttpServer {
    /**
     * Here maybe we can pass a json payload with some arguments to config the server,
     * since this is only for testing purposes I'm using the simplest default config,
     * i'm mentioning this since in the framework i got as reference,
     * they were creating a server with arguments for different needs, so basically here i'm just
     * giving the option to scale and achieve something similar to the framework
     */
    constructor() {
        this.server = hapi_1.default.server({
            port: process.env.PORT || 4000,
            host: '0.0.0.0',
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Listening on ${this.server.settings.host}:${this.server.settings.port}`);
            this.registerRoutes();
            return this.server.start();
        });
    }
    registerRoutes() {
        try {
            this.server.route(routes_1.default);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.HttpServer = HttpServer;
process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection');
    console.error(err);
    process.exit(1);
});

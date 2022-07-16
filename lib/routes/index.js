"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./v1"));
function prefixed(prefix, routes) {
    return routes.map(r => {
        r.path = `${prefix}${r.path}`;
        return r;
    });
}
exports.default = [
    ...prefixed('/v1', v1_1.default)
];

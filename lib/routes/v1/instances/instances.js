"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../../../handlers/instances/handlers");
const joi_1 = __importDefault(require("joi"));
exports.default = [
    {
        method: 'GET',
        path: '/{group?}',
        handler: handlers_1.getAllByGroups,
    },
    {
        method: 'POST',
        path: '/{group}/{id}',
        handler: handlers_1.insertInstanceWithGroup,
        options: {
            validate: {
                params: joi_1.default.object({
                    group: joi_1.default.string().required().min(3).max(16),
                    id: joi_1.default.string().guid().required()
                }),
            },
        },
    },
    {
        method: 'DELETE',
        path: '/{group}/{id}',
        handler: handlers_1.deleteInstance,
        options: {
            validate: {
                params: joi_1.default.object({
                    group: joi_1.default.string().required().min(3).max(16),
                    id: joi_1.default.string().guid().required()
                }),
            },
        },
    },
];

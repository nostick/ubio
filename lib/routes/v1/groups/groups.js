"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../../../handlers/groups/handlers");
exports.default = [
    {
        method: 'GET',
        path: '/',
        handler: handlers_1.getAllByGroups,
    },
    {
        method: 'POST',
        path: '/{group}/{id}',
        handler: handlers_1.insertInstanceWithGroup,
    },
];

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
exports.getAllByGroups = void 0;
const mongo_1 = __importDefault(require("../../lib/mongo"));
function getAllByGroups(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            const { group } = request.params;
            yield mongo_1.default.init();
            response = yield mongo_1.default.find('instances', group ? { group } : {});
            if (!group) {
                const aggregation = yield mongo_1.default.aggregate('instances', queryAgg());
                response = yield aggregation.toArray();
            }
        }
        catch (e) {
            console.log('Error on getAll Route', e);
        }
        finally {
            yield mongo_1.default.close();
        }
        return h.response(response);
    });
}
exports.getAllByGroups = getAllByGroups;
function queryAgg() {
    return [
        {
            $group: {
                _id: '$group',
                count: {
                    $count: {},
                },
                createdAt: {
                    $min: '$createdAt',
                },
                updatedAt: {
                    $max: '$updatedAt',
                },
            },
        }, {
            $match: {
                count: {
                    $gte: 1,
                },
            },
        },
    ];
}

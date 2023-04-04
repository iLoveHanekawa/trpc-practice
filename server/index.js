"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const express_1 = __importDefault(require("express"));
const express_2 = require("@trpc/server/adapters/express");
const app = (0, express_1.default)();
const t = server_1.initTRPC.create();
const appRouter = t.router({
    say: t.procedure.input(v => {
        if (typeof v === 'string')
            return v;
        throw new Error('Type of arg is not string');
    }).query(req => {
        const { input } = req;
        return `Hello, ${input}`;
    })
});
app.get('/', (req, res) => {
    res.send('<h1>Hi, mom</h1>');
});
app.use('/trpc', (0, express_2.createExpressMiddleware)({
    router: appRouter
}));
app.listen(3000, () => { console.log('Server listening at http://localhost:3000'); });
